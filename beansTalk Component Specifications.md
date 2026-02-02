# beansTalk — Component Specifications

This document defines the **detailed specifications** for each component in the beansTalk application. For every component, it describes responsibilities, inputs, and explicit prohibitions.

**Global Rule:** Components must not manage global scroll state unless explicitly specified below. Only `BeansTalkApp` and `ScrollStateProvider` have authority over scroll state.

Sources:
- Component Inventory
- Architectural Mapping
- Visual System Contract
- Scroll-Driven State Logic

---

## 1. Top-Level Application Components

### 1.1 `BeansTalkApp`

**Type:** Root application shell
**Persistence:** Entire session

#### Responsibilities

- Owns the scroll container and scroll event listeners
- Computes normalized scroll progress `p` from raw scroll position
- Derives all global state (altitude, atmosphere, beanstalk growth)
- Orchestrates rendering of the three visual layers
- Enforces single-source-of-truth scroll semantics
- Provides global state to child components via context/props

#### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `y` | number | ScrollContainer | Raw scrollTop value (pixels) |
| `y_max` | number | ScrollContainer | scrollHeight − clientHeight (pixels) |

#### Must NOT Do

- Implement time-based animations or timers
- Delegate scroll state computation to child components
- Allow multiple sources of scroll truth
- Cache or stale scroll-derived values across frames
- Permit any component to mutate global state

---

### 1.2 `ScrollContainer`

**Type:** Structural / layout
**Persistence:** Entire session

#### Responsibilities

- Provides vertical scroll affordance to the user
- Defines the scroll coordinate system (bottom → top progression)
- Exposes `scrollTop`, `scrollHeight`, and `clientHeight` values
- Emits scroll events to parent components

#### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `children` | ReactNode | Parent | Content to render within scrollable area |

#### Must NOT Do

- Compute or derive any visual state from scroll position
- Manage global scroll state (defers to `BeansTalkApp`)
- Intercept or transform scroll events beyond exposure
- Implement scroll snapping or programmatic scroll manipulation
- Store scroll position in local state for state derivation

---

### 1.3 `ScrollStateProvider`

**Type:** Pure computation / state derivation
**Persistence:** Entire session

#### Responsibilities

- Converts raw scroll position `(y, y_max)` into normalized progress `p`
- Computes altitude scalar `alt` from progress
- Computes atmosphere channels: `fog`, `cloud`, `diffuse`
- Computes beanstalk existence predicate and growth scalar `g`
- Provides derived state to consuming components
- Guarantees deterministic and recomputable outputs

#### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `y` | number | BeansTalkApp | Raw scrollTop value (pixels) |
| `y_max` | number | BeansTalkApp | Maximum scrollable distance (pixels) |

#### Outputs (Derived State)

| Output | Type | Range | Description |
|--------|------|-------|-------------|
| `p` | number | [0, 1] | Normalized scroll progress |
| `alt` | number | [0, 1] | Altitude scalar |
| `fog` | number | [0, 1] | Fog density channel |
| `cloud` | number | [0, 1] | Cloud intrusion channel |
| `diffuse` | number | [0, 1] | Light diffusion channel |
| `beanstalk.exists` | boolean | — | Whether beanstalk is visible |
| `beanstalk.g` | number | [0, 1] | Beanstalk growth scalar |

#### Must NOT Do

- Store previous scroll positions for comparison
- Implement any time-based or frame-based logic
- Apply non-deterministic transformations (randomness, noise)
- Cache values beyond the current computation frame
- Emit side effects or trigger external state changes

---

## 2. Layer Components

### 2.1 Background World Layer

#### `BackgroundWorld`

**Type:** Visual layer container
**Persistence:** Entire session
**Z-Index:** 0 (bottommost)

##### Responsibilities

- Renders the persistent pastoral scene
- Initializes once at application start
- Evolves only via scroll-mapped atmosphere values
- Applies subtle parallax effects based on scroll progress
- Contains atmosphere-affected sub-components

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `fog` | number | ScrollStateProvider | Fog density [0, 1] |
| `cloud` | number | ScrollStateProvider | Cloud intrusion [0, 1] |
| `diffuse` | number | ScrollStateProvider | Light diffusion [0, 1] |
| `p` | number | ScrollStateProvider | Scroll progress for parallax |

##### Must NOT Do

- Manage global scroll state
- React to or be aware of foreground elements
- Implement camera pans, zooms, or fly-throughs
- Replace, reset, or swap the scene
- Affect Layer 2 (Beanstalk) or Layer 3 (Foreground) state
- Remove itself or any sub-components during session

---

#### `AtmosphereController`

**Type:** Effect controller
**Persistence:** Entire session

##### Responsibilities

- Maps altitude scalar to visual fog overlay opacity
- Controls cloud particle layer visibility and position
- Adjusts light diffusion (color temperature, shadow softness)
- Applies atmosphere effects to background and beanstalk only

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `alt` | number | ScrollStateProvider | Altitude scalar [0, 1] |
| `fog` | number | ScrollStateProvider | Fog density [0, 1] |
| `cloud` | number | ScrollStateProvider | Cloud intrusion [0, 1] |
| `diffuse` | number | ScrollStateProvider | Light diffusion [0, 1] |

##### Must NOT Do

- Manage global scroll state
- Compute fog/cloud/diffuse values (receives them as inputs)
- Apply atmosphere effects to foreground layer
- Obscure foreground informational content legibility
- Implement time-based atmospheric animations

---

### 2.2 Beanstalk Layer

#### `Beanstalk`

**Type:** Progress structure
**Persistence:** After `BEAN_INTRO_P` (p ≥ 0.36)
**Z-Index:** 1 (middle layer)

##### Responsibilities

- Renders when `beanstalk.exists` is true
- Displays growth proportional to growth scalar `g`
- Maintains visual persistence once introduced
- Interacts with atmosphere (affected by fog and cloud)
- Serves as visual progress indicator

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `exists` | boolean | ScrollStateProvider | Whether to render |
| `g` | number | ScrollStateProvider | Growth scalar [0, 1] |
| `fog` | number | ScrollStateProvider | For desaturation effect |
| `cloud` | number | ScrollStateProvider | For cloud interaction |

##### Must NOT Do

- Manage global scroll state
- Compute its own growth scalar (receives as input)
- Shrink, disappear, or reset once introduced
- Violate monotonicity (growth can only increase with scroll)
- Affect Layer 1 (Background) or Layer 3 (Foreground) state
- Implement time-based growth animations
- Apply oscillation, decay, or randomness to growth

---

#### `BeanstalkRenderer`

**Type:** Visual implementation
**Persistence:** After `BEAN_INTRO_P`

##### Responsibilities

- Implements SVG, Canvas, or DOM rendering of beanstalk
- Maps growth scalar `g` to visible extent
- Handles stroke-dashoffset or segment visibility
- Renders leaves, tendrils proportional to growth

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `g` | number | Beanstalk | Growth scalar [0, 1] |
| `maxHeight` | number | Config | Maximum beanstalk height |
| `saturation` | number | Beanstalk | Desaturation from fog |

##### Must NOT Do

- Manage global scroll state
- Store or interpolate growth values over time
- Apply easing independent of scroll position
- Render beyond the growth scalar permits
- Implement procedural/random variations per frame

---

### 2.3 Narrative Foreground Layer

#### `ForegroundLayer`

**Type:** Layer container
**Persistence:** Entire session (content is ephemeral)
**Z-Index:** 2 (topmost)

##### Responsibilities

- Renders only segments active at current scroll progress
- Ensures foreground content is always above background and beanstalk
- Delegates segment selection to `SegmentRenderer`
- Maintains clear z-ordering above atmosphere effects

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `p` | number | ScrollStateProvider | Current scroll progress |
| `segments` | Segment[] | NarrativeRegistry | Available segments |

##### Must NOT Do

- Manage global scroll state
- Modify background world state
- Modify beanstalk growth state
- Modify global atmosphere values
- Persist visual elements outside their scroll ranges
- Apply atmosphere effects to its content

---

#### `NarrativeSegment`

**Type:** Content container
**Persistence:** Only within its scroll range

##### Responsibilities

- Defines entry, dwell, and exit scroll ranges
- Computes its own pose (opacity, position) from progress `p`
- Renders content only when within its active range
- Cleans up completely when outside range

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `p` | number | ForegroundLayer | Current scroll progress |
| `start` | number | Config | Segment start progress |
| `enterEnd` | number | Config | End of entry transition |
| `exitStart` | number | Config | Start of exit transition |
| `end` | number | Config | Segment end progress |

##### Must NOT Do

- Manage global scroll state
- Store state that persists beyond its scroll range
- Affect other segments' state or timing
- Modify any layer outside the foreground
- Leave visual residue after exiting range
- Implement time-based entry/exit animations

---

## 3. Foreground Component Primitives

### Text Components

#### `FloatingYearText`

**Type:** Text display primitive
**Persistence:** Segment range only

##### Responsibilities

- Displays year labels at specified scroll positions
- Animates opacity based on segment pose
- Supports positioning via pose coordinates

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `year` | string | Config | Year to display (e.g., "2018") |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position, scale |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Store internal animation state
- Affect other components

---

#### `QuoteCard`

**Type:** Text display primitive
**Persistence:** Segment range only

##### Responsibilities

- Displays quotation text with attribution
- Animates via segment pose (opacity, position)
- Applies consistent quote styling

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `quote` | string | Config | Quote text content |
| `attribution` | string | Config | Quote source/author |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position, scale |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Implement its own animation timing
- Modify surrounding visual state

---

#### `SectionTitle`

**Type:** Text display primitive
**Persistence:** Segment range only

##### Responsibilities

- Displays section heading text
- Animates via segment pose
- Applies section title typography

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `title` | string | Config | Section title text |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position, scale |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Store any internal state

---

#### `DefinitionCard`

**Type:** Text display primitive
**Persistence:** Segment range only

##### Responsibilities

- Displays term definitions with structured layout
- Animates via segment pose
- Supports term, definition, and optional example

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `term` | string | Config | Term being defined |
| `definition` | string | Config | Definition text |
| `example` | string? | Config | Optional example |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position, scale |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Implement independent animations

---

#### `FooterThankYou`

**Type:** Text display primitive
**Persistence:** Segment range only (end of presentation)

##### Responsibilities

- Displays closing thank you message
- Animates via segment pose
- Signals end of narrative

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `message` | string | Config | Thank you text |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position, scale |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range

---

### Data Visualization Components

#### `CostTimelineChart`

**Type:** Data visualization
**Persistence:** Segment range only

##### Responsibilities

- Renders progressive cost timeline visualization
- Supports cumulative draw progress via `pose.draw`
- Animates data point reveals based on scroll progress

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `data` | DataPoint[] | Config | Timeline data points |
| `pose` | SegmentPose | NarrativeSegment | Opacity and draw progress |
| `cumulative` | boolean | Config | Whether chart is cumulative |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Animate independently of scroll progress
- Store draw progress in local state

---

#### `ComputeCostTable`

**Type:** Data visualization
**Persistence:** Segment range only

##### Responsibilities

- Renders tabular compute cost data
- Supports row highlight sequences via `pose.highlights`
- Animates highlights based on scroll thresholds

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `rows` | TableRow[] | Config | Table data rows |
| `pose` | SegmentPose | NarrativeSegment | Opacity and highlight state |
| `highlightSequence` | string[]? | Config | Order of highlight activation |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Compute highlight thresholds (receives as pose)
- Store highlight state locally

---

#### `CapexComparisonTable`

**Type:** Data visualization
**Persistence:** Segment range only

##### Responsibilities

- Renders capital expenditure comparison data
- Supports standard table styling and animations

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `data` | ComparisonData[] | Config | Comparison data |
| `pose` | SegmentPose | NarrativeSegment | Opacity, position |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Implement independent animations

---

### Illustrative / Animation Components

#### `TechUtopiaOverlaySet`

**Type:** Illustrative overlay
**Persistence:** Segment range only

##### Responsibilities

- Renders sequential utopian illustration overlays
- Manages sub-overlay sequencing within segment range
- Animates via segment pose

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `overlays` | Overlay[] | Config | Overlay image/content list |
| `pose` | SegmentPose | NarrativeSegment | Opacity, sequence progress |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Run time-based overlay transitions
- Affect background or beanstalk layers

---

#### `LottieGroup`

**Type:** Animation container
**Persistence:** Segment range only

##### Responsibilities

- Renders scroll-driven Lottie animations
- Maps scroll progress to Lottie frame
- Supports grouped animation sequences

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `animationData` | LottieData | Config | Lottie JSON data |
| `pose` | SegmentPose | NarrativeSegment | Opacity, draw/frame progress |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Play animations based on time
- Autoplay or loop animations
- Store playback state independently

---

### Conceptual Demos

#### `OrdersOfMagnitudeDemo`

**Type:** Interactive visualization
**Persistence:** Segment range only

##### Responsibilities

- Visualizes orders of magnitude through escalating circles
- Animates circle scaling based on scroll progress
- Clears scene at segment exit

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `magnitudes` | number[] | Config | Scale values to visualize |
| `pose` | SegmentPose | NarrativeSegment | Opacity, scale progress |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Animate independently of scroll
- Leave visual residue after exit

---

### Lists

#### `BulletRevealList`

**Type:** List display
**Persistence:** Segment range only

##### Responsibilities

- Renders bulleted list with sequential reveals
- Maps scroll progress to bullet visibility
- Animates individual bullet entry

##### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `items` | string[] | Config | Bullet text items |
| `pose` | SegmentPose | NarrativeSegment | Opacity, reveal progress |

##### Must NOT Do

- Manage global scroll state
- Persist beyond its segment range
- Store reveal state locally
- Animate bullets independently of scroll

---

## 4. Registry & Infrastructure

### `NarrativeRegistry`

**Type:** Configuration / data structure
**Persistence:** Entire session (static)

#### Responsibilities

- Stores ordered segment definitions
- Defines scroll ranges for all segments
- Maps segment IDs to component types
- Provides segment lookup by progress value

#### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `segments` | SegmentDef[] | Config | Static segment definitions |

#### Must NOT Do

- Manage global scroll state
- Mutate segment definitions at runtime
- Store current progress or active state
- Implement any rendering logic

---

### `SegmentRenderer`

**Type:** Render orchestrator
**Persistence:** Entire session

#### Responsibilities

- Selects active segments from current progress `p`
- Computes segment poses for active segments
- Invokes segment render functions
- Manages segment lifecycle (mount/unmount)

#### Inputs

| Input | Type | Source | Description |
|-------|------|--------|-------------|
| `p` | number | ForegroundLayer | Current scroll progress |
| `registry` | NarrativeRegistry | Config | Segment registry |

#### Must NOT Do

- Manage global scroll state
- Compute global state values (receives `p` only)
- Persist segment state beyond their ranges
- Apply global transformations to segments

---

## 5. Summary

### Authority Hierarchy

```
BeansTalkApp (SOLE scroll state authority)
    │
    ├── ScrollContainer (exposes scroll values only)
    │
    └── ScrollStateProvider (computes derived state)
            │
            ├── BackgroundWorld (reads: fog, cloud, diffuse)
            │   └── AtmosphereController
            │
            ├── Beanstalk (reads: exists, g, fog, cloud)
            │   └── BeanstalkRenderer
            │
            └── ForegroundLayer (reads: p, segments)
                └── SegmentRenderer
                    └── NarrativeSegment (reads: p, range)
                        └── [Primitive Components] (reads: pose)
```

### Global Prohibitions (All Components)

Unless explicitly specified as having scroll state authority:

1. **Must NOT** manage, compute, or modify global scroll state
2. **Must NOT** implement time-based animations
3. **Must NOT** store state that violates scroll reversibility
4. **Must NOT** affect components in other layers
5. **Must NOT** persist visual state outside defined ranges
6. **Must NOT** introduce non-deterministic behavior

### Validation Criteria

A component implementation is valid only if:

- Given identical inputs, it produces identical outputs
- Scrolling backward restores prior visual state exactly
- No visual artifacts remain after exiting scroll range
- No time-dependent behavior exists
- Layer boundaries are respected absolutely

---

*Generated from: Component Inventory, Architectural Mapping, Visual System Contract, Scroll-Driven State Logic*
