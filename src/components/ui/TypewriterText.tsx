"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  words: readonly string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
};

/** Cycles through `words`, typing and deleting each one in turn. */
export default function TypewriterText({
  words,
  className,
  typingSpeed = 65,
  deletingSpeed = 35,
  pause = 1400,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  // Starts on the first word so reduced-motion users (who skip the effect
  // below entirely) still see real content, not an empty string.
  const [text, setText] = useState(() => words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
    } else {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(next), deleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}
