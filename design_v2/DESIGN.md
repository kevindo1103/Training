---
name: Dolphin Elite
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3d4947'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#316763'
  on-secondary: '#ffffff'
  secondary-container: '#b5ede7'
  on-secondary-container: '#376d69'
  tertiary: '#525e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b7775'
  on-tertiary-container: '#f3fffc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#b5ede7'
  secondary-fixed-dim: '#9ad1cb'
  on-secondary-fixed: '#00201e'
  on-secondary-fixed-variant: '#144f4b'
  tertiary-fixed: '#d8e5e2'
  tertiary-fixed-dim: '#bcc9c6'
  on-tertiary-fixed: '#121e1c'
  on-tertiary-fixed-variant: '#3d4947'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  surface-taupe: '#F5F5F4'
  success-emerald: '#16A34A'
  error-ruby: '#DC2626'
  accent-teal-soft: '#CCFBF1'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1100px
  section-gap: 64px
  element-gap: 24px
  margin-desktop: 48px
  margin-mobile: 20px
---

## Brand & Style

The design system is a sophisticated, luxury-leaning framework tailored for a high-end corporate training environment. It moves away from the utility-first aesthetic of standard tools toward a refined, editorial experience that commands authority and signals prestige.

The style is **Minimalist / Corporate Modern**, characterized by:
- **Expansive Whitespace:** Generous margins and internal padding to reduce cognitive load and emphasize content priority.
- **High-Contrast Typography:** Extreme variance between weight and size to create a clear visual hierarchy and an "executive" feel.
- **Refined Materiality:** Use of subtle, multi-layered shadows and soft-on-soft color transitions rather than harsh borders.
- **Focused Learning:** A layout philosophy that eliminates peripheral noise, keeping the participant's attention on the intellectual task at hand.

## Colors

The palette is centered on the brand's signature Teal, but applied with restraint to maintain a luxury feel. 

- **Primary & Secondary:** The core Teals are used primarily for purposeful actions and high-level branding. The deep forest teal (`#134E4A`) is utilized for high-contrast text and interactive states.
- **The "Paper" Surface:** Instead of pure white, the system uses a sophisticated off-white (`#F5F5F4`) as the base page background to reduce eye strain and feel more like premium stationery. 
- **Functional Accents:** Semantic colors for success and error are softened; they should appear as thin accents or subtle background washes to avoid breaking the minimalist aesthetic.
- **Interaction:** Hover states utilize the `accent-teal-soft` wash to provide clear but gentle feedback.

## Typography

The typography system pairs **Manrope** for headlines with **Hanken Grotesk** for body and UI elements. This combination creates a "Modern Professional" look that is both sharp and highly legible.

- **Headlines:** Use tight letter-spacing and heavy weights for larger sizes to evoke a magazine-style editorial feel.
- **Body Text:** Designed for long-form reading in a learning environment, the line height is kept generous (1.6) to ensure clarity.
- **Labels:** Small labels use an uppercase style with increased letter-spacing to act as clear navigational anchors without competing with primary content.
- **Hierarchy:** Rely on weight changes (e.g., switching from 400 to 700) rather than color changes to signify importance.

## Layout & Spacing

This design system uses a **Fixed Grid** approach for the core learning content to ensure a focused, centered experience.

- **The Learning Column:** Content is primarily contained within a centered 1100px column on desktop. For focused reading or assessment tasks, this may narrow further to 720px.
- **Spacing Rhythm:** Based on an 8px scale. Use 64px (section-gap) for separating major conceptual blocks and 24px (element-gap) for internal card components.
- **Responsive Behavior:** 
  - **Desktop:** 12-column grid with 32px gutters.
  - **Tablet:** 8-column grid with 24px gutters.
  - **Mobile:** 4-column grid with 16px gutters and 20px side margins.
- **Whitespace:** Elements should never feel crowded. If in doubt, increase the padding. Every card should have a minimum of 32px internal padding on all sides.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** rather than stark lines.

- **Background:** The page uses the neutral `surface-taupe`.
- **Level 1 (Cards):** Primary containers are pure white (`#FFFFFF`) with a very soft, diffused shadow (`0 4px 20px rgba(0, 0, 0, 0.04)`).
- **Level 2 (Overlays/Modals):** These use a more pronounced shadow with a wider blur to suggest significant height (`0 12px 40px rgba(0, 0, 0, 0.08)`).
- **Depth via Border:** For specific interactive elements like input fields, use a low-contrast 1px border in a slightly darker neutral shade to define the shape without adding visual weight. Avoid heavy borders on cards.

## Shapes

The shape language is **Rounded (Level 2)**. This balance provides a professional structure while appearing approachable and modern.

- **Cards & Primary Containers:** Use 1rem (16px) for a soft, premium feel.
- **Buttons & Inputs:** Use 0.5rem (8px) to maintain a slightly more disciplined and "business" aesthetic compared to the larger containers.
- **Status Badges:** These should be fully rounded (pill-shaped) to distinguish them clearly from structural UI components.

## Components

- **Buttons:** 
  - **Primary:** Solid Teal (`#0D9488`) with white text. High-contrast, bold weight. No gradient.
  - **Secondary:** Ghost style with a 1.5px border in the deep secondary teal. 
  - **Interaction:** On hover, primary buttons should subtly darken; secondary buttons should gain the `accent-teal-soft` background.

- **Input Fields:** Use the neutral background with a subtle 1.5px border. On focus, the border transitions to Primary Teal with a soft 4px glow (20% opacity).

- **Cards:** The central component of the portal. Must always feature a minimum 32px padding. In assessment views, cards may feature a "context-stripe" (a 4px vertical teal bar on the left edge) to denote active or important sections.

- **Progress Indicators:** Use thin, elegant lines rather than chunky bars. The "Dolphin" system uses the primary teal for progress and a light neutral for the track.

- **Navigation:** A horizontal top-bar for desktop, featuring the logo and high-level categories. Use the `label-caps` typography style for nav items. On mobile, a refined bottom-tab bar with thin icon outlines is preferred.

- **Chips/Badges:** Small, uppercase text. Use the semantic background colors at 15% opacity with high-contrast text for a sophisticated "tag" look.