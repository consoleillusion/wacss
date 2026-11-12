export const commonAttributes = {
  id: { type: "string", description: "Unique element identifier." },
  class: { type: "string", description: "CSS class name(s)." },
  "class:list": { description: "Astro class:list value.", },
  style: { type: "string", description: "Inline style string." },
  title: { type: "string", description: "Advisory title." },
  lang: { type: "string", description: "Language tag." },
  dir: { type: "string", enum: ["ltr", "rtl", "auto"], description: "Text direction." },
  hidden: { type: "boolean", description: "Hidden from display." },
  tabindex: { type: ["number", "string"], description: "Tab order." },
} as const;

export default commonAttributes;
