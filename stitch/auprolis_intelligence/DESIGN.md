# Design System Strategy: The Intelligent Monolith

## 1. Overview & Creative North Star
The "Intelligent Monolith" is the creative North Star for this design system. In the world of distressed property intelligence, users are navigating chaos, decay, and complex data. Our role as designers is to provide an experience that feels like a singular, unwavering pillar of truth. 

This design system moves beyond the "SaaS-template" look by embracing **High-End Editorial Precision**. We reject the cluttered grid in favor of intentional asymmetry, massive typographic contrast, and layered depth. The interface should feel less like a software dashboard and more like a high-fidelity intelligence dossier—authoritative, sleek, and surgically precise.

## 2. Color & Tonal Architecture
The palette is anchored by the tension between the "Electric Blue" (`primary`) and the "Deep Navy" (`on_secondary_fixed`). This is not just a color choice; it is a functional hierarchy.

### The "No-Line" Rule
**Borders are a failure of hierarchy.** Within this system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background shifts. Use `surface_container_low` for the main body and `surface_container_lowest` for active workspace modules. Let the eye find the edge through tonal transition, not a literal line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of intelligence layers:
- **Base Layer:** `surface` (#f7f9fd) — The canvas.
- **Section Layer:** `surface_container_low` — Defines large functional zones.
- **Action Layer:** `surface_container_lowest` (#ffffff) — Reserved for cards and data entry modules that require immediate focus.

### The "Glass & Gradient" Rule
To inject "soul" into data-heavy screens, apply a 12% linear gradient to `primary` buttons, transitioning from `#4B6BFB` to the deeper `#264bdd`. For floating utility panels (like map overlays), use **Glassmorphism**: a background of `surface` at 70% opacity with a `20px` backdrop-blur. This ensures the distressed property data beneath remains visible but non-distracting.

## 3. Typography: Editorial Authority
We utilize a pairing of **Manrope** for high-impact displays and **Inter** for clinical data readability.

*   **Display & Headlines (Manrope):** Use `display-lg` and `headline-lg` with **-4% letter spacing (tight tracking)** and Extra-Bold weights. This creates a "compressed" look that feels heavy, expensive, and authoritative.
*   **Body & Labels (Inter):** Use `body-md` for data. It provides a geometric, neutral tone that stays out of the way of the property metrics.
*   **The Hierarchy Gap:** We intentionally skip mid-range sizes. A screen should feature a massive `display-sm` title paired directly with a `label-md` metadata point. This high-contrast scale is what separates bespoke design from "out-of-the-box" templates.

## 4. Elevation & Depth: The Layering Principle
Shadows in this system are not "drop shadows"; they are **Ambient Occlusion**.

*   **Tonal Layering:** Instead of a shadow, place a `surface_container_lowest` card on a `surface_container_high` background. The 4% difference in luminosity creates a sophisticated, "soft-touch" lift.
*   **The Ambient Shadow:** When a floating state is required (e.g., a property detail modal), use a shadow with a `40px` blur, `0px` spread, and 6% opacity, tinted with the `on_secondary_fixed` (Navy) color. Never use pure black shadows.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use `outline_variant` at **15% opacity**. It should be felt, not seen.

## 5. Components & Primitive Logic

### Buttons: The Kinetic Strike
*   **Primary:** Solid `primary` (#4B6BFB). Radius: `md` (0.75rem). Text: `label-md` in all caps with +5% tracking for a "pro" look.
*   **Secondary:** `surface_container_highest` background with `primary` text. No border.
*   **Tertiary:** Transparent background. Hover state triggers a `surface_container_low` fill.

### Cards: Modular Intelligence
Cards must use `radius-xl` (1.5rem) to soften the "distressed" nature of the data. 
*   **Forbid Dividers:** Do not use lines to separate header from body. Use a `1.5rem` (spacing-6) vertical gap or a subtle shift to `surface_container_low` for the card footer.

### Inputs: The Data Entry Portal
*   **Field:** Pure white (`surface_container_lowest`). 
*   **Focus State:** A 2px "Ghost Border" using the `primary` color at 40% opacity. 
*   **Label:** Use `label-sm` in `secondary` color, positioned `0.5rem` above the field.

### Sidebar: The Deep Navy Anchor
The sidebar uses the Navy range (`#0F1F3D` to `#162A52`). 
*   **Labels:** White at 90% opacity. 
*   **Icons:** Thin-stroke (1.5pt) outline icons. 
*   **Active State:** A vertical "pill" of `primary` blue on the far right edge of the nav item, creating a sharp "Electric" accent against the dark void.

### Property Status Chips
*   **Distressed:** `tertiary_container` with `on_tertiary_fixed_variant` text.
*   **Stable:** `primary_fixed` with `on_primary_fixed_variant` text.
*   **Shape:** Full rounded (`9999px`) to contrast against the architectural geometry of the cards.

## 6. Do’s and Don’ts

### Do:
*   **Embrace Negative Space:** Use `spacing-12` (3rem) between major sections. Breathing room is a luxury.
*   **Layer Containers:** Place a high-tier surface inside a low-tier surface to define priority.
*   **Tighten Tracking:** Ensure all Manrope headlines have tight tracking to maintain the "Editorial" feel.

### Don't:
*   **Don't Use 1px Dividers:** If you feel the need for a line, use a background color change instead.
*   **Don't Use Pure Black:** Always use the Navy-tinted `on_surface` (#181c1f) for text.
*   **Don't Use Standard Shadows:** Avoid small, dark, high-opacity shadows. They make the platform look like a 2015 utility app.