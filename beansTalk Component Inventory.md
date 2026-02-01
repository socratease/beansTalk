# beansTalk — Component Inventory

This document enumerates the **concrete components** required to implement the beansTalk application in compliance with the narrative prompt, visual system contract, and scroll logic contract.

It is not a design document and not an implementation guide.  
It is a **canonical inventory of parts**, their responsibilities, and their authority boundaries.

Sources:
- Narrative Prompt
- Visual & Interaction Design Spec
- Visual System Contract
- Scroll Logic Contract

---

## 1. Top-Level Application Components

### 1.1 `BeansTalkApp`
**Type:** Root application shell  
**Persistence:** Entire session  

**Responsibilities**
- Owns the scroll container
- Computes normalized scroll progress `p`
- Derives global state (altitude, atmosphere, beanstalk growth)
- Orchestrates rendering of the three layers
- Enforces single-source-of-truth scroll semantics

---

### 1.2 `ScrollContainer`
**Type:** Structural / layout  
**Persistence:** Entire session  

**Responsibilities**
- Provides vertical scroll affordance
- Defines scroll coordinate system (bottom → top progression)
- Exposes `scrollTop`, `scrollHeight`, `clientHeight`

---

### 1.3 `ScrollStateProvider`
**Type:** Pure computation / state derivation  
**Persistence:** Entire session  

**Responsibilities**
- Converts raw scroll position into normalized progress
- Computes altitude and atmosphere channels
- Computes beanstalk existence and growth scalar
- Deterministic and recomputable

---

## 2. Layer Components

### 2.1 Background World Layer

#### `BackgroundWorld`
- Persistent pastoral scene
- Initialized once
- Evolves only via scroll-mapped atmosphere and parallax

#### `AtmosphereController`
- Maps altitude → fog, clouds, diffusion
- Affects background + beanstalk only

---

### 2.2 Beanstalk Layer

#### `Beanstalk`
- Introduced mid-presentation
- Persistent thereafter
- Monotonic scroll-driven growth

#### `BeanstalkRenderer`
- SVG / Canvas / DOM implementation
- Revealed extent = pure function of growth scalar

---

### 2.3 Narrative Foreground Layer

#### `ForegroundLayer`
- Renders only active narrative segments
- Always above background + beanstalk

#### `NarrativeSegment`
- Scroll-range bound
- Stateless
- Entry / dwell / exit phases

---

## 3. Foreground Component Primitives

### Text
- `FloatingYearText`
- `QuoteCard`
- `SectionTitle`
- `DefinitionCard`
- `FooterThankYou`

### Data Visualization
- `CostTimelineChart`
- `ComputeCostTable`
- `CapexComparisonTable`

### Illustrative / Animation
- `TechUtopiaOverlaySet`
- `LottieGroup`

### Conceptual Demos
- `OrdersOfMagnitudeDemo`

### Lists
- `BulletRevealList`

---

## 4. Registry & Infrastructure

### `NarrativeRegistry`
- Ordered segment definitions
- Scroll ranges
- Component mapping

### `SegmentRenderer`
- Selects active segments from progress
- Invokes render + pose logic

---

## 5. Explicit Non-Components

- Slides
- Timelines
- Time-based animations
- Camera controllers
- Persistent UI chrome

---

## 6. Summary

This inventory defines **what must exist** to implement beansTalk correctly.

Any component that:
- Breaks scroll determinism
- Violates layer boundaries
- Persists state improperly

…is **invalid**, regardless of visual quality.
