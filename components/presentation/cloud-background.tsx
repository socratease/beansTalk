"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface CloudBackgroundProps {
  totalHeight: number;
}

export function CloudBackground({ totalHeight }: CloudBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fogOpacity, setFogOpacity] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track scroll progress to increase fog/cloud density
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // Fog increases as we scroll (climb the beanstalk)
        setFogOpacity(Math.min(self.progress * 0.8, 0.7));
      },
    });

    // Animate cloud layers with parallax
    const clouds = containerRef.current.querySelectorAll(".cloud-layer");
    clouds.forEach((cloud, index) => {
      const speed = 0.1 + index * 0.05;
      gsap.to(cloud, {
        y: () => -speed * window.innerHeight,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    >
      {/* Base gradient - goes from earthy ground to sky */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(
            to top,
            oklch(0.85 0.08 100) 0%,
            oklch(0.90 0.05 110) 20%,
            oklch(0.94 0.03 180) 50%,
            oklch(0.96 0.02 200) 80%,
            oklch(0.98 0.01 210) 100%
          )`,
        }}
      />

      {/* Cloud layers - increase density with scroll */}
      <div
        className="cloud-layer absolute inset-0"
        style={{ opacity: fogOpacity * 0.3 }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="cloudBlur1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
          </defs>
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`cloud1-${i}`}
              cx={`${15 + i * 12}%`}
              cy={`${20 + (i % 3) * 25}%`}
              rx="15%"
              ry="8%"
              fill="var(--cloud-light)"
              filter="url(#cloudBlur1)"
            />
          ))}
        </svg>
      </div>

      <div
        className="cloud-layer absolute inset-0"
        style={{ opacity: fogOpacity * 0.5 }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="cloudBlur2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>
          </defs>
          {[...Array(6)].map((_, i) => (
            <ellipse
              key={`cloud2-${i}`}
              cx={`${10 + i * 18}%`}
              cy={`${30 + (i % 2) * 30}%`}
              rx="20%"
              ry="10%"
              fill="var(--cloud-mid)"
              filter="url(#cloudBlur2)"
            />
          ))}
        </svg>
      </div>

      <div
        className="cloud-layer absolute inset-0"
        style={{ opacity: fogOpacity * 0.7 }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="cloudBlur3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
            </filter>
          </defs>
          {[...Array(5)].map((_, i) => (
            <ellipse
              key={`cloud3-${i}`}
              cx={`${5 + i * 22}%`}
              cy={`${15 + (i % 3) * 25}%`}
              rx="25%"
              ry="12%"
              fill="var(--cloud-shadow)"
              filter="url(#cloudBlur3)"
            />
          ))}
        </svg>
      </div>

      {/* Fog overlay that intensifies as you scroll up */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(255, 255, 255, ${fogOpacity * 0.3}) 50%,
            rgba(255, 255, 255, ${fogOpacity * 0.5}) 100%
          )`,
        }}
      />

      {/* Blueprint grid overlay - subtle technical element */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(var(--blueprint-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--blueprint-line) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
