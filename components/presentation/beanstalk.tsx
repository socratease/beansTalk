"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface BeanstalkProps {
  totalHeight: number;
}

export function Beanstalk({ totalHeight }: BeanstalkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Track scroll progress
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    // Animate individual elements
    const leaves = containerRef.current.querySelectorAll(".beanstalk-leaf");
    const beans = containerRef.current.querySelectorAll(".magic-bean");
    const spirals = containerRef.current.querySelectorAll(".tendril");

    leaves.forEach((leaf, index) => {
      gsap.fromTo(
        leaf,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: document.body,
            start: `${index * 6}% top`,
            end: `${index * 6 + 4}% top`,
            scrub: 0.5,
          },
        }
      );
    });

    beans.forEach((bean, index) => {
      gsap.fromTo(
        bean,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: document.body,
            start: `${index * 15 + 10}% top`,
            end: `${index * 15 + 14}% top`,
            scrub: 0.5,
          },
        }
      );
    });

    spirals.forEach((spiral, index) => {
      gsap.fromTo(
        spiral,
        { strokeDashoffset: 100, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: document.body,
            start: `${index * 10 + 5}% top`,
            end: `${index * 10 + 12}% top`,
            scrub: 0.5,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-0 top-0 w-[30%] h-screen z-10 pointer-events-none overflow-hidden"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 200 800"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* Main stalk gradient */}
          <linearGradient id="stalkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d5016" />
            <stop offset="30%" stopColor="#4a7c23" />
            <stop offset="70%" stopColor="#5d9a2c" />
            <stop offset="100%" stopColor="#3d6b1c" />
          </linearGradient>

          {/* Highlight gradient for dimension */}
          <linearGradient id="stalkHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6db33f" />
            <stop offset="50%" stopColor="#4a8c2a" />
            <stop offset="100%" stopColor="#3d7a22" />
          </linearGradient>

          {/* Golden bean gradient */}
          <radialGradient id="beanGold" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe066" />
            <stop offset="50%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#b8860b" />
          </radialGradient>

          {/* Shadow filter */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>

          {/* Glow for beans */}
          <filter id="beanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background vine shadow */}
        <path
          d="M 100 800
             C 80 700, 130 650, 90 550
             C 50 450, 140 400, 100 300
             C 60 200, 130 100, 110 0"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="45"
          fill="none"
          strokeLinecap="round"
        />

        {/* Main thick stalk */}
        <path
          d="M 100 800
             C 80 700, 130 650, 90 550
             C 50 450, 140 400, 100 300
             C 60 200, 130 100, 110 0"
          stroke="url(#stalkGradient)"
          strokeWidth="35"
          fill="none"
          strokeLinecap="round"
          filter="url(#dropShadow)"
        />

        {/* Stalk highlight for 3D effect */}
        <path
          d="M 100 800
             C 80 700, 130 650, 90 550
             C 50 450, 140 400, 100 300
             C 60 200, 130 100, 110 0"
          stroke="url(#stalkHighlight)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />

        {/* Secondary vine wrapping around */}
        <path
          d="M 105 800
             C 125 720, 70 680, 95 580
             C 120 480, 60 420, 95 320
             C 130 220, 70 120, 105 20"
          stroke="#3d6b1c"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Curling tendrils */}
        {[
          { x: 85, y: 680, dir: -1 },
          { x: 115, y: 580, dir: 1 },
          { x: 75, y: 480, dir: -1 },
          { x: 120, y: 380, dir: 1 },
          { x: 90, y: 280, dir: -1 },
          { x: 110, y: 180, dir: 1 },
          { x: 85, y: 80, dir: -1 },
        ].map((tendril, i) => (
          <path
            key={`tendril-${i}`}
            className="tendril"
            d={`M ${tendril.x} ${tendril.y}
                q ${tendril.dir * 25} -20, ${tendril.dir * 20} -35
                q ${tendril.dir * -5} -15, ${tendril.dir * 15} -25
                q ${tendril.dir * 10} -5, ${tendril.dir * 8} -15`}
            stroke="#5d9a2c"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            opacity="0.9"
          />
        ))}

        {/* Large decorative leaves - centered on stalk (stalk is ~x:100) */}
        {[
          { x: 100, y: 720, rot: -35, scale: 1.2, side: -1 },
          { x: 100, y: 640, rot: 40, scale: 1.0, side: 1 },
          { x: 95, y: 540, rot: -45, scale: 1.3, side: -1 },
          { x: 105, y: 460, rot: 50, scale: 1.1, side: 1 },
          { x: 100, y: 360, rot: -40, scale: 1.4, side: -1 },
          { x: 100, y: 280, rot: 45, scale: 1.0, side: 1 },
          { x: 95, y: 200, rot: -50, scale: 1.2, side: -1 },
          { x: 105, y: 120, rot: 35, scale: 1.1, side: 1 },
          { x: 100, y: 60, rot: -30, scale: 0.9, side: -1 },
        ].map((leaf, i) => (
          <g
            key={`leaf-${i}`}
            className="beanstalk-leaf"
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.scale})`}
            style={{ transformOrigin: "center" }}
          >
            {/* Leaf shape */}
            <path
              d="M 0 0
                 C 15 -8, 35 -10, 50 -5
                 C 55 0, 55 5, 50 10
                 C 35 15, 15 13, 0 0"
              fill="url(#leafGradient)"
              filter="url(#dropShadow)"
            />
            {/* Leaf vein */}
            <path
              d="M 5 2 Q 25 2, 45 2"
              stroke="#2d5016"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            {/* Secondary veins */}
            <path
              d="M 15 2 Q 20 -3, 25 -2
                 M 25 2 Q 30 -2, 35 -1
                 M 15 2 Q 20 7, 25 6
                 M 25 2 Q 30 6, 35 5"
              stroke="#2d5016"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
          </g>
        ))}

        {/* Smaller accent leaves - attached to stalk */}
        {[
          { x: 100, y: 750, rot: 15, scale: 0.6, side: 1 },
          { x: 95, y: 600, rot: -20, scale: 0.5, side: -1 },
          { x: 105, y: 500, rot: 25, scale: 0.55, side: 1 },
          { x: 100, y: 400, rot: -15, scale: 0.5, side: -1 },
          { x: 100, y: 240, rot: 20, scale: 0.6, side: 1 },
          { x: 100, y: 140, rot: -10, scale: 0.5, side: -1 },
        ].map((leaf, i) => (
          <g
            key={`small-leaf-${i}`}
            className="beanstalk-leaf"
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot * leaf.side}) scale(${leaf.scale * leaf.side}, ${leaf.scale})`}
          >
            <ellipse cx="20" cy="0" rx="18" ry="8" fill="#5d9a2c" opacity="0.9" />
            <path d="M 5 0 L 35 0" stroke="#3d6b1c" strokeWidth="1" opacity="0.5" />
          </g>
        ))}

        {/* Magic golden beans */}
        {[
          { x: 90, y: 650, size: 12 },
          { x: 110, y: 450, size: 14 },
          { x: 85, y: 250, size: 13 },
          { x: 105, y: 100, size: 11 },
        ].map((bean, i) => (
          <g key={`bean-${i}`} className="magic-bean" filter="url(#beanGlow)">
            <ellipse
              cx={bean.x}
              cy={bean.y}
              rx={bean.size}
              ry={bean.size * 0.7}
              fill="url(#beanGold)"
              transform={`rotate(${15 + i * 10}, ${bean.x}, ${bean.y})`}
            />
            {/* Bean highlight */}
            <ellipse
              cx={bean.x - 3}
              cy={bean.y - 2}
              rx={bean.size * 0.4}
              ry={bean.size * 0.25}
              fill="rgba(255,255,255,0.6)"
              transform={`rotate(${15 + i * 10}, ${bean.x}, ${bean.y})`}
            />
          </g>
        ))}

        {/* Small decorative dots/buds along the stalk */}
        {[700, 620, 520, 420, 340, 260, 160].map((y, i) => (
          <circle
            key={`bud-${i}`}
            cx={95 + (i % 2 === 0 ? -5 : 15)}
            cy={y}
            r="4"
            fill="#4a8c2a"
            opacity="0.8"
          />
        ))}

        {/* Progress ruler/marker on the right side */}
        <g className="progress-ruler">
          {/* Ruler track */}
          <line
            x1="175"
            y1="780"
            x2="175"
            y2="20"
            stroke="#3d6b1c"
            strokeWidth="2"
            opacity="0.3"
            strokeDasharray="4 4"
          />

          {/* Tick marks with labels */}
          {[
            { y: 780, label: "0%" },
            { y: 620, label: "20%" },
            { y: 460, label: "40%" },
            { y: 300, label: "60%" },
            { y: 140, label: "80%" },
            { y: 20, label: "100%" },
          ].map((tick, i) => (
            <g key={`tick-${i}`}>
              <line
                x1="168"
                y1={tick.y}
                x2="182"
                y2={tick.y}
                stroke="#3d6b1c"
                strokeWidth="2"
                opacity="0.5"
              />
              <text
                x="190"
                y={tick.y + 4}
                fontSize="10"
                fill="#3d6b1c"
                opacity="0.7"
                fontFamily="monospace"
              >
                {tick.label}
              </text>
            </g>
          ))}

          {/* Active progress marker - moves with scroll */}
          <g
            transform={`translate(0, ${780 - scrollProgress * 760})`}
            className="transition-transform duration-100"
          >
            {/* Marker line across */}
            <line
              x1="155"
              y1="0"
              x2="185"
              y2="0"
              stroke="#ffd700"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Marker dot */}
            <circle
              cx="175"
              cy="0"
              r="6"
              fill="#ffd700"
              filter="url(#beanGlow)"
            />
            {/* Current percentage label */}
            <rect
              x="188"
              y="-10"
              width="36"
              height="20"
              rx="3"
              fill="#2d5016"
              opacity="0.9"
            />
            <text
              x="206"
              y="4"
              fontSize="11"
              fill="#ffd700"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="bold"
            >
              {Math.round(scrollProgress * 100)}%
            </text>
          </g>
        </g>
      </svg>

      {/* Ambient glow effect at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(77, 124, 35, 0.15), transparent)",
        }}
      />
    </div>
  );
}
