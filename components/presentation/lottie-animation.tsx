"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

// Note: This uses dotLottie for modern Lottie support
// Install with: npm install @lottiefiles/dotlottie-react

interface LottieAnimationProps {
  src: string; // URL to .lottie or .json file
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  playOnScroll?: boolean;
  scrollStart?: string;
  scrollEnd?: string;
}

// Placeholder component that displays while Lottie loads or as fallback
function LottiePlaceholder({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate the placeholder elements
    const circles = containerRef.current.querySelectorAll(".pulse-circle");
    gsap.to(circles, {
      scale: 1.2,
      opacity: 0.5,
      duration: 1,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(circles);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden",
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
        <circle
          className="pulse-circle"
          cx="50"
          cy="50"
          r="20"
          fill="var(--beanstalk-light)"
          opacity="0.3"
        />
        <circle
          className="pulse-circle"
          cx="50"
          cy="50"
          r="15"
          fill="var(--beanstalk-mid)"
          opacity="0.5"
        />
        <circle
          className="pulse-circle"
          cx="50"
          cy="50"
          r="10"
          fill="var(--beanstalk-dark)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export function LottieAnimation({
  src,
  className,
  autoplay = true,
  loop = true,
  playOnScroll = false,
  scrollStart = "top 80%",
  scrollEnd = "bottom 20%",
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!playOnScroll);
  const [error, setError] = useState(false);
  const [DotLottieReact, setDotLottieReact] = useState<React.ComponentType<{
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
  }> | null>(null);

  // Dynamically import DotLottie to avoid SSR issues
  useEffect(() => {
    import("@lottiefiles/dotlottie-react")
      .then((module) => {
        setDotLottieReact(() => module.DotLottieReact);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  // Set up scroll trigger for play on scroll
  useEffect(() => {
    if (!playOnScroll || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: scrollStart,
      end: scrollEnd,
      onEnter: () => setIsVisible(true),
      onLeave: () => setIsVisible(false),
      onEnterBack: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      trigger.kill();
    };
  }, [playOnScroll, scrollStart, scrollEnd]);

  // Entrance animation for the container
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  if (error || !DotLottieReact) {
    return (
      <div ref={containerRef}>
        <LottiePlaceholder className={className} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay && isVisible}
        className="w-full h-full"
      />
    </div>
  );
}

// Built-in animated icons using GSAP instead of Lottie
export function GrowingPlantAnimation({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const stem = svgRef.current.querySelector(".stem");
    const leaves = svgRef.current.querySelectorAll(".leaf");
    const flower = svgRef.current.querySelector(".flower");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Grow stem
    tl.fromTo(
      stem,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 1, ease: "power2.out" }
    );

    // Grow leaves
    tl.fromTo(
      leaves,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(2)" },
      "-=0.3"
    );

    // Bloom flower
    tl.fromTo(
      flower,
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 150"
      className={cn("w-full h-auto", className)}
    >
      {/* Stem */}
      <path
        className="stem"
        d="M50 150 Q45 100 50 50"
        stroke="var(--beanstalk-mid)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <ellipse
        className="leaf"
        cx="35"
        cy="100"
        rx="15"
        ry="8"
        fill="var(--beanstalk-light)"
        transform="rotate(-30 35 100)"
      />
      <ellipse
        className="leaf"
        cx="65"
        cy="80"
        rx="15"
        ry="8"
        fill="var(--beanstalk-light)"
        transform="rotate(30 65 80)"
      />
      <ellipse
        className="leaf"
        cx="38"
        cy="60"
        rx="12"
        ry="6"
        fill="var(--beanstalk-light)"
        transform="rotate(-20 38 60)"
      />

      {/* Flower */}
      <g className="flower">
        <circle cx="50" cy="35" r="12" fill="#ffd700" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx={50 + Math.cos((angle * Math.PI) / 180) * 18}
            cy={35 + Math.sin((angle * Math.PI) / 180) * 18}
            rx="8"
            ry="12"
            fill="#ff6b6b"
            transform={`rotate(${angle} ${50 + Math.cos((angle * Math.PI) / 180) * 18} ${35 + Math.sin((angle * Math.PI) / 180) * 18})`}
          />
        ))}
      </g>
    </svg>
  );
}

// Animated gear/cog for technical sections
export function AnimatedGear({ className }: { className?: string }) {
  const gearRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!gearRef.current) return;

    gsap.to(gearRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });

    return () => {
      if (gearRef.current) gsap.killTweensOf(gearRef.current);
    };
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-auto", className)}>
      <g ref={gearRef}>
        {/* Gear teeth */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 35;
          const y1 = 50 + Math.sin(angle) * 35;
          const x2 = 50 + Math.cos(angle) * 45;
          const y2 = 50 + Math.sin(angle) * 45;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--blueprint-line)"
              strokeWidth="8"
              strokeLinecap="round"
            />
          );
        })}
        {/* Main gear body */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="var(--blueprint-bg)"
          stroke="var(--blueprint-line)"
          strokeWidth="4"
        />
        {/* Center hole */}
        <circle cx="50" cy="50" r="10" fill="var(--blueprint-line)" />
      </g>
    </svg>
  );
}
