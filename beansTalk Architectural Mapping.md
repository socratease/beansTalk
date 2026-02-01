# beansTalk — Architectural Mapping

This document provides a comprehensive architectural mapping derived from the Design Spec, Visual System Contract, Scroll Logic Contract, and Component Inventory.

---

## 1. Component Hierarchy

```
BeansTalkApp (Root)
│
├── ScrollContainer
│   └── ScrollStateProvider
│       ├── Computes: p (normalized progress)
│       ├── Computes: alt (altitude scalar)
│       └── Computes: beanstalk.g (growth scalar)
│
├── [Layer 1] BackgroundWorld (z-index: 0)
│   ├── PastoralScene
│   │   └── ParallaxController
│   └── AtmosphereController
│       ├── FogOverlay
│       ├── CloudLayer
│       └── LightDiffusionFilter
│
├── [Layer 2] Beanstalk (z-index: 1)
│   └── BeanstalkRenderer
│       ├── Implementation: SVG | Canvas | DOM
│       └── GrowthMapper (g → visible extent)
│
└── [Layer 3] ForegroundLayer (z-index: 2)
    └── SegmentRenderer
        └── NarrativeRegistry
            │
            ├── [Act A] Magic Beans & Early Models
            │   ├── TechUtopiaOverlaySet
            │   ├── QuoteCard (×5)
            │   ├── FloatingYearText (×6)
            │   ├── CostTimelineChart (progressive)
            │   └── DefinitionCard (GPT-3 example)
            │
            ├── [Act B] Definitions & Scaling
            │   ├── DefinitionCard (×2)
            │   ├── ComputeCostTable
            │   └── OrdersOfMagnitudeDemo
            │
            ├── [Act C] Historical Beans & Capex
            │   ├── SectionTitle
            │   ├── LottieGroup (Manhattan + Apollo)
            │   ├── ComputeCostTable (roadmap)
            │   ├── ComputeCostTable (highlight sequence)
            │   └── CapexComparisonTable
            │
            └── [Act D] Core Disciplines & Close
                ├── SectionTitle
                ├── BulletRevealList
                └── FooterThankYou
```

### Component Responsibility Matrix

| Component | Layer | Persistence | State Authority |
|-----------|-------|-------------|-----------------|
| `BeansTalkApp` | Root | Entire session | Scroll position ownership |
| `ScrollContainer` | Infrastructure | Entire session | Coordinate system |
| `ScrollStateProvider` | Infrastructure | Entire session | Derived state computation |
| `BackgroundWorld` | 1 | Entire session | None (read-only from atmosphere) |
| `AtmosphereController` | 1 | Entire session | Fog, cloud, diffusion values |
| `Beanstalk` | 2 | After BEAN_INTRO_P | None (read-only from g) |
| `BeanstalkRenderer` | 2 | After BEAN_INTRO_P | Visual representation |
| `ForegroundLayer` | 3 | Entire session | Active segment selection |
| `NarrativeSegment` | 3 | Segment range only | None (stateless) |

---

## 2. Persistent State Variables

### 2.1 Global State (Single Source of Truth)

| Variable | Type | Range | Derivation | Persistence |
|----------|------|-------|------------|-------------|
| `y` | number | `[0, y_max]` | Raw scrollTop | Session |
| `y_max` | number | pixels | scrollHeight − clientHeight | Session |
| `p` | number | `[0, 1]` | `clamp01(1 − (y / y_max))` | Computed per frame |

### 2.2 Altitude & Atmosphere State

| Variable | Type | Range | Derivation | Scope |
|----------|------|-------|------------|-------|
| `alt` | number | `[0, 1]` | `smoothstep(ALT_START, ALT_END, p)` | Background + Beanstalk |
| `fog` | number | `[0, 1]` | `smoothstep(0.10, 1.00, alt)` | Background + Beanstalk |
| `cloud` | number | `[0, 1]` | `smoothstep(0.25, 1.00, alt)` | Background + Beanstalk |
| `diffuse` | number | `[0, 1]` | `smoothstep(0.00, 1.00, alt)` | Background + Beanstalk |

**Atmosphere Constants:**
- `ALT_START = 0.55` — Atmosphere begins changing
- `ALT_END = 0.95` — Maximum cloud city interference

### 2.3 Beanstalk State

| Variable | Type | Range | Derivation | Persistence |
|----------|------|-------|------------|-------------|
| `beanstalk.exists` | boolean | — | `p >= BEAN_INTRO_P` | After introduction: permanent |
| `beanstalk.g` | number | `[0, 1]` | `clamp01((p − BEAN_INTRO_P) / (1 − BEAN_INTRO_P))` | Monotonic after introduction |

**Beanstalk Constants:**
- `BEAN_INTRO_P = 0.36` — Beanstalk first appears
- `BEAN_FULL_P = 0.40` — Initial emergence animation complete

### 2.4 Per-Segment State (Ephemeral)

| Variable | Type | Scope | Derivation |
|----------|------|-------|------------|
| `tEnter` | number | Segment | `rangeT(start, enterEnd, p)` |
| `tExit` | number | Segment | `rangeT(exitStart, end, p)` |
| `opacity` | number | Segment | `smoothstep(0,1,tEnter) * (1 - smoothstep(0,1,tExit))` |
| `draw` | number | Charts | `smoothstep(start, enterEnd, p)` |
| `highlights` | Record<string, boolean> | Tables | `p >= threshold_n` |

---

## 3. Scroll Ranges to State Changes Mapping

### 3.1 Global State Transitions

| Progress (p) | Event | State Changes |
|--------------|-------|---------------|
| `0.00` | Story begins | `alt=0`, `fog=0`, `cloud=0`, `diffuse=0`, `beanstalk.exists=false` |
| `0.36` | Beanstalk introduction | `beanstalk.exists=true`, `beanstalk.g=0` |
| `0.40` | Beanstalk emerged | `beanstalk.g≈0.0625` |
| `0.55` | Atmosphere begins | `alt>0`, fog/cloud/diffuse start increasing |
| `0.95` | Maximum altitude | `alt=1`, `fog=1`, `cloud=1`, `diffuse=1` |
| `1.00` | Story ends | `beanstalk.g=1` (full growth) |

### 3.2 Narrative Segment Registry (Ordered)

#### Act A — Magic Beans and Early Models (p ≈ 0.00–0.40)

| ID | Segment | Approx. Range | Components | Special State |
|----|---------|---------------|------------|---------------|
| A0 | `pastoral_tech_utopia_dropins` | 0.00–0.05 | `TechUtopiaOverlaySet` | Sequential overlay reveals |
| A1 | `quote_allure_of_legume` | 0.03–0.07 | `QuoteCard` | — |
| A2 | `year_2018` | 0.06–0.09 | `FloatingYearText` | — |
| A3 | `chart_cost_gpt1_gpt2` | 0.08–0.12 | `CostTimelineChart` | `draw` progress |
| A4 | `quote_cow_ill_spent` | 0.11–0.15 | `QuoteCard` | — |
| A5 | `year_2019` | 0.14–0.17 | `FloatingYearText` | — |
| A6 | `chart_cost_add_gpt3` | 0.16–0.20 | `CostTimelineChart` | `draw` progress (cumulative) |
| A7 | `card_gpt3_example` | 0.19–0.24 | `DefinitionCard` | — |
| A8 | `quote_tragic_scenes` | 0.23–0.27 | `QuoteCard` | — |
| A9 | `year_2020` | 0.26–0.29 | `FloatingYearText` | — |
| A10 | `chart_cost_add_gpt35_chatgpt` | 0.28–0.33 | `CostTimelineChart` | `draw` progress (cumulative) |
| A11 | `quote_beanstalk_rockets` | 0.32–0.38 | `QuoteCard` | **Triggers beanstalk intro** |
| A12 | `year_2023` | 0.36–0.40 | `FloatingYearText` | `beanstalk.exists=true` |
| A13 | `chart_cost_add_gpt4o` | 0.39–0.44 | `CostTimelineChart` | `draw` progress (cumulative) |
| A14 | `quote_garbanzo_empowers` | 0.43–0.48 | `QuoteCard` | — |
| A15 | `year_2024` | 0.47–0.51 | `FloatingYearText` | — |
| A16 | `chart_cost_add_gpt5_series` | 0.50–0.55 | `CostTimelineChart` | `draw` progress (cumulative) |
| A17 | `quote_legume_denial` | 0.54–0.59 | `QuoteCard` | — |
| A18 | `year_2026` | 0.58–0.62 | `FloatingYearText` | Atmosphere begins |

#### Act B — Definitions and Scaling (p ≈ 0.60–0.72)

| ID | Segment | Approx. Range | Components | Special State |
|----|---------|---------------|------------|---------------|
| B0 | `card_definition_beanstalk` | 0.60–0.65 | `DefinitionCard` | — |
| B1 | `card_definition_scaling_hypothesis` | 0.64–0.69 | `DefinitionCard` | — |
| B2 | `table_compute_cost_growth` | 0.68–0.74 | `ComputeCostTable` | Row highlight sequence |
| B3 | `cookie_oom_demo_overlay` | 0.73–0.78 | `OrdersOfMagnitudeDemo` | Escalating circles, scene clear |

#### Act C — Historical Beans and Capex (p ≈ 0.76–0.90)

| ID | Segment | Approx. Range | Components | Special State |
|----|---------|---------------|------------|---------------|
| C0 | `title_historical_beans` | 0.76–0.79 | `SectionTitle` | — |
| C1 | `lottie_scientists_manhattan` | 0.78–0.82 | `LottieGroup` | Scroll-driven Lottie |
| C2 | `lottie_scientists_apollo` | 0.81–0.85 | `LottieGroup` | Scroll-driven Lottie |
| C3 | `table_compute_power_roadmap` | 0.84–0.89 | `ComputeCostTable` | — |
| C4 | `table_highlight_sequence` | 0.88–0.93 | `ComputeCostTable` | Sequential cell highlights |
| C5 | `table_capex_vs_gdp` | 0.92–0.96 | `CapexComparisonTable` | — |

#### Act D — Core Disciplines and Close (p ≈ 0.94–1.00)

| ID | Segment | Approx. Range | Components | Special State |
|----|---------|---------------|------------|---------------|
| D0 | `title_disciplines` | 0.94–0.96 | `SectionTitle` | — |
| D1 | `bullets_core_disciplines` | 0.95–0.99 | `BulletRevealList` | Sequential bullet reveals |
| D2 | `thank_you_footer` | 0.98–1.00 | `FooterThankYou` | — |

### 3.3 Table Highlight State Machine (C4)

For `table_highlight_sequence_investments`:

| Threshold | Progress (p) | Highlight State |
|-----------|--------------|-----------------|
| `t1` | 0.89 | `h1 = true` — First investment highlighted |
| `t2` | 0.90 | `h2 = true` — Second investment highlighted |
| `t3` | 0.91 | `h3 = true` — Third investment highlighted |
| `t4` | 0.92 | `h4 = true` — Fourth investment highlighted |

**Reversibility Rule:** When `p < t_n`, highlight `h_n` must be `false`.

### 3.4 Beanstalk Growth Curve

| Progress (p) | Growth (g) | Visual State |
|--------------|------------|--------------|
| < 0.36 | N/A | Not rendered |
| 0.36 | 0.00 | First appearance (seed/sprout) |
| 0.40 | 0.0625 | Initial emergence complete |
| 0.50 | 0.22 | Early growth |
| 0.60 | 0.375 | Mid growth |
| 0.70 | 0.53 | Substantial height |
| 0.80 | 0.69 | Approaching clouds |
| 0.90 | 0.84 | In cloud layer |
| 1.00 | 1.00 | Maximum height |

**Formula:** `g = clamp01((p − 0.36) / (1 − 0.36))`

### 3.5 Atmosphere Progression Curve

| Progress (p) | Altitude (alt) | Fog | Cloud | Diffuse |
|--------------|----------------|-----|-------|---------|
| 0.00–0.55 | 0.00 | 0.00 | 0.00 | 0.00 |
| 0.60 | 0.03 | 0.00 | 0.00 | 0.03 |
| 0.70 | 0.16 | 0.07 | 0.00 | 0.16 |
| 0.80 | 0.50 | 0.44 | 0.33 | 0.50 |
| 0.90 | 0.84 | 0.82 | 0.79 | 0.84 |
| 0.95 | 1.00 | 1.00 | 1.00 | 1.00 |

---

## 4. Layer Authority Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCROLL POSITION (y)                          │
│                         ↓                                       │
│                   PROGRESS (p)                                  │
│                    ↓     ↓     ↓                                │
├─────────────────┬───────────────────┬───────────────────────────┤
│   LAYER 1       │     LAYER 2       │        LAYER 3            │
│   Background    │     Beanstalk     │        Foreground         │
├─────────────────┼───────────────────┼───────────────────────────┤
│ Reads:          │ Reads:            │ Reads:                    │
│ • alt           │ • beanstalk.g     │ • segment ranges          │
│ • fog           │ • fog, cloud      │ • p (for pose)            │
│ • cloud         │                   │                           │
│ • diffuse       │                   │                           │
├─────────────────┼───────────────────┼───────────────────────────┤
│ Writes:         │ Writes:           │ Writes:                   │
│ • NOTHING       │ • NOTHING         │ • NOTHING                 │
├─────────────────┼───────────────────┼───────────────────────────┤
│ Forbidden:      │ Forbidden:        │ Forbidden:                │
│ • Modify p      │ • Modify p        │ • Modify p                │
│ • Affect L2/L3  │ • Affect L1/L3    │ • Affect L1/L2            │
│ • Reset/remove  │ • Shrink          │ • Persist outside range   │
│                 │ • Disappear       │ • Modify atmosphere       │
└─────────────────┴───────────────────┴───────────────────────────┘
```

---

## 5. TypeScript Type Definitions

```typescript
// Core State Types
interface GlobalState {
  // Scroll
  y: number;
  y_max: number;
  p: number;

  // Atmosphere
  alt: number;
  fog: number;
  cloud: number;
  diffuse: number;

  // Beanstalk
  beanstalk: {
    exists: boolean;
    g: number;
  };
}

// Segment Definition
interface Segment {
  id: string;
  start: number;
  enterEnd: number;
  exitStart: number;
  end: number;
  layer: 'foreground';
  render: (p: number) => JSX.Element | null;
  pose: (p: number) => SegmentPose;
}

interface SegmentPose {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  zIndex?: number;
  draw?: number;
  highlights?: Record<string, boolean>;
}

// Constants
const CONSTANTS = {
  ALT_START: 0.55,
  ALT_END: 0.95,
  BEAN_INTRO_P: 0.36,
  BEAN_FULL_P: 0.40,
} as const;
```

---

## 6. Validation Checklist

### Determinism
- [ ] Given `(y, y_max)`, render output is fully determined
- [ ] No time-based animations
- [ ] No hidden internal state

### Reversibility
- [ ] Forward scroll to `p=0.5`, then backward to `p=0.3` equals direct scroll to `p=0.3`
- [ ] All segment states restore correctly
- [ ] Beanstalk growth decreases smoothly (never jumps)

### Layer Integrity
- [ ] Background never removed or replaced
- [ ] Beanstalk never disappears after `p >= 0.36`
- [ ] Beanstalk never shrinks
- [ ] Foreground elements leave no residue outside ranges

### Atmosphere Scope
- [ ] Fog/cloud/diffuse only affect Layers 1 and 2
- [ ] Foreground content always legible

---

*Generated from: Design Spec, Visual System Contract, Scroll Logic Contract, Component Inventory*
