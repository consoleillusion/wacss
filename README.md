# waCSS

## Core idea
A minimalist, design system inspired primarily by Japanese WabiSabi and by Western Editorial Minimalism. The "wa" in the name comes from the Japanese concept of **wa (和)**, a concept translating to something like "harmony," "peace," or "balance", and also conformity within a social group. This project interprets harmony and conformity as structural inspiration. The css library should conform to globally recognized standards for accessibility, and be pleasant for users to use, and frictionless for developers. It prefers element styling over class styling, and encourages users to use actual semantic html, rather than inventing classes that do the same thing. Javascript is sometimes useful for accessibility behavior.

## Principles

Wa (和)
: Harmony with users, developers, and international standards. Design should feel familiar, accessible, easy to learn, and work with the platform rather than against it.

Kanso (簡素)
: Simplicity. Removal of anything unnecessary. In both appearance and implementation, remove excess until only what serves a purpose remains.

Ma (間)
: Spacing, emptiness, interval, and timing. Space is an active design element that creates rhythm, clarity, and an unhurried atmosphere.

Fukinsei (不均斉)
: Asymmetry. Balance achieved without mirror symmetry, reflecting how nature is never perfectly uniform. Symmetry is not the only form of balance in design.

Shizen (自然)
: Naturalness. Forms, movement, and interactions should feel organic rather than manufactured.

Kokō (考古)
: Weathered grace. Austerity that feels calm, mature, and enduring rather than pristine or attention-seeking.

Yūgen (幽玄)
: Ethereal beauty. Beauty that is felt more than seen, working by suggestion rather than statement and leaving room for imagination.

Datsuzoku (脱俗)
: Freedom from convention. Breaking away from habit and formula in ways that bring quiet delight while maintaining grace.

Shibui (渋い)
: Restrained depth. Understated, unobtrusive beauty whose richness reveals itself over time rather than all at once.

Seijaku (静寂)
: Energized calm. The stillness at the centre rather than the absence of life. Nothing moves without purpose. When harmony, simplicity, spacing, and restraint come together, what remains is a quiet the reader can rest in.

## Principles Applied

* **Semantic HTML.** Inspired by **Wa** and **Kanso**. Semantic elements work in harmony with web standards and accessibility while reducing the amount of CSS and markup needed. Writing good HTML should be enough.
* **Use the system.** Inspired by **Wa**. Native browser behaviour, platform conventions, and web standards are preferred over reinventing familiar patterns.
* **Classless by default.** Inspired by **Kanso** and **Wa**. Styling native elements instead of utility or component classes reduces complexity and keeps HTML clean, portable, and easy to understand.
* **Accessible by default.** Inspired by **Wa**. Accessibility is treated as part of the system rather than an optional enhancement, ensuring interfaces work naturally for everyone.
* **Astro is the default supported framework.** Inspired by **Kanso**. Supporting a single framework reduces maintenance, keeps documentation focused, and avoids unnecessary fragmentation.
* **CSS variables over overrides.** Inspired by **Wa** and **Kanso**. Customisation happens through shared design tokens instead of increasingly specific selectors, creating predictable and maintainable styling.
* **Intrinsic sizing.** Inspired by **Shizen** and **Wa**. Components are allowed to size themselves according to their content, with layouts adapting naturally instead of forcing arbitrary dimensions.
* **Clarity over decoration.** Inspired by **Kanso** and **Shibui**. Every visual element should have a purpose. Beauty emerges through restraint rather than ornament.
* **Whitespace is active.** Inspired by **Ma**. Space is treated as a design element that creates rhythm, hierarchy, and calm instead of simply filling what remains.
* **Desaturated natural colours.** Inspired by **Shizen**, **Kokō**, and **Shibui**. Earthy, muted palettes feel natural, weathered, and quietly confident without demanding attention.
* **Restraint in colour.** Inspired by **Shibui** and **Yūgen**. Colour is used sparingly, with a neutral foundation and limited accents that communicate meaning rather than decoration.
* **Tasteful motion.** Inspired by **Seijaku** and **Shizen**. Animation exists to communicate state and interaction. It should be smooth, measured, and never distracting.
* **Soft borders and shadows.** Inspired by **Shizen** and **Kokō**. Gentle edges and subtle depth feel more natural than hard lines or dramatic contrast.
* **Natural motion.** Inspired by **Shizen** and **Seijaku**. Movement should feel organic and purposeful, with nothing animating without reason.
* **Hidden detail.** Inspired by **Yūgen**, **Shibui**, and **Datsuzoku**. Small moments of discovery reward attention—such as swatch names appearing on hover—adding depth and delight without overwhelming the interface.

## Themes

Each theme has
- Light mode 
  - Neutral Color Ramp
  - Accent Color Ramp
  - Semantic Colors
    - Success
    - Failure
    - Warning
    - Info
- Dark mode
  - Neutral Color Ramp
  - Accent Color Ramp
  - Semantic Colors
    - Success
    - Failure
    - Warning
    - Info

Sage
: A muted green theme with soft earthy neutrals, offering a calm, natural, and understated appearance.

Aizome (藍染)
: An indigo-dyed theme featuring rich blue hues, evoking traditional Japanese textiles and a refined, timeless feel.

Kachi (勝色)
: A dark navy-blue theme inspired by *kachi-iro* (勝色), conveying strength, elegance, and a subdued professional look.

Kurenai (紅)
: A vivid crimson theme with striking red accents, delivering a vibrant, energetic, and confident visual style.

Sakura (桜)
: A delicate pink theme inspired by cherry blossoms, giving interfaces a light, warm, and welcoming atmosphere.

Matcha (抹茶)
: A fresh green theme based on powdered green tea, blending natural vibrancy with a clean and balanced aesthetic.

Kuro (黒)
: A pure black monochrome theme with high contrast, emphasizing simplicity, focus, and a modern dark appearance.

Yakisugi (焼杉)
: A charred-wood-inspired theme with deep black and smoky grey tones, creating a bold, rustic, and minimalist aesthetic.

## Orthogonal Style Categories

This refers to the sub categories of a design system that don't directly influence each other, and can be applied without direct conflicts. Any indirect conflict they have is in how well they might fit together. For example, you might think olive green is a bad text color for serif but not sans-serif typography, but still it can be applied without any technical conflict. This library separates them so they can be bundled and included separately. 

- Palette
- Typography
- Layout
- Spacing

## Components

- Blocks
  - Navbar
  - Gallery

- Typography
  - Blockquote
  - Code Block
  - Link

- Buttons
  - Button
  - Close Button
  - Icon Button

- Date and Time
  - Date Picker
  - Calendar

- Forms
  - Checkbox
  - Input
  - Number Input
  - Password Input

- Disclosure
  - Accordion
  - Breadcrumb
  - Carousel

- Data Display
  - Avatar
  - Badge
  - Card
  - Image
  - Data List
  - Icon
  - Table
  - Tag
