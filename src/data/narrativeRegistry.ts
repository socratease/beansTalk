/**
 * NarrativeRegistry - Ordered segment definitions.
 *
 * Defines all narrative beats with their scroll ranges and component mappings.
 * This is the single source of truth for segment ordering and timing.
 *
 * Reference: Scroll Logic Contract §6
 */

import type { Segment } from '../types';

/**
 * Segment IDs following the canonical registry from Scroll Logic Contract.
 */
export const SegmentIds = {
  // Act A — Magic beans and early models
  A0_PASTORAL_TECH_UTOPIA: 'A0_pastoral_tech_utopia_dropins',
  A1_QUOTE_ALLURE: 'A1_quote_allure_of_legume',
  A2_YEAR_2018: 'A2_year_2018',
  A3_CHART_COST_GPT1_GPT2: 'A3_chart_cost_gpt1_gpt2',
  A4_QUOTE_COW: 'A4_quote_cow_ill_spent',
  A5_YEAR_2019: 'A5_year_2019',
  A6_CHART_COST_ADD_GPT3: 'A6_chart_cost_add_gpt3',
  A7_CARD_GPT3_EXAMPLE: 'A7_card_gpt3_example_placeholder_image',
  A8_QUOTE_TRAGIC: 'A8_quote_tragic_scenes',
  A9_YEAR_2020: 'A9_year_2020',
  A10_CHART_COST_ADD_GPT35: 'A10_chart_cost_add_gpt35_chatgpt',
  A11_QUOTE_BEANSTALK: 'A11_quote_beanstalk_rockets',
  A12_YEAR_2023: 'A12_year_2023',
  A13_CHART_COST_ADD_GPT4O: 'A13_chart_cost_add_gpt4o',
  A14_QUOTE_GARBANZO: 'A14_quote_garbanzo_empowers',
  A15_YEAR_2024: 'A15_year_2024',
  A16_CHART_COST_ADD_GPT5: 'A16_chart_cost_add_gpt5_series',
  A17_QUOTE_DENIAL: 'A17_quote_legume_denial',
  A18_YEAR_2026: 'A18_year_2026',

  // Act B — Definitions and scaling
  B0_CARD_BEANSTALK: 'B0_card_definition_beanstalk',
  B1_CARD_SCALING: 'B1_card_definition_scaling_hypothesis',
  B2_TABLE_COMPUTE: 'B2_table_compute_cost_growth_gpt2_to_gpt4',
  B3_COOKIE_DEMO: 'B3_cookie_oom_demo_overlay',

  // Act C — Historical beans and capex
  C0_TITLE_HISTORICAL: 'C0_title_historical_beans',
  C1_LOTTIE_MANHATTAN: 'C1_lottie_scientists_manhattan_left',
  C2_LOTTIE_APOLLO: 'C2_lottie_scientists_apollo_right',
  C3_TABLE_COMPUTE_ROADMAP: 'C3_table_compute_power_roadmap_2022_2030',
  C4_TABLE_HIGHLIGHT: 'C4_table_highlight_sequence_investments',
  C5_TABLE_CAPEX_GDP: 'C5_table_capex_vs_gdp',

  // Act D — Core disciplines and close
  D0_TITLE_BEYOND: 'D0_title_on_the_beanstalk_and_beyond',
  D1_BULLETS_DISCIPLINES: 'D1_bullets_core_disciplines',
  D2_THANK_YOU: 'D2_thank_you_footer',
} as const;

/**
 * Helper to create segment with default transition durations.
 */
function createSegment(
  id: string,
  start: number,
  end: number,
  component: string,
  props?: Record<string, unknown>,
  enterDuration = 0.02,
  exitDuration = 0.02
): Segment {
  return {
    id,
    start,
    enterEnd: Math.min(start + enterDuration, end - exitDuration),
    exitStart: Math.max(end - exitDuration, start + enterDuration),
    end,
    component,
    props,
  };
}

/**
 * Complete narrative registry with all 32 segments.
 *
 * Progress ranges are allocated to preserve ordering and allow
 * clean entry/dwell/exit transitions.
 *
 * Note: Beanstalk introduction occurs at A12_YEAR_2023 (p ≈ 0.36)
 */
export const narrativeRegistry: Segment[] = [
  // Act A — Magic beans and early models (p ≈ 0.00–0.62)
  createSegment(SegmentIds.A0_PASTORAL_TECH_UTOPIA, 0.00, 0.08, 'TechUtopiaOverlay'),
  createSegment(SegmentIds.A1_QUOTE_ALLURE, 0.02, 0.07, 'QuoteCard', {
    quote: 'What wondrous magic in these humble beans...',
    attribution: 'The Allure of the Legume',
  }),
  createSegment(SegmentIds.A2_YEAR_2018, 0.06, 0.12, 'FloatingYearText', { year: 2018 }),
  createSegment(SegmentIds.A3_CHART_COST_GPT1_GPT2, 0.08, 0.16, 'CostTimelineChart', {
    models: ['GPT-1', 'GPT-2'],
  }),
  createSegment(SegmentIds.A4_QUOTE_COW, 0.12, 0.18, 'QuoteCard', {
    quote: 'A cow ill-spent is a lesson well-earned.',
    attribution: 'Traditional',
  }),
  createSegment(SegmentIds.A5_YEAR_2019, 0.15, 0.21, 'FloatingYearText', { year: 2019 }),
  createSegment(SegmentIds.A6_CHART_COST_ADD_GPT3, 0.18, 0.26, 'CostTimelineChart', {
    models: ['GPT-1', 'GPT-2', 'GPT-3'],
  }),
  createSegment(SegmentIds.A7_CARD_GPT3_EXAMPLE, 0.22, 0.28, 'DefinitionCard', {
    title: 'GPT-3',
    content: 'Language model capabilities demonstration',
  }),
  createSegment(SegmentIds.A8_QUOTE_TRAGIC, 0.25, 0.31, 'QuoteCard', {
    quote: 'What tragic scenes unfold when beans take root...',
    attribution: 'The Chronicle',
  }),
  createSegment(SegmentIds.A9_YEAR_2020, 0.28, 0.34, 'FloatingYearText', { year: 2020 }),
  createSegment(SegmentIds.A10_CHART_COST_ADD_GPT35, 0.30, 0.38, 'CostTimelineChart', {
    models: ['GPT-1', 'GPT-2', 'GPT-3', 'GPT-3.5', 'ChatGPT'],
  }),

  // Beanstalk introduction segment (p = 0.36)
  createSegment(SegmentIds.A11_QUOTE_BEANSTALK, 0.34, 0.40, 'QuoteCard', {
    quote: 'And lo, the beanstalk rockets toward the sky!',
    attribution: 'The Moment of Growth',
    highlight: true,
  }),
  createSegment(SegmentIds.A12_YEAR_2023, 0.36, 0.42, 'FloatingYearText', {
    year: 2023,
    highlight: true,
  }),
  createSegment(SegmentIds.A13_CHART_COST_ADD_GPT4O, 0.40, 0.48, 'CostTimelineChart', {
    models: ['GPT-1', 'GPT-2', 'GPT-3', 'GPT-3.5', 'GPT-4', 'GPT-4o'],
  }),
  createSegment(SegmentIds.A14_QUOTE_GARBANZO, 0.45, 0.51, 'QuoteCard', {
    quote: 'The garbanzo empowers those who climb.',
    attribution: 'Wisdom of the Stalk',
  }),
  createSegment(SegmentIds.A15_YEAR_2024, 0.48, 0.54, 'FloatingYearText', { year: 2024 }),
  createSegment(SegmentIds.A16_CHART_COST_ADD_GPT5, 0.51, 0.59, 'CostTimelineChart', {
    models: ['GPT-1', 'GPT-2', 'GPT-3', 'GPT-3.5', 'GPT-4', 'GPT-4o', 'GPT-5'],
  }),
  createSegment(SegmentIds.A17_QUOTE_DENIAL, 0.55, 0.61, 'QuoteCard', {
    quote: 'Legume denial serves no one.',
    attribution: 'The Pragmatist',
  }),
  createSegment(SegmentIds.A18_YEAR_2026, 0.58, 0.64, 'FloatingYearText', { year: 2026 }),

  // Act B — Definitions and scaling (p ≈ 0.60–0.78)
  createSegment(SegmentIds.B0_CARD_BEANSTALK, 0.62, 0.70, 'DefinitionCard', {
    title: 'The Beanstalk',
    content: 'A metaphor for exponential growth in AI capabilities through scaling.',
  }),
  createSegment(SegmentIds.B1_CARD_SCALING, 0.67, 0.75, 'DefinitionCard', {
    title: 'The Scaling Hypothesis',
    content: 'The theory that AI capabilities grow predictably with compute, data, and parameters.',
  }),
  createSegment(SegmentIds.B2_TABLE_COMPUTE, 0.72, 0.80, 'ComputeCostTable', {
    startModel: 'GPT-2',
    endModel: 'GPT-4',
  }),
  createSegment(SegmentIds.B3_COOKIE_DEMO, 0.76, 0.84, 'OrdersOfMagnitudeDemo'),

  // Act C — Historical beans and capex (p ≈ 0.76–0.96)
  createSegment(SegmentIds.C0_TITLE_HISTORICAL, 0.80, 0.86, 'SectionTitle', {
    title: 'Historical Beans',
  }),
  createSegment(SegmentIds.C1_LOTTIE_MANHATTAN, 0.82, 0.88, 'LottieGroup', {
    animation: 'manhattan',
    position: 'left',
  }),
  createSegment(SegmentIds.C2_LOTTIE_APOLLO, 0.85, 0.91, 'LottieGroup', {
    animation: 'apollo',
    position: 'right',
  }),
  createSegment(SegmentIds.C3_TABLE_COMPUTE_ROADMAP, 0.87, 0.93, 'CapexComparisonTable', {
    type: 'roadmap',
  }),
  createSegment(SegmentIds.C4_TABLE_HIGHLIGHT, 0.90, 0.95, 'CapexComparisonTable', {
    type: 'highlight',
  }),
  createSegment(SegmentIds.C5_TABLE_CAPEX_GDP, 0.92, 0.97, 'CapexComparisonTable', {
    type: 'capex_gdp',
  }),

  // Act D — Core disciplines and close (p ≈ 0.94–1.00)
  createSegment(SegmentIds.D0_TITLE_BEYOND, 0.94, 0.98, 'SectionTitle', {
    title: 'On the Beanstalk and Beyond',
  }),
  createSegment(SegmentIds.D1_BULLETS_DISCIPLINES, 0.96, 1.00, 'BulletRevealList', {
    items: [
      'Machine Learning',
      'Distributed Systems',
      'Hardware Engineering',
      'Safety & Alignment',
    ],
  }),
  createSegment(SegmentIds.D2_THANK_YOU, 0.98, 1.00, 'FooterThankYou'),
];

/**
 * Get active segments for a given progress value.
 * A segment is active if start <= p < end.
 */
export function getActiveSegments(p: number): Segment[] {
  return narrativeRegistry.filter(
    (segment) => p >= segment.start && p < segment.end
  );
}

/**
 * Get a segment by ID.
 */
export function getSegmentById(id: string): Segment | undefined {
  return narrativeRegistry.find((segment) => segment.id === id);
}
