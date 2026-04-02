# Design System Specification: Editorial Intelligence

## 1. Overview & Creative North Star
**The Creative North Star: "The Sovereign Analyst"**

In the high-stakes world of distressed property intelligence, the interface must function as an authoritative, high-fidelity lens. We are moving away from the cluttered, "utility-first" look of traditional real estate dashboards toward a **High-End Editorial** experience. 

This design system breaks the traditional "SaaS grid" by utilizing intentional asymmetry, expansive white space, and a hierarchical depth model. We don't just show data; we curate intelligence. The aesthetic is "Figma-clean"—prioritizing razor-sharp typography, tonal layering, and a "Glassmorphism" effect that suggests a multi-dimensional workspace. Every element is designed to feel custom and premium, reinforcing the trust required by sheriffs and high-volume sellers.

---

## 2. Colors & Surface Logic

Our palette is anchored in deep, authoritative navies and electric, high-action blues. The goal is high contrast without visual fatigue.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. Structural boundaries must be defined exclusively through background color shifts or tonal transitions. Use `surface_container_low` against a `surface` background to create "invisible" zones.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine paper or frosted glass.
- **Base Layer:** `background` (#faf9ff) – The canvas.
- **Sectioning Layer:** `surface_container_low` (#f1f3ff) – Large structural zones (e.g., sidebar or secondary content areas).
- **Primary Content Layer:** `surface_container_lowest` (#ffffff) – Primary cards and data panels.
- **Action/Focus Layer:** `surface_bright` (#faf9ff) – Interactive or highlighted floating elements.

### The "Glass & Gradient" Rule
To elevate the dashboard beyond "standard" UI, main CTAs and hero metrics should utilize a subtle directional gradient from `primary` (#264bdd) to `primary_container` (#4666f7). For floating navigation or modal overlays, use **Glassmorphism**: 
- `surface` color at 80% opacity.
- `backdrop-filter: blur(12px)`.
- This ensures the UI feels integrated and high-fidelity.

---

## 3. Typography: The Editorial Scale

We utilize a dual-typeface system to balance "Brand Authority" with "Data Clarity."

*   **Manrope (The Voice):** Used for Display and Headline levels. Set with tight letter-spacing (-0.02em to -0.04em) and extra-bold weights to create an editorial, "newspaper masthead" feel.
*   **Inter (The Tool):** Used for UI elements, labels, and tables. Inter provides maximum legibility for dense property data.

| Level | Token | Font | Weight | Size | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 800 | 3.5rem | Hero stats/impact metrics |
| **Headline** | `headline-md`| Manrope | 700 | 1.75rem| Page titles / Card headers |
| **Title** | `title-md` | Inter | 600 | 1.125rem| Section sub-headers |
| **Body** | `body-md` | Inter | 400 | 0.875rem| General UI & Descriptions |
| **Label** | `label-sm` | Inter | 500 | 0.6875rem| Tags, Metadata, Overline text |

---

## 4. Elevation & Depth

We move beyond "drop shadows" to **Tonal Layering**. Depth is a function of color proximity, not artificial light.

*   **The Layering Principle:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f1f3ff) background. The 2% shift in brightness creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use a "Whisper Shadow":
    *   `box-shadow: 0 20px 40px rgba(10, 27, 57, 0.06);`
    *   Note the use of the `on_surface` color (#0a1b39) as the shadow tint rather than pure black.
*   **The "Ghost Border" Fallback:** If a container sits on a background of the same color, use a Ghost Border: `outline_variant` (#c4c5d8) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** Gradient from `primary` (#264bdd) to `primary_container` (#4666f7). Roundedness: `md` (1.5rem). Use `on_primary` (#ffffff) for text.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `primary`.
- **Tertiary/Ghost:** No background. Text in `on_surface_variant`. Use for low-priority actions like "Cancel."

### Status Chips
- **Style:** `rounded-full` (9999px). 
- **Palette:** Use `secondary` (#006b5f) for positive/active, `tertiary` (#6b38d4) for pending/in-progress, and `error` (#ba1a1a) for urgent alerts.
- **Implementation:** Soft tonal backgrounds (Container tokens) with high-contrast text.

### Input Fields
- **Background:** `surface_container_high` (#e1e8ff).
- **Shape:** `sm` (0.5rem) or `md` (1.5rem) to match buttons.
- **States:** On focus, transition border to `primary` and add a subtle `primary_fixed` glow.

### Cards & Lists
- **The Forbid Rule:** Divider lines (horizontal rules) are strictly forbidden. 
- **Separation Technique:** Use the Spacing Scale (specifically `8` (2.75rem) or `10` (3.5rem)) to create breathing room between data points. In tables, use alternating row backgrounds (Zebra-striping) using `surface` and `surface_container_low` rather than lines.

### Signature Component: The "Intelligence Card"
A large `xl` (3rem) radius container. It features a `headline-sm` title, 1.5px stroke thin icons, and uses `surface_container_lowest`. It should overlap slightly with the section below it to create an intentional, asymmetric layout.

---

## 6. Do’s and Don’ts

### Do
- **Do** use `spacing-16` (5.5rem) for page margins to give the content a "gallery" feel.
- **Do** use `Manrope` for all numbers in large data displays.
- **Do** use the "Soft Teal" (`secondary`) for all success-state intelligence (e.g., "Equity Found").
- **Do** keep icons consistently at a 1.5px stroke weight to maintain the "Thin & High-End" vibe.

### Don't
- **Don't** use `#000000` for text. Use `on_background` (#0a1b39) to maintain the navy editorial tone.
- **Don't** use standard "Box Shadows" on every card. Rely on background color shifts first.
- **Don't** use Sharp Corners. Even the smallest UI elements should have at least a `sm` (0.5rem) radius.
- **Don't** cram data. If a table feels tight, increase the row height and move secondary data to a "Detail View" using Glassmorphism.