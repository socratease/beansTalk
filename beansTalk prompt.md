You are designing a scroll-driven, browser-based narrative presentation.

The presentation has **three independent visual layers**:

1. **Persistent Background World**

   * A single pastoral scene that exists for the entire presentation.

   * It never scrolls away or resets.

   * It evolves only through gradual visual state changes (atmosphere, overlays, parallax, lighting).

   * No foreground element may remove or replace it.

2. **Ephemeral Narrative Foreground**

   * Cards, charts, tables, lottie animations, floating text, and other informational elements.

   * These enter and exit based on defined scroll ranges.

   * They do not persist once their scroll range ends.

   * They must never affect the background or the beanstalk’s state.

3. **Emergent Progress Structure (“The Beanstalk”)**

   * The beanstalk does not exist initially.

   * At a specific scroll trigger, it emerges from the bottom left of the screen.

   * Once introduced, it must **never disappear or shrink**.

   * Its growth is a **continuous, monotonic function of scroll progress** after its introduction.

   * It occupies a fixed left portion of the viewport and serves as a visual progress tracker for the remainder of the presentation.

The verbal script exists separately and does **not** need to be represented visually.

---

**State & Persistence Rules**

* The background world persists for the entire presentation.

* The beanstalk is persistent once introduced and grows continuously.

* Foreground narrative elements are stateless and disposable.

* No visual element should rely on time-based animation; all motion and transitions must be scroll-position-based.

* The experience must be reversible by scrolling backward without glitches, desynchronization, or narrative incoherence.

---

**Scroll Semantics**

* Scroll position is the single source of truth.

* All animations, growth, opacity changes, and transitions are functions of scroll progress, not elapsed time.

* The presentation must scrub cleanly forward and backward.

---

**Atmosphere & Altitude Encoding**

* Conceptual “altitude” increases as the presentation progresses.

* Altitude is encoded visually via atmospheric interference (fog density, cloud position, light diffusion), not camera movement.

* Fog and clouds affect the background and beanstalk only and must never obscure foreground informational content.

---

**Styling Evolution**

* The visual language should gradually transition from whimsical/storybook to technical/infrastructural.

* Early visuals favor softness, organic motion, and illustrative style.

* Later visuals favor precision, grids, restrained motion, and technical typography.

* This transition should be continuous, not abrupt.

---

**Implementation Guidance**

* Treat the background world as a long-lived state machine.

* Treat the beanstalk as a persistent progress meter mapped to scroll progress.

* Treat foreground narrative elements as scroll-range-bound components with clear entry and exit phases.

