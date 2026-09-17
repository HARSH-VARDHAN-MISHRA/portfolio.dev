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
    title: "E-Commerce & Payments",
    tools: "Shopify API · Razorpay",
    description: "Shopify storefronts across multiple stores, plus Razorpay for payment processing end to end.",
    build: "A fully branded store, custom app, or checkout flow — wired to real payments, not a demo cart.",
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
    tools: "OpenAI · Gemini · Perplexity",
    description: "Wiring AI APIs into real product workflows — OCR document processing, content, and decision support.",
    build: "An AI-assisted workflow inside your existing product — OCR extraction, smart replies, or generated content.",
  },
  {
    id: "realtime",
    icon: "realtime",
    title: "Real-Time & Logistics",
    tools: "WebSockets · Porter · Bluedart · Shiprocket",
    description: "Live dashboards over WebSockets, plus shipment booking and live tracking across three logistics APIs.",
    build: "A dashboard or CRM that updates the instant something changes, with delivery tracking built in.",
  },
];
