"use client";

import React from "react"

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  minHeight?: string;
  pinned?: boolean;
  pinnedDuration?: string;
}

export function Section({
  children,
  className,
  id,
  minHeight = "100vh",
  pinned = false,
  pinnedDuration = "100%",
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pinned || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${pinnedDuration}`,
      pin: true,
      pinSpacing: true,
    });

    return () => {
      trigger.kill();
    };
  }, [pinned, pinnedDuration]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative w-full", className)}
      style={{ minHeight }}
    >
      {children}
    </section>
  );
}

// Content area positioned to the right of the beanstalk
interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <div
      className={cn(
        "ml-[35%] w-[60%] min-h-screen flex flex-col justify-center py-20 px-8",
        "md:ml-[35%] md:w-[55%] md:px-12",
        "lg:ml-[33%] lg:w-[50%] lg:px-16",
        className
      )}
    >
      {children}
    </div>
  );
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;

    gsap.to(scrollRef.current, {
      x: () => -(scrollWidth - containerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth - containerWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={scrollRef} className="flex gap-8 w-max">
        {children}
      </div>
    </div>
  );
}

// Scroll indicator
export function ScrollIndicator({ className }: { className?: string }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Fade out as user scrolls
    gsap.to(indicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "100px top",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(indicatorRef.current);
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50",
        className
      )}
    >
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
        Scroll to explore
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-muted-foreground"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  );
}

// Progress bar
export function ScrollProgress({ className }: { className?: string }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(progressRef.current);
    };
  }, []);

  return (
    <div className={cn("fixed top-0 left-0 right-0 h-1 bg-muted z-50", className)}>
      <div
        ref={progressRef}
        className="h-full bg-primary origin-left scale-x-0"
      />
    </div>
  );
}
