# Design System: Industrial Brutalist Minimalist

## 1. Visual Theme & Atmosphere
A highly curated, print-inspired digital interface. The atmosphere is **Industrial Brutalist & Minimalist**—static, sharp, architectural, and deliberate. It strips away all unnecessary decorative elements in favor of massive typography, rigid grid systems, and subtle, physical-feeling depths. It feels like a high-end architectural magazine or a declassified blueprint.

- **Density:** 4 (Spacious but structurally heavy)
- **Variance:** 2 (Strict grid adherence, intentional asymmetry)
- **Motion:** 2 (Subtle, physical transitions only; no bouncing or elastic effects)

## 2. Color Palette & Roles
- **Cloud Dancer Base** (`#F3F2EB`) — Primary background, warm cream.
- **Deep Espresso** (`#1A1A1A`) — Primary text, dark borders, and stark accents.
- **Muted Sage/Silver** (`#8B7E66`) — Secondary text, italicized highlights, and subtle borders.
- **Architectural White** (`#FFFFFF`) — High-contrast container backgrounds (cards).

## 3. Typography Rules
- **Display:** **Bricolage Grotesque** or **Inter** — Extra Bold/Black. Track-tight for massive hero text.
- **Subheaders:** **Inter** or **Helvetica Neue** — All caps, wide letter-spacing.
- **Body/Bio:** **Inter** — Italicized, medium weight, loose line height for readable editorial feel.
- **Metadata:** **Inter** — Micro-typography (8px-10px), extremely wide tracking (0.2em+), always uppercase.
- **Banned:** Comic fonts, decorative serifs, illegible cursive.

## 4. Component Stylings
*   **Bento Grid Cards:** Stark white (`#FFFFFF`) or off-white (`#f8f7f3`) backgrounds with incredibly thin borders (`rgba(0,0,0,0.05)`) and subtle drop shadows (`0 8px 30px rgba(0,0,0,0.04)`). Sharp corners (`rounded-none` or `rounded-sm`).
*   **Buttons:** Utilitarian, thin borders (`border-black`), transparent background that fills with solid black on hover. No gradients.
*   **Micro-Tags:** Pill-shaped or plain text, heavily tracked, indicating system status or versions (e.g., `LOC_084`, `SYS_042`).
*   **Icons:** Thin-stroke, scalable vector icons (e.g., Lucide icons with `stroke-width="1.5"` or `1`).

## 5. Layout Principles
- **Asymmetric Rigid Grid:** Content is aligned to a strict 12-column grid but arranged asymmetrically to create visual tension and flow.
- **Massive Negative Space:** Sections are separated by enormous margins, forcing the user to focus on one piece of content at a time.
- **Typographic Hierarchy:** Scale contrast is extreme. The hero text might be `10vw`, while the adjacent metadata is `10px`.

## 6. Motion & Interaction
- **Smooth Scroll:** Use Lenis for silky smooth, heavy-feeling page scrolling.
- **Subtle Hover States:** Cards might elevate slightly or shadows might deepen, but without elastic bounce.
- **Color Inversion:** Buttons invert colors sharply on hover (white to black, black to white).

## 7. Anti-Patterns (Banned)
- No glowing gradients or iridescent meshes.
- No heavy glassmorphism or blurs.
- No playful "bouncing" animations.
- No chaotic overlapping of non-grid elements.
- No rounded, bubbly corners.
