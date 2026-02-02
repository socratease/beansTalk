# beansTalk — Scroll-Driven State Logic

This document defines the **precise mathematical mappings** from scroll position to persistent visual state. It specifies, for each persistent variable, the input scroll range, mapping function, and affected visual systems.

This contract is implementation-agnostic: express all logic as pseudocode and equations, not library-specific code.

---

## 0) Foundational Definitions

### 0.1 Scroll Normalization

All state derivations begin with normalized scroll progress `p`:

```
y       := scrollTop (pixels)
y_max   := scrollHeight - clientHeight (pixels)

p := clamp01(1 - (y / y_max))
```

**Domain:** `p ∈ [0, 1]`
**Semantics:** `p = 0` is story start (bottom); `p = 1` is story end (top)

### 0.2 Core Helper Functions

```
clamp01(x)         := min(1, max(0, x))
lerp(a, b, t)      := a + (b - a) * t
invLerp(a, b, x)   := clamp01((x - a) / (b - a))
smoothstep(a, b, x) := t² * (3 - 2t)  where t = invLerp(a, b, x)
easeInQuad(t)      := t²
easeOutQuad(t)     := 1 - (1 - t)²
easeInOutQuad(t)   := t < 0.5 ? 2t² : 1 - (-2t + 2)² / 2
```

---

## 1) Persistent Variable: Background Atmosphere

The atmosphere system controls environmental mood through three channels: fog density, cloud intrusion, and light diffusion. All channels derive from an intermediate **altitude scalar**.

### 1.1 Altitude Scalar

| Property | Value |
|----------|-------|
| **Input range** | `p ∈ [ALT_START, ALT_END]` |
| **Output range** | `alt ∈ [0, 1]` |
| **Mapping function** | `smoothstep` |
| **Constants** | `ALT_START = 0.55`, `ALT_END = 0.95` |

**Equation:**
```
alt := smoothstep(ALT_START, ALT_END, p)
```

**Behavior:**
- `p < 0.55` → `alt = 0` (no altitude effect)
- `p = 0.75` → `alt ≈ 0.50` (midpoint, smooth curve)
- `p ≥ 0.95` → `alt = 1` (maximum altitude)

---

### 1.2 Fog Density

| Property | Value |
|----------|-------|
| **Input** | `alt ∈ [0, 1]` |
| **Input activation** | `alt ∈ [0.10, 1.00]` |
| **Output range** | `fog ∈ [0, 1]` |
| **Mapping function** | `smoothstep` (delayed onset) |
| **Affected systems** | Background layer opacity, Beanstalk desaturation |

**Equation:**
```
fog := smoothstep(0.10, 1.00, alt)
```

**Scroll-to-Fog Pipeline:**
```
p  ──[smoothstep(0.55, 0.95)]──▶  alt  ──[smoothstep(0.10, 1.00)]──▶  fog
```

**Effective scroll mapping (composed):**

| Scroll Progress (p) | Altitude (alt) | Fog Density (fog) |
|---------------------|----------------|-------------------|
| 0.00 - 0.55 | 0.00 | 0.00 |
| 0.60 | 0.03 | 0.00 |
| 0.65 | 0.16 | 0.01 |
| 0.70 | 0.35 | 0.08 |
| 0.75 | 0.50 | 0.20 |
| 0.80 | 0.66 | 0.39 |
| 0.85 | 0.84 | 0.62 |
| 0.90 | 0.97 | 0.85 |
| 0.95 - 1.00 | 1.00 | 1.00 |

**Visual Application:**
```
background.fogOverlayOpacity := fog * FOG_MAX_OPACITY
beanstalk.saturation := lerp(1.0, DESATURATED, fog)

where:
  FOG_MAX_OPACITY = 0.6   // tunable
  DESATURATED = 0.3       // tunable
```

---

### 1.3 Cloud Intrusion

| Property | Value |
|----------|-------|
| **Input** | `alt ∈ [0, 1]` |
| **Input activation** | `alt ∈ [0.25, 1.00]` |
| **Output range** | `cloud ∈ [0, 1]` |
| **Mapping function** | `smoothstep` (further delayed onset) |
| **Affected systems** | Cloud particle layer, sky gradient blend |

**Equation:**
```
cloud := smoothstep(0.25, 1.00, alt)
```

**Effective scroll mapping:**

| Scroll Progress (p) | Altitude (alt) | Cloud Intrusion (cloud) |
|---------------------|----------------|-------------------------|
| 0.00 - 0.55 | 0.00 | 0.00 |
| 0.65 | 0.16 | 0.00 |
| 0.70 | 0.35 | 0.02 |
| 0.75 | 0.50 | 0.11 |
| 0.80 | 0.66 | 0.30 |
| 0.85 | 0.84 | 0.57 |
| 0.90 | 0.97 | 0.86 |
| 0.95 - 1.00 | 1.00 | 1.00 |

**Visual Application:**
```
cloudLayer.opacity := cloud * CLOUD_MAX_OPACITY
cloudLayer.verticalOffset := lerp(CLOUD_START_Y, CLOUD_END_Y, cloud)
skyGradient.topColor := colorLerp(SKY_CLEAR, SKY_OVERCAST, cloud)

where:
  CLOUD_MAX_OPACITY = 0.8
  CLOUD_START_Y = viewportHeight * 0.3  // clouds start high
  CLOUD_END_Y = viewportHeight * 0.7    // clouds descend
```

---

### 1.4 Light Diffusion

| Property | Value |
|----------|-------|
| **Input** | `alt ∈ [0, 1]` |
| **Input activation** | `alt ∈ [0.00, 1.00]` |
| **Output range** | `diffuse ∈ [0, 1]` |
| **Mapping function** | `smoothstep` (immediate onset) |
| **Affected systems** | Global color temperature, shadow softness, contrast |

**Equation:**
```
diffuse := smoothstep(0.00, 1.00, alt)
```

**Visual Application:**
```
colorTemperature := lerp(WARM_KELVIN, COOL_KELVIN, diffuse)
shadowSoftness := lerp(SHARP_SHADOW, SOFT_SHADOW, diffuse)
globalContrast := lerp(HIGH_CONTRAST, LOW_CONTRAST, diffuse)

where:
  WARM_KELVIN = 5500    // golden hour
  COOL_KELVIN = 7500    // overcast
  SHARP_SHADOW = 0.1    // hard edges
  SOFT_SHADOW = 0.8     // diffused edges
  HIGH_CONTRAST = 1.0
  LOW_CONTRAST = 0.7
```

---

### 1.5 Atmosphere Summary Diagram

```
                    ┌─────────────────────────────────────────────────────┐
                    │              ATMOSPHERE DERIVATION GRAPH            │
                    └─────────────────────────────────────────────────────┘

    SCROLL POSITION                ALTITUDE                    CHANNELS
    ───────────────               ──────────                  ──────────

         p                          alt                    ┌── fog ────────▶ [Fog Overlay]
         │                           │                     │                  [Desaturation]
         │   smoothstep              │   smoothstep        │
         │   (0.55, 0.95)            │   (0.10, 1.00)      │
         ▼                           ├───────────────────▶─┤
    ┌─────────┐                 ┌─────────┐                │
    │ p ∈     │ ───────────────▶│ alt ∈   │                ├── cloud ──────▶ [Cloud Layer]
    │ [0, 1]  │                 │ [0, 1]  │                │   (0.25, 1.00)   [Sky Gradient]
    └─────────┘                 └─────────┘                │
                                     │                     │
                                     │   smoothstep        │
                                     │   (0.00, 1.00)      │
                                     └───────────────────▶─┴── diffuse ───▶ [Color Temp]
                                                                             [Shadows]
                                                                             [Contrast]
```

---

## 2) Persistent Variable: Beanstalk Growth

The beanstalk is a persistent structure that appears at a threshold and grows monotonically thereafter.

### 2.1 Existence Predicate

| Property | Value |
|----------|-------|
| **Input** | `p ∈ [0, 1]` |
| **Output** | `exists ∈ {false, true}` |
| **Mapping function** | `step` (threshold) |
| **Threshold** | `BEAN_INTRO_P = 0.36` |

**Equation:**
```
beanstalk.exists := (p >= BEAN_INTRO_P)
```

**Constraint:** Once `exists` becomes `true`, it must remain `true` for all subsequent scroll positions. Scrolling backward past the threshold returns `exists` to `false`.

---

### 2.2 Growth Scalar

| Property | Value |
|----------|-------|
| **Input range** | `p ∈ [BEAN_INTRO_P, 1.0]` |
| **Output range** | `g ∈ [0, 1]` |
| **Mapping function** | `linear` with `clamp` |
| **Constants** | `BEAN_INTRO_P = 0.36` |
| **Affected systems** | Beanstalk height, leaf density, tendril extent |

**Equation:**
```
g := clamp01((p - BEAN_INTRO_P) / (1 - BEAN_INTRO_P))
```

**Expanded:**
```
g := clamp01((p - 0.36) / 0.64)
```

**Scroll-to-Growth Table:**

| Scroll Progress (p) | Growth Scalar (g) | Visual State |
|---------------------|-------------------|--------------|
| 0.00 - 0.35 | — (not exists) | Beanstalk absent |
| 0.36 | 0.00 | Emergence begins |
| 0.40 | 0.06 | Initial sprout visible |
| 0.50 | 0.22 | Early growth |
| 0.60 | 0.38 | Mid-lower section |
| 0.70 | 0.53 | Midpoint |
| 0.80 | 0.69 | Upper-mid section |
| 0.90 | 0.84 | Near full height |
| 1.00 | 1.00 | Maximum growth |

---

### 2.3 Emergence Animation (Optional Sub-phase)

For a more dramatic introduction, the initial emergence (before linear growth) may use easing:

| Property | Value |
|----------|-------|
| **Input range** | `p ∈ [BEAN_INTRO_P, BEAN_FULL_P]` |
| **Output range** | `emergence ∈ [0, 1]` |
| **Mapping function** | `easeOutQuad` |
| **Constants** | `BEAN_INTRO_P = 0.36`, `BEAN_FULL_P = 0.40` |

**Equation:**
```
if p < BEAN_INTRO_P:
    emergence := 0
elif p < BEAN_FULL_P:
    t := invLerp(BEAN_INTRO_P, BEAN_FULL_P, p)
    emergence := easeOutQuad(t)
else:
    emergence := 1
```

**Combined Growth with Emergence:**
```
if p < BEAN_INTRO_P:
    g := 0
elif p < BEAN_FULL_P:
    // Emergence phase: use eased value for initial reveal
    t := invLerp(BEAN_INTRO_P, BEAN_FULL_P, p)
    g := easeOutQuad(t) * EMERGENCE_HEIGHT_FRACTION
else:
    // Growth phase: linear from emergence end to max
    baseG := EMERGENCE_HEIGHT_FRACTION
    remainingP := invLerp(BEAN_FULL_P, 1.0, p)
    g := baseG + remainingP * (1 - baseG)

where:
    EMERGENCE_HEIGHT_FRACTION = 0.15  // beanstalk is 15% visible at emergence end
```

---

### 2.4 Visual Application

```
beanstalk.visibleHeight := g * BEANSTALK_MAX_HEIGHT
beanstalk.leafCount := floor(g * MAX_LEAVES)
beanstalk.tendrilExtent := g * MAX_TENDRIL_RADIUS

// SVG stroke-dashoffset approach
beanstalk.pathLength := TOTAL_PATH_LENGTH
beanstalk.dashOffset := (1 - g) * TOTAL_PATH_LENGTH

// DOM segment approach
for each segment in beanstalk.segments:
    segment.visible := (segment.normalizedPosition <= g)
```

---

### 2.5 Beanstalk Monotonicity Constraint

**Invariant:** For any two scroll positions where `p2 > p1` and both `p1, p2 >= BEAN_INTRO_P`:

```
g(p2) >= g(p1)
```

**Implementation rule:** Never apply any transformation to `g` that could violate monotonicity (no oscillation, no decay, no randomness).

---

## 3) Derived Variable: Fog Density (Atmosphere Channel)

Fog density is fully specified in Section 1.2 as an atmosphere channel. This section provides the complete derivation chain for implementation reference.

### 3.1 Complete Derivation Chain

```
INPUTS:
    y       : scrollTop (pixels)
    y_max   : scrollHeight - clientHeight (pixels)

CONSTANTS:
    ALT_START = 0.55
    ALT_END   = 0.95
    FOG_ALT_START = 0.10
    FOG_ALT_END   = 1.00

DERIVATION:
    Step 1: Normalize scroll
        p := clamp01(1 - (y / y_max))

    Step 2: Compute altitude
        alt := smoothstep(ALT_START, ALT_END, p)

    Step 3: Compute fog
        fog := smoothstep(FOG_ALT_START, FOG_ALT_END, alt)

OUTPUT:
    fog ∈ [0, 1]
```

### 3.2 Direct Scroll-to-Fog Function

For optimization, the composed function can be expressed directly:

```
fog(p) := smoothstep(0.10, 1.00, smoothstep(0.55, 0.95, p))
```

**Piecewise behavior:**
```
fog(p) =
    0                                       if p < 0.55
    smoothstep(0.10, 1.00, smoothstep(0.55, 0.95, p))  if 0.55 ≤ p < 0.95
    1                                       if p ≥ 0.95
```

---

## 4) Mapping Function Reference

### 4.1 Linear (with clamp)

```
linear(start, end, x) := clamp01((x - start) / (end - start))
```

**Characteristics:**
- Constant rate of change
- No acceleration/deceleration
- Suitable for: growth metrics, progress bars, direct scroll mappings

**Graph:**
```
output
  1 ┤          ●────────────
    │         /
    │        /
    │       /
    │      /
  0 ┼─────●
    └──────┴────┴────┴────▶ input
         start      end
```

---

### 4.2 Smoothstep

```
smoothstep(start, end, x) :=
    t := clamp01((x - start) / (end - start))
    return t² * (3 - 2t)
```

**Characteristics:**
- Zero derivative at endpoints
- Smooth acceleration into, deceleration out of
- Hermite interpolation
- Suitable for: atmospheric effects, natural transitions

**Graph:**
```
output
  1 ┤              ●────────
    │            ╱
    │          ╱
    │        ╱
    │      ╱
  0 ┼────●
    └──────┴────┴────┴────▶ input
         start      end
```

---

### 4.3 Ease-In Quadratic

```
easeInQuad(t) := t²
```

**Characteristics:**
- Starts slow, accelerates
- Derivative at t=0 is 0
- Suitable for: emergence animations, building intensity

**Graph:**
```
output
  1 ┤                    ●
    │                  ╱
    │               ╱
    │           ╱
    │       ╱
  0 ┼──●
    └───┴────┴────┴────┴──▶ t
    0               1
```

---

### 4.4 Ease-Out Quadratic

```
easeOutQuad(t) := 1 - (1 - t)²
```

**Characteristics:**
- Starts fast, decelerates
- Derivative at t=1 is 0
- Suitable for: settling animations, arrival states

**Graph:**
```
output
  1 ┤              ●──────
    │           ╱
    │        ╱
    │     ╱
    │  ╱
  0 ┼●
    └───┴────┴────┴────┴──▶ t
    0               1
```

---

### 4.5 Step (Threshold)

```
step(threshold, x) := x >= threshold ? 1 : 0
```

**Characteristics:**
- Discontinuous
- Binary output
- Suitable for: existence predicates, visibility toggles

**Graph:**
```
output
  1 ┤              ●────────
    │              │
    │              │
    │              │
    │              │
  0 ┼──────────────●
    └──────────────┴───────▶ input
                 threshold
```

---

## 5) Affected Visual Systems Summary

| Persistent Variable | Derived From | Mapping | Affected Systems |
|---------------------|--------------|---------|------------------|
| **Altitude (alt)** | p | smoothstep(0.55, 0.95) | Intermediate only |
| **Fog Density (fog)** | alt | smoothstep(0.10, 1.00) | Fog overlay opacity, Beanstalk saturation |
| **Cloud Intrusion (cloud)** | alt | smoothstep(0.25, 1.00) | Cloud particle layer, Sky gradient |
| **Light Diffusion (diffuse)** | alt | smoothstep(0.00, 1.00) | Color temperature, Shadow softness, Contrast |
| **Beanstalk Exists** | p | step(0.36) | Beanstalk render toggle |
| **Beanstalk Growth (g)** | p | linear(0.36, 1.00) | Height, Leaf count, Tendril extent, Path reveal |

---

## 6) State Update Pseudocode

```
function computeGlobalState(y, y_max):
    // 1. Normalize scroll progress
    p := clamp01(1 - (y / y_max))

    // 2. Compute altitude (intermediate)
    alt := smoothstep(0.55, 0.95, p)

    // 3. Compute atmosphere channels
    fog := smoothstep(0.10, 1.00, alt)
    cloud := smoothstep(0.25, 1.00, alt)
    diffuse := smoothstep(0.00, 1.00, alt)

    // 4. Compute beanstalk state
    beanstalkExists := (p >= 0.36)
    beanstalkG := beanstalkExists ? clamp01((p - 0.36) / 0.64) : 0

    // 5. Return complete state
    return {
        p: p,
        alt: alt,
        atmosphere: {
            fog: fog,
            cloud: cloud,
            diffuse: diffuse
        },
        beanstalk: {
            exists: beanstalkExists,
            g: beanstalkG
        }
    }
```

---

## 7) Validation Rules

An implementation correctly implements this scroll-driven state logic if:

1. **Determinism:** `computeGlobalState(y, y_max)` returns identical output for identical inputs
2. **Continuity:** All continuous variables (alt, fog, cloud, diffuse, g) change smoothly with scroll
3. **Monotonicity:** Beanstalk growth `g` is monotonically non-decreasing for increasing `p`
4. **Range compliance:** All output values remain within specified `[0, 1]` bounds
5. **Reversibility:** Scrolling from `p=0.8` to `p=0.5` produces the same state as directly scrolling to `p=0.5`

---

## 8) Tunable Constants Reference

| Constant | Default | Valid Range | Description |
|----------|---------|-------------|-------------|
| `ALT_START` | 0.55 | [0.3, 0.7] | Scroll progress where atmosphere begins |
| `ALT_END` | 0.95 | [0.8, 1.0] | Scroll progress where atmosphere maxes |
| `BEAN_INTRO_P` | 0.36 | [0.2, 0.5] | Scroll progress where beanstalk appears |
| `BEAN_FULL_P` | 0.40 | [BEAN_INTRO_P + 0.02, 0.5] | End of emergence phase |
| `FOG_MAX_OPACITY` | 0.6 | [0.3, 0.8] | Maximum fog overlay opacity |
| `CLOUD_MAX_OPACITY` | 0.8 | [0.5, 1.0] | Maximum cloud layer opacity |

**Constraint:** Changing constants must preserve the ordering relationships:
- `ALT_START < ALT_END`
- `BEAN_INTRO_P < BEAN_FULL_P`

---
