# Beanstalk Presentation

A scroll-driven, browser-based narrative presentation about AI progress, using the Jack and the Beanstalk metaphor.

## Features

- **Scroll-driven animations** powered by GSAP ScrollTrigger
- **Persistent background** - pastoral scene that evolves with atmosphere
- **Emergent beanstalk** - progress tracker that grows as you scroll
- **Ephemeral narrative elements** - cards, charts, quotes that enter/exit based on scroll position
- **Organic to technical transition** - visual style evolves throughout the presentation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **GSAP + ScrollTrigger** - Scroll-based animations
- **Radix UI** - Accessible component primitives

## Project Structure

```
beanstalk-app/
├── app/
│   ├── globals.css      # Theme and Tailwind config
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main presentation page
├── components/
│   ├── presentation/    # Custom presentation components
│   │   ├── beanstalk.tsx
│   │   ├── cloud-background.tsx
│   │   ├── floating-text.tsx
│   │   ├── blueprint-card.tsx
│   │   ├── animated-chart.tsx
│   │   ├── lottie-animation.tsx
│   │   └── section.tsx
│   └── ui/              # shadcn/ui components
├── hooks/
│   └── use-scroll-animation.ts
├── lib/
│   ├── gsap-config.ts   # GSAP setup
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Customization

The presentation content is in `app/page.tsx`. You can:

1. Modify section content and order
2. Add new scroll-triggered elements
3. Adjust the beanstalk growth curve
4. Customize the color scheme in `globals.css`

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
