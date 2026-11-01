# AirSMS Hub — Design Brief

## Design read
A worldwide SMS-rental marketplace for people and small teams who need a clearly priced, accountable way to receive legitimate service messages, with Ghana-first payment support and a calm, credible operational tone.

## Concept spine
**The signal relay.** Every part of the experience moves a request through a visible relay: choose a destination, reserve a live number, receive the message, close the rental. The brand uses a single continuous camera move through a sculptural message capsule to make that relay tangible.

## Delivery tier
**cinema.** The site is a product-led marketplace and deserves a strong first impression, while every interaction remains practical and readable.

## Locked palette
- Cloud paper: `#F3F6F7` (page ground; cool, clean, high legibility).
- Deep ink: `#17252B` (primary text and structural contrast).
- Signal rose: `#D94F70` (the single accent, reserved for action and signal moments).
- Mist: `#AAB7BC` (secondary text, rules and quiet surfaces).
- Soft white: `#FFFFFF` (surface and cards).
The cool paper and single rose signal feel human and precise without the overused black/neon-tech palette.

## Locked type
**Cabinet Grotesk** for display and **IBM Plex Mono** for data, labels and operational details. The display face gives the brand a recognizable voice; the mono makes numbers and order states feel exact.

## Combinatorial design pick
- Theme paradigm: **Pristine Light**.
- Background character: **solid with soft ambient depth**, occasionally interrupted by a tactile frosted-glass macro.
- Typography character: **expressive display** paired with a strict mono data voice.
- Hero architecture: **massive image-first with restrained text**, with the product promise aligned low-left rather than the default left-text/right-image split.
- Dominant section system: **asymmetric premium flow** with one editorial catalog surface and one wide process strip.
- Signature components: **diagonal staggered masonry**, **hover-accordion slices**, **vertical rhythm lines**, **layered image crop frames**.
- Narrative spine: **journey / waypoints**.
- Second-read moment: **one oversized numeral used as structure**, appearing once in the process section.

Animation mode: animated-website

## Journey shape
`single-shot` — one product world seen in a continuous close approach; a single take preserves clean reverse scrubbing and avoids unnecessary seams.

## Journey
1. **The relay capsule** — A frosted-glass message capsule floats above a precise surface; headline: “A number. A message. In view.” The film establishes the product object and its signal pulse.
2. **Choose the route** — The camera moves closer to the capsule's country and service markers; headline: “Start with the right destination.” The product catalog makes availability and pricing explicit.
3. **Hold the line** — The message pulse travels through the capsule; headline: “Keep every rental visible.” Orders, expiry and SMS states are presented in a single accountable timeline.
4. **Close the loop** — The object resolves into a clear, complete signal; headline: “Only pay for real delivery.” Payment confirmation, cancellation rules and support are made easy to find.

## World grammar
One byte-identical visual preamble across the film and hero imagery: sculptural frosted-glass message capsule, one small signal-rose light travelling inside it, cloud-paper studio ground, cool silver-grey shadows, soft daylight from upper left, macro product-film lens, restrained depth of field, immaculate surface finish, no text, no logos, no watermark. Camera is centered and center-safe, with a single slow forward push and subtle orbit. Exposure and white balance stay locked.

## Mobile framing
Keep the capsule and rose signal in the center 60% of the frame; compose for 16:9 desktop and center-cropped mobile. Mobile copy is placed in a high-contrast cloud-paper band and never over the brightest highlight. Use a lighter 720px mobile encode and exact first-frame poster.

## Delivery budget
Desktop scrub film ≤32 MiB; mobile scrub film ≤16 MiB. One scene clip with exact-frame posters generated from each encoded output.

## Section plan
1. Hero journey / scrub film: cinematic full-bleed image canvas with sparse editorial copy.
2. Live number marketplace: asymmetrical catalog surface with real filters, availability and prices, not invented inventory.
3. Rental flow: horizontal waypoint strip with one oversized numeral as the second-read moment.
4. Trust and controls: editorial accordion with clear payment, expiry, privacy and acceptable-use details.
5. Final conversion: wide framed CTA and concise support/footer architecture.

## Responsive rules
Desktop navigation stays on one line. The catalog becomes a single-column stacked flow on phones, with filters in a compact drawer. Waypoints become a vertical timeline. Accordions remain tap-operable. All controls have visible focus, error, loading, empty and success states. Respect `prefers-reduced-motion`; the scrub engine's reduced-motion fallback remains authoritative.

## CTA inventory
- “Browse numbers” — primary, solid rose action in the hero and navigation.
- “How it works” — understated underlined text link in the hero.
- “Reserve number” — catalog-specific framed action with price beside it.
- “Create account” — outlined account action in the navigation.
- “Get started” — wide closing banner action.

## Functional product scope
Standalone customer accounts, email/password authentication, hashed passwords, HttpOnly sessions, account dashboard, provider-backed country/service catalogue, paid rental checkout, Paystack transaction verification/webhooks, SMS polling, cancellation/refund state, support/contact, admin role and dashboard, provider health and pricing controls, audit trail, legal/acceptable-use pages. No fake numbers, fabricated SMS, or unverified payment success.

## Integration readiness boundary
The code will include server-only adapters for Paystack and the selected SMS provider. Live money movement and number fulfilment remain disabled until the owner configures real provider credentials and has confirmed the SMS provider permits commercial resale and the intended services. A missing key must produce a clear setup state, never a simulated success.

## Asset substitution note
The connected Higgsfield image-generation tool rejected all six requested design-board jobs because the current account requires a Basic plan or higher. To avoid blocking the functional build, the hero motion and launch cover were authored as custom vector artwork and encoded locally; no stock photos, fake provider inventory, or generated AI image claims are used. The bespoke visual board kit remains a possible enhancement after image-generation access is available.

## Anti-convergence ledger
The prior AirPay-style fintech direction uses a dark, high-contrast interface, blue/cyan accent, geometric sans typography, split dashboard hero, repeated utility cards and standard rounded CTA buttons. AirSMS Hub deliberately differs with a cool paper ground, single rose signal accent, Manrope + mono typography, a single-shot scroll-scrub hero, editorial asymmetric catalogue and distinct action treatments.
