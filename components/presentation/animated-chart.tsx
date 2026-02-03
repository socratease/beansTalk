"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface AnimatedBarChartProps {
  data: DataPoint[];
  title?: string;
  className?: string;
  maxValue?: number;
}

export function AnimatedBarChart({
  data,
  title,
  className,
  maxValue,
}: AnimatedBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  const max = maxValue || Math.max(...data.map((d) => d.value));

  useEffect(() => {
    if (!chartRef.current) return;

    // Animate bars on scroll
    barsRef.current.forEach((bar, index) => {
      if (!bar) return;

      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      barsRef.current.forEach((bar) => {
        if (bar) gsap.killTweensOf(bar);
      });
    };
  }, [data]);

  const defaultColors = [
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
  ];

  return (
    <div ref={chartRef} className={cn("space-y-4", className)}>
      {title && (
        <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      )}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-foreground/70">{item.label}</span>
              <span className="text-foreground font-medium">{item.value}</span>
            </div>
            <div className="h-6 bg-muted rounded-sm overflow-hidden">
              <div
                ref={(el) => {
                  if (el) barsRef.current[index] = el;
                }}
                className={cn(
                  "h-full rounded-sm origin-left",
                  item.color || defaultColors[index % defaultColors.length]
                )}
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedLineChartProps {
  data: number[];
  labels?: string[];
  title?: string;
  className?: string;
}

export function AnimatedLineChart({
  data,
  labels,
  title,
  className,
}: AnimatedLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up the starting state
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate the line drawing
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate dots
    const dots = svgRef.current.querySelectorAll(".data-dot");
    gsap.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      gsap.killTweensOf(path);
      gsap.killTweensOf(dots);
    };
  }, [data]);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const width = 300;
  const height = 150;
  const padding = 20;

  const points = data.map((value, index) => ({
    x: padding + (index / (data.length - 1)) * (width - padding * 2),
    y: height - padding - ((value - min) / range) * (height - padding * 2),
  }));

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + point.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${point.y} ${point.x} ${point.y}`;
  }, "");

  return (
    <div className={cn("space-y-2", className)}>
      {title && (
        <h4 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
      )}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={padding + (i * (height - padding * 2)) / 4}
            x2={width - padding}
            y2={padding + (i * (height - padding * 2)) / 4}
            stroke="currentColor"
            strokeOpacity={0.1}
            strokeDasharray="4 4"
          />
        ))}

        {/* Chart line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={`dot-${i}`}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="var(--chart-1)"
            className="data-dot"
            style={{ transformOrigin: `${point.x}px ${point.y}px` }}
          />
        ))}

        {/* Labels */}
        {labels &&
          points.map((point, i) => (
            <text
              key={`label-${i}`}
              x={point.x}
              y={height - 5}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] font-mono"
            >
              {labels[i]}
            </text>
          ))}
      </svg>
    </div>
  );
}

// Circular progress indicator
interface ProgressRingProps {
  value: number;
  max?: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  label,
  size = 120,
  strokeWidth = 8,
  className,
}: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  useEffect(() => {
    if (!circleRef.current || !containerRef.current) return;

    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: circumference - progress,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      if (circleRef.current) gsap.killTweensOf(circleRef.current);
    };
  }, [circumference, progress]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex items-center justify-center", className)}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-2xl font-bold text-foreground">
          {Math.round((value / max) * 100)}%
        </span>
        {label && (
          <span className="font-mono text-xs text-muted-foreground mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
