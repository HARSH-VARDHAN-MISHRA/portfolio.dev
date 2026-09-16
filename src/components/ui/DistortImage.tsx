"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Ripple + subtle chromatic aberration, both scaled by uHover so the effect
// eases in on pointer-enter and fully settles back to a plain image on
// pointer-leave — this is the "movement" and "distortion" together.
const FRAGMENT_SRC = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform float uCanvasAspect;
  uniform float uImageAspect;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min(uCanvasAspect / uImageAspect, 1.0),
      min(uImageAspect / uCanvasAspect, 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    float dist = distance(vUv, uMouse);
    float falloff = smoothstep(0.4, 0.0, dist);
    float effect = uHover * falloff;
    vec2 dir = vUv - uMouse;
    uv += dir * effect * 0.07 * sin(uTime * 3.0 - dist * 10.0);

    float aberration = effect * 0.012;
    float r = texture2D(uTexture, uv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(aberration, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Always meant to be layered over a real, accessible `<img>`/`next/image`
 * showing the same picture — this canvas is purely a decorative effect on
 * top of it, so it's `aria-hidden` rather than carrying its own alt text.
 */
export default function DistortImage({ src, className }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uHover = gl.getUniformLocation(program, "uHover");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uCanvasAspect = gl.getUniformLocation(program, "uCanvasAspect");
    const uImageAspect = gl.getUniformLocation(program, "uImageAspect");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    let imageAspect = 1;
    let canvasAspect = 1;
    let hover = 0;
    let targetHover = 0;
    const mouse = { x: 0.5, y: 0.5 };
    let raf = 0;
    let loaded = false;
    let destroyed = false;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(rect.width * dpr));
      canvas!.height = Math.max(1, Math.round(rect.height * dpr));
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      canvasAspect = rect.width / rect.height || 1;
      draw(performance.now());
    }

    function draw(t: number) {
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.uniform1f(uHover, hover);
      gl!.uniform1f(uTime, t / 1000);
      gl!.uniform1f(uCanvasAspect, canvasAspect);
      gl!.uniform1f(uImageAspect, imageAspect);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function loop(t: number) {
      hover += (targetHover - hover) * 0.08;
      draw(t);
      if (Math.abs(targetHover - hover) > 0.001 || targetHover > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        hover = targetHover;
        draw(t);
      }
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function handleMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
      kick();
    }
    function handleEnter() {
      targetHover = 1;
      kick();
    }
    function handleLeave() {
      targetHover = 0;
      kick();
    }

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (destroyed) return;
      imageAspect = img.naturalWidth / img.naturalHeight || 1;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      loaded = true;
      resize();
    };
    img.src = src;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerenter", handleEnter);
    canvas.addEventListener("pointerleave", handleLeave);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerenter", handleEnter);
      canvas.removeEventListener("pointerleave", handleLeave);
      // Deliberately NOT calling the WEBGL_lose_context extension here: in
      // dev, React StrictMode mounts this effect, cleans it up, then mounts
      // it again immediately — forcing context loss on that first cleanup
      // made the real, second context creation return null every time,
      // which is why nothing ever rendered. Deleting the program/texture is
      // enough; the canvas and its context get garbage-collected normally
      // once nothing references them.
      if (loaded) gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [src]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
