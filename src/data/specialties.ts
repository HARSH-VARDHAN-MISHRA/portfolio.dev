// What Harshvardhan actually builds beyond "frontend developer" — the
// specific integrations and systems he works with day to day, in his own
// words. Each one pairs the tool with what it means for someone hiring him.

export type Specialty = {
  id: string;
  icon: "store" | "whatsapp" | "ai" | "realtime";
  title: string;
  tools: string;
  description: string;
  build: string;
};

export const specialties: Specialty[] = [
  {
    id: "shopify",
    icon: "store",
    title: "Shopify Development",
    tools: "Shopify API · Liquid · Storefronts",
    description: "Custom Shopify storefronts, theme customization, and API-driven catalog & checkout flows.",
    build: "A fully branded store, custom app, or catalog integration — built to your workflow, not a template.",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    title: "WhatsApp Automation",
    tools: "Interakt",
    description: "Auto bot replies, broadcast campaigns, and lead-flow automation on Interakt.",
    build: "A WhatsApp channel that qualifies leads and answers customers automatically — no manual replies.",
  },
  {
    id: "ai",
    icon: "ai",
    title: "AI-Powered Workflows",
    tools: "ChatGPT · Gemini · Perplexity",
    description: "Wiring AI APIs into real product workflows — document processing, content, and decision support.",
    build: "An AI-assisted workflow inside your existing product — OCR extraction, smart replies, or generated content.",
  },
  {
    id: "realtime",
    icon: "realtime",
    title: "Real-Time Systems",
    tools: "WebSockets",
    description: "Live notifications, instant data sync, and in-CRM chat — powered by WebSockets, not polling.",
    build: "A dashboard or CRM that updates the instant something changes, with live chat and notifications built in.",
  },
];
