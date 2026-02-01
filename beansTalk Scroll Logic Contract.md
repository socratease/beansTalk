# beansTalk — Scroll Logic Contract

This document defines the **binding scroll logic rules** for beansTalk: how scroll position is converted into **deterministic visual state** across the three-layer system (Background World, Beanstalk, Narrative Foreground). It is intended to be added to the repo as a standalone engineering contract.

It operationalizes the narrative prompt (the ordered scroll events) and the visual/interaction design constraints into a single implementable model. fileciteturn0file0 fileciteturn0file1 fileciteturn0file2 fileciteturn0file3

---

## 0) Non‑negotiables

1. **Scroll position is the single source of truth.**  
   Every property (opacity, transforms, growth, fog density, highlights) must be a pure function of scroll position. No timers, no autoplay loops, no hidden internal state. fileciteturn0file1 fileciteturn0file3

2. **Three independent layers with hard authority boundaries.**  
   - Background World: persistent; evolves only by scroll-mapped atmosphere/light/parallax.  
   - Beanstalk: introduced once; then persistent; growth is continuous and monotonic after introduction.  
   - Narrative Foreground: ephemeral; elements exist only within their scroll ranges; no residue. fileciteturn0file1 fileciteturn0file2 fileciteturn0file3

3. **Reversibility.**  
   For any scroll position `s`, rendering must be identical whether the user arrived by scrolling forward or backward. If reverse traversal at the same `s` yields different visuals, the implementation is invalid. fileciteturn0file3

4. **Atmosphere never harms legibility.**  
   Fog/cloud/light diffusion may affect *only* the Background and Beanstalk; foreground content must remain readable at all times. fileciteturn0file1 fileciteturn0file3

5. **No slide metaphor.**  
   This is one continuous world with scroll-bound events, not discrete pages. fileciteturn0file2 fileciteturn0file3

---

## 1) Scroll coordinate system

### 1.1 Directionality: start at bottom, progress upward

The experience starts at the **bottom** of the scroll container and progresses as the user **scrolls upward**.

**Contractual mapping**
- Let `y` be the scrollTop of the main scroll container (pixels).
- Let `y_max` be the maximum scrollTop (scrollHeight − clientHeight).
- Define normalized story progress:

`p = clamp01(1 − (y / y_max))`

So:
- At load: `y ≈ y_max` ⇒ `p ≈ 0` (beginning of story)
- At end: `y ≈ 0` ⇒ `p ≈ 1` (end of story)

This definition is binding; all other progress measures must be derived from `p`.

### 1.2 Segment model

All narrative elements must be authored as **segments** over `p ∈ [0,1]`.

A segment is defined by:
- `start` (inclusive): `p` where the segment becomes eligible to render
- `enterEnd`: end of entry transition
- `exitStart`: start of exit transition
- `end` (exclusive): where the segment must be fully removed

Constraints:
- `0 ≤ start ≤ enterEnd ≤ exitStart ≤ end ≤ 1`
- Outside `[start,end)`, the element must not exist in the scene graph (or must be `display:none` / unmounted).

---

## 2) Core derived state (global)

### 2.1 Helper functions

Implement these pure helpers (names are illustrative):

- `clamp01(x) := min(1, max(0, x))`
- `lerp(a,b,t) := a + (b-a)*t`
- `invLerp(a,b,x) := clamp01((x-a)/(b-a))`
- `smoothstep(a,b,x) := t*t*(3-2*t)` where `t = invLerp(a,b,x)`
- `rangeT(start,end,p) := invLerp(start,end,p)`

### 2.2 Altitude scalar

Define an abstract altitude `alt ∈ [0,1]` that increases with progress:

`alt = smoothstep(ALT_START, ALT_END, p)`

Where:
- `ALT_START` is where atmosphere begins to noticeably change (earliest “lift”).
- `ALT_END` is where the scene reaches maximum “cloud city” interference.

**Recommended defaults (tunable, but must stay monotonic):**
- `ALT_START = 0.55`
- `ALT_END   = 0.95`

Altitude is used solely to drive Background + Beanstalk atmospheric effects. fileciteturn0file1 fileciteturn0file2

### 2.3 Atmosphere channels (Background + Beanstalk only)

Define three atmosphere channels as pure functions of `alt`:

- **Fog density** `fog = smoothstep(0.10, 1.00, alt)`
- **Cloud intrusion** `cloud = smoothstep(0.25, 1.00, alt)`
- **Light diffusion** `diffuse = smoothstep(0.00, 1.00, alt)`

Implementation notes (binding constraints):
- These channels may modulate shader params, CSS filters, overlay opacities, or particle layers.
- They must *never* be applied to Foreground elements (no global blur overlays sitting on top of Foreground). fileciteturn0file1 fileciteturn0file3

---

## 3) Beanstalk contract (layer 2)

### 3.1 Introduction threshold

The beanstalk is introduced at the “2023” moment described in the narrative prompt. fileciteturn0file0

Define:
- `BEAN_INTRO_P` = progress where beanstalk begins to appear
- `BEAN_FULL_P`  = progress where its initial “emergence” animation finishes (still scroll-driven)

**Recommended defaults**
- `BEAN_INTRO_P = 0.36`
- `BEAN_FULL_P  = 0.40`

### 3.2 Existence & monotonic growth

Beanstalk existence:
- If `p < BEAN_INTRO_P`: beanstalk must not exist.
- If `p ≥ BEAN_INTRO_P`: beanstalk exists permanently thereafter.

Growth scalar:
- Define a persistent growth factor `g ∈ [0,1]` as:

`g = clamp01((p − BEAN_INTRO_P) / (1 − BEAN_INTRO_P))`

Binding properties:
- `g` is continuous in `p`.
- For any `p2 > p1 ≥ BEAN_INTRO_P`, `g(p2) ≥ g(p1)` (monotonic).
- When scrolling backward, `g` must decrease smoothly but must never “overshoot,” glitch, or jump. fileciteturn0file3

### 3.3 Screen region and z-order

- Beanstalk occupies a fixed left region of the viewport (e.g., left third), behind Foreground. fileciteturn0file1
- Background is behind beanstalk.
- Foreground is always above both.

### 3.4 Beanstalk rendering semantics (implementation-agnostic)

The beanstalk may be implemented as:
- SVG path with stroke-dashoffset mapped to `g`
- Canvas/WebGL procedural vine growth mapped to `g`
- DOM segments (tiled vine sprites) where revealed height is `g * maxHeight`

Whatever the method, **the contract is the mapping**:
- Visible extent / revealed height / path length must be a deterministic function of `g`.
- No time-based easing; any easing must be expressed as a function of `p` (e.g., smoothstep over a progress subrange).

---

## 4) Foreground element lifecycle contract (layer 3)

### 4.1 Foreground elements are pure functions over p

Each foreground element is specified by a segment plus a deterministic “pose” function:

```
pose(p) -> {
  opacity,
  x, y, scale, rotate,
  optional: highlight states, chart draw progress, etc.
}
```

No element may:
- mutate background parameters
- mutate beanstalk parameters
- store internal state that survives outside its range

### 4.2 Standard entry/dwell/exit envelope

For a segment `S = {start, enterEnd, exitStart, end}`, define:

- `tEnter = rangeT(start, enterEnd, p)`
- `tExit  = rangeT(exitStart, end, p)`

Then:
- `opacity = smoothstep(0,1,tEnter) * (1 - smoothstep(0,1,tExit))`

Position/scale/blur may be similarly derived.

### 4.3 Charts and “draw-in” semantics

Any “draw-in” effect (e.g., line chart animating a line, points appearing, table cells blinking) must be:
- parameterized by a local progress scalar (derived from `p`)
- scrubbed deterministically backward

Example:
- `draw = smoothstep(start, enterEnd, p)` for the chart line reveal
- table highlight toggles must be step functions over `p` (see §6.3)

---

## 5) Background World contract (layer 1)

### 5.1 Persistence

- Render once; never removed/replaced/reset. fileciteturn0file2 fileciteturn0file3

### 5.2 Allowed evolutions

Only scroll-mapped, gradual changes:
- fog/cloud/diffusion (via `alt`)
- subtle parallax (non-camera movement)
- color temperature / saturation shift (must be monotonic with `alt`)

Prohibited:
- camera moves (pan/zoom/flythrough)
- swapping the entire background artwork
- foreground-driven mutations fileciteturn0file3

---

## 6) Canonical narrative segment registry (v1)

This is the contract list of narrative beats drawn from the prompt’s “Scroll event” ordering. It defines **IDs and ordering**; the exact progress ranges are tunable but must preserve order and allow clean entry/dwell/exit. fileciteturn0file0

### 6.1 Segment IDs (ordered)

**Act A — Magic beans and early models**
1. `A0_pastoral_tech_utopia_dropins` (tractor/windmill/robot/spaceship overlays)
2. `A1_quote_allure_of_legume`
3. `A2_year_2018`
4. `A3_chart_cost_gpt1_gpt2`
5. `A4_quote_cow_ill_spent`
6. `A5_year_2019`
7. `A6_chart_cost_add_gpt3`
8. `A7_card_gpt3_example_placeholder_image`
9. `A8_quote_tragic_scenes`
10. `A9_year_2020`
11. `A10_chart_cost_add_gpt35_chatgpt`
12. `A11_quote_beanstalk_rockets` (**beanstalk introduction occurs here**)
13. `A12_year_2023`
14. `A13_chart_cost_add_gpt4o`
15. `A14_quote_garbanzo_empowers`
16. `A15_year_2024`
17. `A16_chart_cost_add_gpt5_series`
18. `A17_quote_legume_denial`
19. `A18_year_2026`

**Act B — Definitions and scaling**
20. `B0_card_definition_beanstalk`
21. `B1_card_definition_scaling_hypothesis`
22. `B2_table_compute_cost_growth_gpt2_to_gpt4`
23. `B3_cookie_oom_demo_overlay` (cookies/circles escalating; then clears scene)

**Act C — Historical beans and capex**
24. `C0_title_historical_beans`
25. `C1_lottie_scientists_manhattan_left`
26. `C2_lottie_scientists_apollo_right`
27. `C3_table_compute_power_roadmap_2022_2030`
28. `C4_table_highlight_sequence_investments` (cell highlights in order)
29. `C5_table_capex_vs_gdp`

**Act D — Core disciplines and close**
30. `D0_title_on_the_beanstalk_and_beyond`
31. `D1_bullets_core_disciplines` (bullets enter one at a time)
32. `D2_thank_you_footer`

### 6.2 Range allocation rule (no gaps requirement)

Let there be `N` segments total. Allocate progress space in order, with optional overlap only for stylistic transitions.

Binding constraints:
- Each segment must have a non-zero dwell, even if brief (avoid flicker).
- Overlaps are allowed, but no segment may fully obscure or replace the background.
- When a segment ends, it must be fully removed (no invisible-but-clickable residue).

### 6.3 Stepwise highlight sequence (table cell highlights)

For segments like `C4_table_highlight_sequence_investments`, define highlight states as thresholds:

```
h1 = (p >= t1)
h2 = (p >= t2)
h3 = (p >= t3)
h4 = (p >= t4)
```

Where `t1 < t2 < t3 < t4` are within the segment’s `[start,end)`.

This ensures reversibility: when scrolling backward below `t3`, highlight 3 must turn off deterministically.

---

## 7) GSAP/ScrollTrigger binding rules (if using GSAP)

These are *rules of use*, not a requirement to use GSAP. They matter because GSAP can accidentally introduce time-based behavior.

1. All ScrollTriggers must be configured for **scrubbing** (state tied to scroll), not play-once animations.
2. Do not use `repeat`, `yoyo`, or timelines driven by time.
3. Any “ease” must be an ease of scroll-progress mapping (i.e., applied to `t` derived from `p`), not a time curve running independently.
4. If using pinning, pin must not create discontinuities in `p` or cause jumps in beanstalk growth.
5. Foreground entry/exit should be expressed as scroll-bound transforms (opacity/translate/scale) derived from segment progress.

---

## 8) Validation checklist (engineering)

An implementation passes this scroll logic contract if and only if:

- **Determinism:** given `(y, y_max)`, the render output is fully determined.
- **Reverse scrubbing:** for any progress `p`, scrolling backward restores the same state as forward traversal at that `p`.
- **Beanstalk persistence:** once `p ≥ BEAN_INTRO_P`, the beanstalk never disappears.
- **Beanstalk monotonicity:** growth is continuous and monotonic in `p` for `p ≥ BEAN_INTRO_P`.
- **Atmosphere scope:** fog/cloud/diffusion never affects foreground legibility.
- **Foreground lifecycle:** no foreground element exists outside its segment range; no hidden state leaks across segments.
- **Background persistence:** the background scene is initialized once and never replaced.

---

## 9) Contract appendix: recommended data shape

A single source-of-truth registry is strongly recommended (TypeScript-ish sketch):

```ts
type SegmentId = string;

type Segment = {
  id: SegmentId;
  start: number;      // p
  enterEnd: number;   // p
  exitStart: number;  // p
  end: number;        // p
  layer: "foreground";
  render: (p: number) => JSX.Element | null;
  pose: (p: number) => {
    opacity: number;
    x?: number; y?: number; scale?: number; rotate?: number;
    zIndex?: number;
    // element-specific params:
    draw?: number;
    highlights?: Record<string, boolean>;
  };
};

type GlobalState = {
  p: number;          // normalized story progress
  alt: number;        // altitude scalar
  fog: number;
  cloud: number;
  diffuse: number;
  beanstalk: {
    exists: boolean;
    g: number;        // growth scalar
  };
};
```

Binding rule: **all per-frame state must be computed from `p`**; `GlobalState` must be recomputable from scratch at any time.

---
