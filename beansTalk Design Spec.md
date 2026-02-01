### **beansTalk — Visual & Interaction Design Spec**

**Objective**  
 Create a scroll-driven narrative presentation where technological progress is encoded spatially and atmospherically through a persistent world, a growing beanstalk, and transient narrative elements.

---

### **Structural Model**

**Viewport is divided into layers, not slides.**

| Layer | Persistence | Purpose |
| ----- | ----- | ----- |
| Background World | Entire presentation | Emotional continuity, metaphorical grounding |
| Beanstalk | Introduced mid-presentation, then persistent | Progress tracker, scale reference |
| Narrative Foreground | Scroll-bound | Information delivery |

---

### **Background World**

* Single pastoral scene rendered once.

* Evolves via:

  * Atmospheric overlays (fog, clouds, light diffusion)

  * Subtle parallax

* No camera movement.

* Never removed, replaced, or reset.

---

### **Beanstalk**

* Appears at a defined scroll threshold.

* Anchored to bottom-left of viewport.

* Grows upward continuously as scroll increases.

* Growth is monotonic and irreversible.

* Visually interacts with atmosphere (fog, clouds).

* Serves as a spatial metaphor for scale, investment, and uncertainty.

---

### **Narrative Foreground**

* Cards, charts, tables, animations, text.

* Each element has:

  * Entry scroll range

  * Dwell range

  * Exit scroll range

* Elements never persist outside their defined ranges.

* Always visually foregrounded above background and beanstalk.

---

### **Scroll & State Rules**

* Scroll position is authoritative.

* No time-based animation loops.

* Reverse scrolling restores prior visual states deterministically.

* No element modifies another layer’s state.

---

### **Atmosphere & Altitude**

* Abstract altitude value increases with scroll.

* Altitude controls:

  * Fog density

  * Cloud intrusion

  * Light diffusion

* Atmosphere affects only background \+ beanstalk.

---

### **Styling Progression**

* Early: illustrative, playful, organic.

* Late: technical, infrastructural, restrained.

* Transition is gradual and continuous.

---

### **Non-Goals**

* No slide metaphor.

* No narrated text rendered visually.

* No camera fly-throughs.

* No timeline UI widgets.

