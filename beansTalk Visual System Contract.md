# beansTalk — Visual System Contract

## Purpose

This document defines the **non-negotiable visual, structural, and interaction rules** governing the beansTalk application.  
It functions as a binding contract between design, engineering, and AI-assisted code generation.

Any implementation is considered **incorrect** if it violates the persistence, layering, or scroll semantics defined below—even if the output is visually appealing.

This contract supersedes component-level freedom.

---

## Core Design Principle

> **Scroll position is the single source of truth.**

All visual state must be a deterministic function of scroll progress.  
There are no clocks, timers, autoplay animations, or hidden state machines.

---

## System Overview

The presentation is not slide-based.  
It is a **single continuous world** composed of three independent visual layers:

1. Persistent Background World  
2. Emergent Progress Structure (The Beanstalk)  
3. Ephemeral Narrative Foreground

Each layer has strict lifecycle and authority boundaries.

---

## Layer 1: Persistent Background World

### Definition

A single pastoral scene rendered once and never replaced.

### Contractual Rules

- Exists for the **entire duration** of the presentation
- Is initialized exactly once
- Is never removed, reset, or swapped
- Does **not** scroll with content
- Does **not** react to foreground elements

### Allowed Evolutions

The background world may evolve **only** through gradual, scroll-mapped state changes:

- Fog density
- Cloud presence and altitude
- Light diffusion and color temperature
- Subtle parallax (non-camera-moving)

### Prohibited Actions

- Camera pans, zooms, fly-throughs
- Scene cuts or background swaps
- Foreground-driven mutations
- Obscuring foreground informational content

---

## Layer 2: Emergent Progress Structure — “The Beanstalk”

### Definition

A persistent, growing structure representing progress and scale.

### Lifecycle

- **Does not exist initially**
- Appears at a defined scroll threshold
- Once introduced:
  - Never disappears
  - Never shrinks
  - Never resets

### Growth Semantics

- Growth is a **continuous, monotonic function** of scroll progress
- Growth must scrub cleanly forward and backward
- No stepwise jumps or discrete levels
- No time-based easing independent of scroll

### Spatial Constraints

- Anchored to the bottom-left of the viewport
- Occupies a fixed left portion of the screen
- Serves as a visual progress tracker for the remainder of the presentation

### Interaction Rules

- Interacts with atmosphere (fog, clouds)
- Is visually behind all narrative foreground elements
- Is unaffected by narrative content lifecycle

---

## Layer 3: Ephemeral Narrative Foreground

### Definition

All informational elements that enter and exit the scene.

Includes:
- Cards
- Charts
- Tables
- Floating text
- Lottie animations
- Illustrative overlays

### Lifecycle Model

Every foreground element must define:

- Entry scroll range
- Dwell scroll range
- Exit scroll range

Outside its range, the element must not exist.

### State Rules

- Foreground elements are **stateless**
- They may not modify:
  - Background world
  - Beanstalk growth
  - Global atmosphere
- Reverse scrolling must perfectly restore prior states

### Z-Order Rules

- Always rendered above:
  - Background world
  - Beanstalk
- Never obscured by fog or atmospheric effects

---

## Scroll Semantics

### Authority

- Scroll position is authoritative
- No animation may depend on elapsed time
- No hidden internal animation state

### Reversibility

- The entire experience must scrub backward flawlessly
- No desynchronization
- No narrative incoherence
- No animation artifacts

If reversing scroll produces a different state than forward traversal at the same scroll position, the implementation is invalid.

---

## Atmosphere & Altitude Encoding

### Concept

“Altitude” is an abstract scalar derived from scroll progress.

### Altitude Controls

- Fog density
- Cloud intrusion
- Light diffusion

### Scope

- Atmosphere affects:
  - Background world
  - Beanstalk
- Atmosphere must **never** affect narrative foreground legibility

### Prohibited Encodings

- Camera elevation
- Perspective shifts
- World movement

Altitude is *felt*, not traveled.

---

## Styling Evolution Contract

The visual language must evolve continuously over the presentation:

### Early Phase

- Illustrative
- Whimsical
- Organic shapes
- Soft color palette
- Storybook tone

### Late Phase

- Technical
- Infrastructural
- Grid-aligned
- Restrained motion
- Precision typography

### Rule

The transition must be **continuous**, not abrupt.  
No hard aesthetic breaks.

---

## Implementation Guidance (Binding)

- Treat the background world as a **long-lived state machine**
- Treat the beanstalk as a **persistent progress meter**
- Treat foreground elements as **pure scroll-bound functions**
- Never let one layer mutate another layer’s state

---

## Non-Goals (Explicitly Out of Scope)

- Slide metaphors
- Timeline widgets
- Narration text rendered visually
- Camera fly-throughs
- Time-based animation loops

---

## Validation Checklist

An implementation passes this contract only if:

- Scrolling backward perfectly restores prior visual states
- The beanstalk never shrinks or disappears once introduced
- The background scene is never replaced
- Foreground elements leave no residue
- Scroll position alone can reconstruct the entire visual state

