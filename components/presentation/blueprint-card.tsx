"use client";

import React from "react"

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface BlueprintCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "technical" | "organic";
  direction?: "left" | "right";
}

export function BlueprintCard({
  title,
  description,
  children,
  className,
  variant = "default",
  direction = "left",
}: BlueprintCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const xOffset = direction === "left" ? -80 : 80;

    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      { x: xOffset, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Content stagger animation
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      gsap.killTweensOf(cardRef.current);
      if (contentRef.current) {
        gsap.killTweensOf(contentRef.current.children);
      }
    };
  }, [direction]);

  const variantStyles = {
    default: "bg-card border-border",
    technical: "bg-blueprint-bg border-blueprint-line",
    organic: "bg-secondary border-beanstalk-mid/30",
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-lg border-2 p-6 md:p-8 shadow-lg overflow-hidden",
        variantStyles[variant],
        className
      )}
    >
      {/* Blueprint grid pattern for technical variant */}
      {variant === "technical" && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(var(--blueprint-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--blueprint-line) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* Corner decorations for technical look */}
      {variant === "technical" && (
        <>
          <svg className="absolute top-0 left-0 w-8 h-8 text-blueprint-line" viewBox="0 0 32 32">
            <path d="M0 8 L0 0 L8 0" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute top-0 right-0 w-8 h-8 text-blueprint-line" viewBox="0 0 32 32">
            <path d="M24 0 L32 0 L32 8" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-8 h-8 text-blueprint-line" viewBox="0 0 32 32">
            <path d="M0 24 L0 32 L8 32" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-8 h-8 text-blueprint-line" viewBox="0 0 32 32">
            <path d="M24 32 L32 32 L32 24" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </>
      )}

      {/* Organic leaf decoration */}
      {variant === "organic" && (
        <svg className="absolute -top-4 -right-4 w-24 h-24 text-beanstalk-light/20" viewBox="0 0 100 100">
          <path
            d="M50 10 Q80 30 90 50 Q80 70 50 90 Q20 70 10 50 Q20 30 50 10 Z"
            fill="currentColor"
          />
        </svg>
      )}

      <div ref={contentRef} className="relative z-10">
        {/* Section label */}
        {variant === "technical" && (
          <div className="font-mono text-xs text-blueprint-text/60 uppercase tracking-widest mb-2">
            Technical Specification
          </div>
        )}

        <h3
          className={cn(
            "font-serif text-2xl md:text-3xl font-bold mb-3",
            variant === "technical" ? "text-blueprint-text" : "text-card-foreground"
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              "font-sans text-base leading-relaxed mb-4",
              variant === "technical" ? "text-blueprint-text/80" : "text-card-foreground/80"
            )}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}

// Specification list for technical cards
interface SpecListProps {
  items: { label: string; value: string }[];
}

export function SpecList({ items }: SpecListProps) {
  return (
    <dl className="grid gap-2 font-mono text-sm">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between border-b border-blueprint-line/30 pb-1">
          <dt className="text-blueprint-text/60">{item.label}</dt>
          <dd className="text-blueprint-text font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
