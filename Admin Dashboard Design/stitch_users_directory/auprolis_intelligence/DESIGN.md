# Design System Document: Editorial Intelligence

## 1. Overview & Creative North Star
**The Creative North Star: "The Sovereign Curator"**

This design system is not a utility; it is an authority. Tasked with managing distressed property intelligence in Botswana, the interface must feel like a high-end legal dossier meets a modern financial terminal. We move beyond the "SaaS-standard" by adopting an **Editorial Intelligence** aesthetic. 

We break the traditional "boxed" template through:
*   **Intentional Asymmetry:** Utilizing generous white space and off-center alignments to guide the eye.
*   **Tonal Depth:** Replacing harsh lines with overlapping surfaces that feel like stacked premium paper.
*   **Typographic Authority:** High-contrast scales that prioritize rapid scanning and executive-level readability.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Deep Navy" foundation to project trust, contrasted by "Electric Blue" to signify action and intelligence.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined through:
1.  **Tonal Shifts:** Placing a `surface-container-lowest` card (#FFFFFF) against a `surface` background (#F9F9FF).
2.  **Negative Space:** Using the Spacing Scale (8, 10, or 12) to create natural breaks.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the following tiers to create "nested" importance:
*   **Canvas (`surface`):** The base layer (#F9F9FF).
*   **Sections (`surface-container-low`):** Sub-grouping areas (#F1F3FF).
*   **Primary Cards (`surface-container-lowest`):** Floating data points (#FFFFFF).
*   **Active Overlays (`surface-bright`):** Elements requiring immediate focus.

### Signature Textures & Glass
*   **The "Glass" Rule:** Floating elements (modals, popovers) must use semi-transparent `surface` colors with a `20px` backdrop-blur. This softens the interface and prevents it from feeling "pasted on."
*   **The Gradient Polish:** Primary CTAs should utilize a subtle linear gradient from `primary` (#264BDD) to `primary-container` (#4666F7) at 135 degrees to add professional "soul."

---

## 3. Typography
We use typography to establish a clear hierarchy between "Intelligence" (Manrope) and "Data" (Inter).

*   **Display & Headline (Manrope):** Extra-bold with a -2% tracking. These are the editorial anchors. Use `display-md` for main dashboard headers to command attention.
*   **Title & Body (Inter):** The workhorse. `title-sm` is used for card headers, while `body-md` handles all property metadata.
*   **The "Label" Signature:** Use `label-md` in all-caps with +5% letter spacing for section headers (e.g., "ASSET VALUATION"). This evokes a legal/formal document feel.

---

## 4. Elevation & Depth
In this design system, shadows are light; surfaces do the heavy lifting.

*   **Tonal Layering:** Depth is achieved by stacking. A `surface-container-lowest` card on a `surface-container-low` background creates a natural lift.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Spec:* `0px 20px 40px rgba(20, 27, 43, 0.06)`. Note the tinting of the shadow using the `on-surface` color rather than pure black.
*   **The Ghost Border:** If a boundary is required for accessibility, use `outline-variant` at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Solid gradient (`primary` to `primary-container`). Roundedness: `md` (1.5rem). 
*   **Secondary:** `surface-container-high` background with `on-primary-fixed-variant` text. No border.
*   **Interaction:** On hover, apply a `1.02x` scale transform and increase the shadow diffusion.

### Chips (Status & Labels)
*   **Visual Style:** `Rounded-full` (9999px). 
*   **Logic:** Status chips (Success/Emerald, Warning/Amber) must use a low-opacity background of the semantic color (10%) with high-contrast text. This maintains a professional legal tone.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use a `surface-container-low` background with a `sm` radius.
*   **Focus:** Transition the background to `surface-container-lowest` and add a `2px` focus ring of `primary` at 30% opacity.

### Cards & Intelligence Lists
*   **Constraint:** Forbid the use of divider lines. 
*   **Separation:** Use `8` (2rem) vertical spacing between list items. 
*   **Action Items:** Hovering over a list item should trigger a subtle shift in background color to `surface-container-high`.

### Specialized Admin Components
*   **The Gavel/Shield Accent:** Use the 1.5px outline motif as a watermark in the top-right of property detail cards to denote "Verified Administrative Intelligence."
*   **Metric Clusters:** Group 3–4 data points on a `surface-container-lowest` card with a `xl` radius (3rem) for a modern, dashboard-first feel.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins to create "Editorial" focus areas.
*   **Do** rely on font-weight and color (Near-black vs. Secondary Grey) for hierarchy before reaching for different font sizes.
*   **Do** use `body-sm` for "fine print" metadata to keep the interface clean.

### Don't:
*   **Don't** use 1px solid lines to separate content; it breaks the "Premium Paper" metaphor.
*   **Don't** use high-opacity shadows; they feel "cheap" and dated.
*   **Don't** cram data. If a table feels tight, increase the `surface-container` padding.
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#141B2B) to maintain the navy tonal consistency.