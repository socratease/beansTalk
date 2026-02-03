"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-config";
import { useScrollTriggerRefresh } from "@/hooks/use-scroll-animation";
import {
  Beanstalk,
  CloudBackground,
  FloatingText,
  AnimatedHeadline,
  BlueprintCard,
  SpecList,
  AnimatedBarChart,
  AnimatedLineChart,
  ProgressRing,
  GrowingPlantAnimation,
  AnimatedGear,
  Section,
  ContentArea,
  ScrollIndicator,
  ScrollProgress,
} from "@/components/presentation";

export default function PresentationPage() {
  // Refresh ScrollTrigger on resize
  useScrollTriggerRefresh();

  // Initialize ScrollTrigger
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Sample data for charts
  const growthData = [
    { label: "Seed Investment", value: 25 },
    { label: "Series A", value: 45 },
    { label: "Series B", value: 78 },
    { label: "Series C", value: 120 },
    { label: "IPO", value: 185 },
  ];

  const timelineData = [12, 28, 45, 38, 62, 85, 78, 95, 110, 128];
  const timelineLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  return (
    <main className="relative">
      {/* Fixed background elements */}
      <CloudBackground totalHeight={800} />
      <Beanstalk totalHeight={800} />

      {/* Progress bar */}
      <ScrollProgress />

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* ============================================ */}
      {/* SECTION 1: Hero / Introduction */}
      {/* ============================================ */}
      <Section id="hero" minHeight="100vh">
        <ContentArea className="justify-center">
          <div className="space-y-8">
            <FloatingText variant="caption" direction="down" delay={0.2}>
              A Technical Exploration
            </FloatingText>

            <AnimatedHeadline text="Jack and the Beanstalk" />

            <FloatingText
              variant="subheading"
              direction="up"
              delay={0.5}
              className="max-w-xl"
            >
              An interactive journey through growth, ambition, and the
              architecture of reaching new heights.
            </FloatingText>

            <FloatingText variant="body" direction="up" delay={0.7}>
              Scroll down to begin the ascent...
            </FloatingText>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 2: The Magic Beans */}
      {/* ============================================ */}
      <Section id="magic-beans" minHeight="100vh">
        <ContentArea>
          <div className="space-y-12">
            <div className="space-y-4">
              <FloatingText variant="caption">Chapter One</FloatingText>
              <FloatingText variant="heading">The Magic Beans</FloatingText>
              <FloatingText variant="body" className="max-w-lg">
                Every great venture begins with a seed of potential. Jack traded
                what he had for something extraordinary - a handful of magical
                beans that promised unlimited growth.
              </FloatingText>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <BlueprintCard
                variant="technical"
                title="Bean Analysis"
                description="Technical specifications of the magical growth catalyst."
                direction="left"
              >
                <SpecList
                  items={[
                    { label: "Growth Factor", value: "10,000x" },
                    { label: "Germination Time", value: "8 hours" },
                    { label: "Max Height", value: "Cloud Level" },
                    { label: "Magical Index", value: "Legendary" },
                  ]}
                />
              </BlueprintCard>

              <BlueprintCard
                variant="organic"
                title="Growth Potential"
                direction="right"
              >
                <GrowingPlantAnimation className="w-32 h-40 mx-auto" />
              </BlueprintCard>
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 3: Exponential Growth */}
      {/* ============================================ */}
      <Section id="growth" minHeight="120vh">
        <ContentArea>
          <div className="space-y-12">
            <div className="space-y-4">
              <FloatingText variant="caption">Chapter Two</FloatingText>
              <FloatingText variant="heading">Exponential Growth</FloatingText>
              <FloatingText variant="body" className="max-w-lg">
                Watch as the beanstalk defies all expectations, climbing higher
                with each passing moment. Growth is not linear - it is
                exponential when fueled by magic.
              </FloatingText>
            </div>

            <BlueprintCard
              variant="technical"
              title="Growth Metrics Dashboard"
              className="max-w-2xl"
            >
              <div className="space-y-8">
                <AnimatedBarChart
                  data={growthData}
                  title="Investment Rounds"
                  maxValue={200}
                />

                <AnimatedLineChart
                  data={timelineData}
                  labels={timelineLabels}
                  title="Monthly Progress"
                />
              </div>
            </BlueprintCard>

            <div className="flex flex-wrap gap-8 justify-center">
              <ProgressRing value={85} label="Height" />
              <ProgressRing value={92} label="Strength" />
              <ProgressRing value={78} label="Magic" />
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 4: The Climb */}
      {/* ============================================ */}
      <Section id="climb" minHeight="100vh">
        <ContentArea>
          <div className="space-y-12">
            <div className="space-y-4">
              <FloatingText variant="caption">Chapter Three</FloatingText>
              <FloatingText variant="heading">The Ascent</FloatingText>
              <FloatingText variant="body" className="max-w-lg">
                Jack began his climb, each handhold bringing him closer to the
                clouds. The journey requires both courage and careful planning.
              </FloatingText>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <BlueprintCard
                variant="default"
                title="Phase 1: Foundation"
                description="Establish a solid base before reaching for the sky."
                direction="left"
              >
                <div className="mt-4 p-4 bg-secondary/50 rounded font-mono text-sm">
                  <div className="text-muted-foreground">{"// Initialize"}</div>
                  <div className="text-foreground">plant(magic_beans)</div>
                  <div className="text-foreground">await growth()</div>
                </div>
              </BlueprintCard>

              <BlueprintCard
                variant="technical"
                title="Phase 2: Execution"
                description="Begin the climb with calculated precision."
                direction="right"
              >
                <AnimatedGear className="w-20 h-20 mx-auto mt-4" />
              </BlueprintCard>

              <BlueprintCard
                variant="organic"
                title="Phase 3: Achievement"
                description="Reach the clouds and claim your reward."
                direction="left"
              >
                <div className="flex justify-center gap-4 mt-4">
                  <div className="w-12 h-12 rounded-full bg-chart-4 flex items-center justify-center">
                    <span className="font-serif text-lg font-bold text-foreground">Au</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-chart-1 flex items-center justify-center">
                    <span className="font-serif text-lg font-bold text-primary-foreground">Mg</span>
                  </div>
                </div>
              </BlueprintCard>
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 5: Above the Clouds */}
      {/* ============================================ */}
      <Section id="clouds" minHeight="100vh">
        <ContentArea>
          <div className="space-y-12">
            <div className="space-y-4">
              <FloatingText variant="caption">Chapter Four</FloatingText>
              <FloatingText variant="heading">Above the Clouds</FloatingText>
              <FloatingText variant="body" className="max-w-lg">
                Breaking through the cloud layer reveals a world of opportunity.
                Here lies the giant&apos;s castle and treasures beyond imagination.
              </FloatingText>
            </div>

            <BlueprintCard
              variant="technical"
              title="Castle Architecture"
              description="Technical overview of the giant&apos;s fortress in the sky."
              className="max-w-xl"
            >
              <div className="relative h-48 border border-blueprint-line/30 rounded mt-4 overflow-hidden">
                {/* Castle SVG illustration */}
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <defs>
                    <pattern id="brickPattern" width="10" height="5" patternUnits="userSpaceOnUse">
                      <rect width="10" height="5" fill="none" stroke="var(--blueprint-line)" strokeWidth="0.3" />
                    </pattern>
                  </defs>

                  {/* Castle base */}
                  <rect x="40" y="50" width="120" height="50" fill="url(#brickPattern)" stroke="var(--blueprint-line)" strokeWidth="1" />

                  {/* Towers */}
                  <rect x="30" y="30" width="30" height="70" fill="url(#brickPattern)" stroke="var(--blueprint-line)" strokeWidth="1" />
                  <rect x="140" y="30" width="30" height="70" fill="url(#brickPattern)" stroke="var(--blueprint-line)" strokeWidth="1" />

                  {/* Tower tops */}
                  <polygon points="45,30 30,10 60,10" fill="var(--blueprint-bg)" stroke="var(--blueprint-line)" strokeWidth="1" />
                  <polygon points="155,30 140,10 170,10" fill="var(--blueprint-bg)" stroke="var(--blueprint-line)" strokeWidth="1" />

                  {/* Main entrance */}
                  <rect x="85" y="70" width="30" height="30" fill="var(--blueprint-line)" opacity="0.3" />
                  <path d="M85 70 Q100 55 115 70" fill="none" stroke="var(--blueprint-line)" strokeWidth="1" />

                  {/* Windows */}
                  {[50, 70, 90, 110, 130, 150].map((x, i) => (
                    <rect key={i} x={x - 5} y={55} width="10" height="12" fill="var(--blueprint-line)" opacity="0.2" stroke="var(--blueprint-line)" strokeWidth="0.5" />
                  ))}

                  {/* Dimension lines */}
                  <line x1="30" y1="105" x2="170" y2="105" stroke="var(--blueprint-line)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <text x="100" y="110" textAnchor="middle" className="fill-blueprint-text text-[6px] font-mono">140 cubits</text>
                </svg>
              </div>
            </BlueprintCard>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 6: The Treasure */}
      {/* ============================================ */}
      <Section id="treasure" minHeight="100vh">
        <ContentArea>
          <div className="space-y-12">
            <div className="space-y-4">
              <FloatingText variant="caption">Chapter Five</FloatingText>
              <FloatingText variant="heading">The Golden Rewards</FloatingText>
              <FloatingText variant="body" className="max-w-lg">
                Every climb has its rewards. Jack discovered three legendary
                artifacts: the golden goose, the magical harp, and bags of gold.
              </FloatingText>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <BlueprintCard variant="organic" title="Golden Goose" direction="left">
                <div className="flex flex-col items-center gap-2 mt-4">
                  <div className="w-16 h-16 rounded-full bg-chart-4/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-chart-4">
                      <ellipse cx="12" cy="14" rx="6" ry="7" fill="currentColor" />
                      <circle cx="12" cy="6" r="4" fill="currentColor" />
                      <path d="M8 6 Q6 4 8 3" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">Unlimited Returns</span>
                </div>
              </BlueprintCard>

              <BlueprintCard variant="technical" title="Magic Harp" direction="right">
                <div className="flex flex-col items-center gap-2 mt-4">
                  <div className="w-16 h-16 rounded-full bg-chart-1/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-chart-1">
                      <path d="M6 4 C6 4 4 12 6 20 M6 4 Q12 2 18 4 M6 20 Q12 22 18 20 M18 4 C18 4 20 12 18 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
                      <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="1" />
                      <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">Enchanted Melodies</span>
                </div>
              </BlueprintCard>

              <BlueprintCard variant="default" title="Gold Reserve" direction="left">
                <div className="flex flex-col items-center gap-2 mt-4">
                  <div className="text-3xl font-serif font-bold text-chart-4">$10B+</div>
                  <span className="font-mono text-xs text-muted-foreground">Total Value</span>
                </div>
              </BlueprintCard>
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* ============================================ */}
      {/* SECTION 7: Conclusion */}
      {/* ============================================ */}
      <Section id="conclusion" minHeight="100vh">
        <ContentArea className="justify-center">
          <div className="space-y-8 text-center max-w-2xl mx-auto">
            <FloatingText variant="caption">The End</FloatingText>

            <AnimatedHeadline text="Fee Fi Fo Fum" />

            <FloatingText variant="subheading" className="mx-auto">
              The greatest treasures are found at the end of the most
              challenging climbs.
            </FloatingText>

            <FloatingText variant="body" delay={0.3}>
              Thank you for scrolling through this presentation. The beanstalk
              framework you have just experienced can be customized and extended
              to tell any story you wish.
            </FloatingText>

            <div className="pt-8">
              <BlueprintCard
                variant="technical"
                title="Framework Summary"
                className="text-left"
              >
                <SpecList
                  items={[
                    { label: "Animation Engine", value: "GSAP + ScrollTrigger" },
                    { label: "Components", value: "12 Custom Elements" },
                    { label: "Design System", value: "Organic + Technical" },
                    { label: "Extensibility", value: "Fully Modular" },
                  ]}
                />
              </BlueprintCard>
            </div>
          </div>
        </ContentArea>
      </Section>

      {/* Footer spacing */}
      <div className="h-20" />
    </main>
  );
}
