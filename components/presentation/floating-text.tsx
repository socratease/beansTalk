"use client";

import React from "react"

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface FloatingTextProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  variant?: "heading" | "subheading" | "body" | "caption";
  scrub?: boolean;
}

export function FloatingText({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  variant = "body",
  scrub = false,
}: FloatingTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const initialProps = {
      left: { x: -100, opacity: 0 },
      right: { x: 100, opacity: 0 },
      up: { y: 50, opacity: 0 },
      down: { y: -50, opacity: 0 },
    };

    gsap.fromTo(
      textRef.current,
      initialProps[direction],
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: scrub ? 1 : false,
          toggleActions: scrub ? undefined : "play none none reverse",
        },
      }
    );

    return () => {
      gsap.killTweensOf(textRef.current);
    };
  }, [direction, delay, duration, scrub]);

  const variantClasses = {
    heading: "font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight",
    subheading: "font-sans text-xl md:text-2xl lg:text-3xl font-medium text-foreground/90",
    body: "font-sans text-base md:text-lg text-foreground/80 leading-relaxed",
    caption: "font-mono text-sm text-muted-foreground uppercase tracking-wider",
  };

  return (
    <div
      ref={textRef}
      className={cn(variantClasses[variant], className)}
    >
      {children}
    </div>
  );
}

// Animated headline with character-by-character animation
interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

export function AnimatedHeadline({ text, className }: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "font-serif text-4xl md:text-6xl lg:text-8xl font-bold text-foreground overflow-hidden",
        className
      )}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
