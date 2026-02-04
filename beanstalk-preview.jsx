// Using React from global scope (loaded via CDN)
const { useState, useEffect, useRef } = React;

// Pastoral Background Component
const PastoralBackground = ({ scrollProgress }) => {
  const fogOpacity = Math.min(scrollProgress * 0.7, 0.6);

  // Futuristic elements appear during early scroll (sections 1-2, roughly 0.05 to 0.15 scroll)
  const futuristicProgress = scrollProgress > 0.03 && scrollProgress < 0.18
    ? Math.min((scrollProgress - 0.03) / 0.08, 1)
    : scrollProgress >= 0.18 ? Math.max(0, 1 - (scrollProgress - 0.18) / 0.05) : 0;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            hsl(200, 60%, 85%) 0%,
            hsl(200, 50%, 90%) 30%,
            hsl(45, 40%, 88%) 70%,
            hsl(35, 45%, 80%) 100%)`
        }}
      />

      {/* Sun */}
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          top: '8%',
          right: '15%',
          background: 'radial-gradient(circle, hsl(45, 100%, 90%) 0%, hsl(45, 100%, 70%) 50%, transparent 70%)',
          opacity: 1 - fogOpacity * 0.8,
          filter: 'blur(2px)'
        }}
      />

      {/* Far Mountains */}
      <svg className="absolute bottom-0 w-full h-2/3" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0 400 L0 280 Q100 200 200 260 Q300 180 400 240 Q500 160 600 220 Q700 140 800 200 Q900 120 1000 180 Q1100 100 1200 160 L1200 400 Z"
          fill="hsl(220, 30%, 75%)"
          opacity={0.5 - fogOpacity * 0.3}
        />
        <path
          d="M0 400 L0 300 Q150 220 300 280 Q450 200 600 260 Q750 180 900 240 Q1050 160 1200 220 L1200 400 Z"
          fill="hsl(200, 25%, 65%)"
          opacity={0.6 - fogOpacity * 0.3}
        />
      </svg>

      {/* Rolling Hills */}
      <svg className="absolute bottom-0 w-full h-1/2" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">
        {/* Far hill */}
        <path
          d="M-100 300 Q100 180 300 220 Q500 160 700 200 Q900 140 1100 180 Q1300 120 1400 160 L1400 300 Z"
          fill="hsl(95, 35%, 55%)"
        />
        {/* Mid hill */}
        <path
          d="M-100 300 Q50 200 200 240 Q400 180 600 220 Q800 160 1000 200 Q1200 140 1400 180 L1400 300 Z"
          fill="hsl(100, 40%, 45%)"
        />
        {/* Near hill */}
        <path
          d="M-100 300 Q150 220 350 260 Q550 200 750 240 Q950 180 1150 220 L1400 300 Z"
          fill="hsl(105, 45%, 38%)"
        />
      </svg>

      {/* ===== FUTURISTIC ELEMENTS (appear during early scroll) ===== */}

      {/* Modern Windmill / Wind Turbine */}
      {futuristicProgress > 0 && (
        <svg
          className="absolute bottom-32 transition-all duration-500"
          style={{
            right: '55%',
            width: '80px',
            height: '160px',
            opacity: futuristicProgress,
            transform: `translateY(${(1 - futuristicProgress) * 30}px)`
          }}
          viewBox="0 0 40 80"
        >
          {/* Tower */}
          <path d="M18 80 L22 80 L21 25 L19 25 Z" fill="hsl(0, 0%, 90%)" />
          {/* Hub */}
          <circle cx="20" cy="22" r="4" fill="hsl(0, 0%, 85%)" />
          {/* Blades - rotating */}
          <g style={{ transformOrigin: '20px 22px', animation: 'spin 4s linear infinite' }}>
            <ellipse cx="20" cy="8" rx="2" ry="14" fill="hsl(0, 0%, 95%)" />
            <ellipse cx="32" cy="28" rx="2" ry="14" fill="hsl(0, 0%, 95%)" transform="rotate(120, 20, 22)" />
            <ellipse cx="8" cy="28" rx="2" ry="14" fill="hsl(0, 0%, 95%)" transform="rotate(240, 20, 22)" />
          </g>
        </svg>
      )}

      {/* Solar Panels on hillside */}
      {futuristicProgress > 0.2 && (
        <svg
          className="absolute bottom-36 transition-all duration-500"
          style={{
            left: '60%',
            width: '100px',
            height: '40px',
            opacity: Math.min((futuristicProgress - 0.2) * 1.5, 1),
            transform: `translateY(${(1 - futuristicProgress) * 20}px)`
          }}
          viewBox="0 0 100 40"
        >
          {/* Solar panel array */}
          <rect x="5" y="10" width="25" height="15" fill="hsl(220, 60%, 25%)" transform="skewY(-10)" rx="1" />
          <rect x="35" y="8" width="25" height="15" fill="hsl(220, 60%, 30%)" transform="skewY(-10)" rx="1" />
          <rect x="65" y="6" width="25" height="15" fill="hsl(220, 60%, 28%)" transform="skewY(-10)" rx="1" />
          {/* Panel grid lines */}
          <line x1="17" y1="10" x2="17" y2="25" stroke="hsl(220, 40%, 40%)" strokeWidth="0.5" transform="skewY(-10)" />
          <line x1="47" y1="8" x2="47" y2="23" stroke="hsl(220, 40%, 40%)" strokeWidth="0.5" transform="skewY(-10)" />
          <line x1="77" y1="6" x2="77" y2="21" stroke="hsl(220, 40%, 40%)" strokeWidth="0.5" transform="skewY(-10)" />
        </svg>
      )}

      {/* Smart Tractor */}
      {futuristicProgress > 0.1 && (
        <svg
          className="absolute bottom-20 transition-all duration-500"
          style={{
            left: '40%',
            width: '50px',
            height: '35px',
            opacity: Math.min((futuristicProgress - 0.1) * 1.5, 1),
            transform: `translateX(${futuristicProgress * 20}px)`
          }}
          viewBox="0 0 50 35"
        >
          {/* Body */}
          <rect x="10" y="12" width="28" height="15" fill="hsl(200, 70%, 45%)" rx="3" />
          {/* Cabin */}
          <rect x="25" y="5" width="12" height="12" fill="hsl(200, 50%, 80%)" rx="2" />
          {/* Wheels */}
          <circle cx="15" cy="27" r="6" fill="hsl(0, 0%, 25%)" />
          <circle cx="35" cy="27" r="8" fill="hsl(0, 0%, 25%)" />
          {/* Antenna */}
          <line x1="30" y1="5" x2="30" y2="0" stroke="hsl(0, 0%, 40%)" strokeWidth="1" />
          <circle cx="30" cy="0" r="1.5" fill="hsl(0, 80%, 50%)" />
          {/* GPS dome */}
          <circle cx="20" cy="10" r="3" fill="hsl(0, 0%, 90%)" />
        </svg>
      )}

      {/* Robot Farmer */}
      {futuristicProgress > 0.3 && (
        <svg
          className="absolute bottom-24 transition-all duration-500"
          style={{
            left: '15%',
            width: '30px',
            height: '45px',
            opacity: Math.min((futuristicProgress - 0.3) * 1.5, 1),
            transform: `translateY(${(1 - futuristicProgress) * 15}px)`
          }}
          viewBox="0 0 30 45"
        >
          {/* Body */}
          <rect x="8" y="18" width="14" height="18" fill="hsl(180, 30%, 70%)" rx="3" />
          {/* Head */}
          <rect x="9" y="8" width="12" height="10" fill="hsl(180, 30%, 75%)" rx="2" />
          {/* Eyes */}
          <circle cx="12" cy="12" r="2" fill="hsl(180, 100%, 50%)" />
          <circle cx="18" cy="12" r="2" fill="hsl(180, 100%, 50%)" />
          {/* Legs */}
          <rect x="10" y="36" width="4" height="8" fill="hsl(180, 20%, 60%)" rx="1" />
          <rect x="16" y="36" width="4" height="8" fill="hsl(180, 20%, 60%)" rx="1" />
          {/* Arms */}
          <rect x="3" y="20" width="5" height="3" fill="hsl(180, 20%, 65%)" rx="1" />
          <rect x="22" y="20" width="5" height="3" fill="hsl(180, 20%, 65%)" rx="1" />
          {/* Antenna */}
          <line x1="15" y1="8" x2="15" y2="3" stroke="hsl(180, 30%, 60%)" strokeWidth="1" />
          <circle cx="15" cy="2" r="1.5" fill="hsl(120, 80%, 50%)" />
        </svg>
      )}

      {/* Small Rocket/Spaceship in sky */}
      {futuristicProgress > 0.4 && (
        <svg
          className="absolute transition-all duration-700"
          style={{
            top: '15%',
            right: '25%',
            width: '25px',
            height: '50px',
            opacity: Math.min((futuristicProgress - 0.4) * 2, 0.8),
            transform: `translateY(${(1 - futuristicProgress) * 40}px) rotate(-15deg)`
          }}
          viewBox="0 0 25 50"
        >
          {/* Rocket body */}
          <ellipse cx="12.5" cy="25" rx="6" ry="18" fill="hsl(0, 0%, 95%)" />
          {/* Nose cone */}
          <ellipse cx="12.5" cy="8" rx="4" ry="8" fill="hsl(0, 70%, 50%)" />
          {/* Window */}
          <circle cx="12.5" cy="20" r="3" fill="hsl(200, 80%, 70%)" />
          {/* Fins */}
          <polygon points="6,40 12,35 12,45" fill="hsl(0, 70%, 50%)" />
          <polygon points="19,40 13,35 13,45" fill="hsl(0, 70%, 50%)" />
          {/* Exhaust flame */}
          <ellipse cx="12.5" cy="46" rx="3" ry="4" fill="hsl(35, 100%, 60%)" opacity="0.8" />
          <ellipse cx="12.5" cy="48" rx="2" ry="3" fill="hsl(45, 100%, 70%)" opacity="0.6" />
        </svg>
      )}

      {/* Drone */}
      {futuristicProgress > 0.5 && (
        <svg
          className="absolute transition-all duration-500"
          style={{
            top: '30%',
            left: '70%',
            width: '35px',
            height: '20px',
            opacity: Math.min((futuristicProgress - 0.5) * 2, 0.9),
            transform: `translateY(${Math.sin(Date.now() / 500) * 3}px)`
          }}
          viewBox="0 0 35 20"
        >
          {/* Body */}
          <ellipse cx="17.5" cy="12" rx="6" ry="4" fill="hsl(0, 0%, 30%)" />
          {/* Arms */}
          <line x1="5" y1="10" x2="12" y2="12" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
          <line x1="30" y1="10" x2="23" y2="12" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
          <line x1="5" y1="14" x2="12" y2="12" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
          <line x1="30" y1="14" x2="23" y2="12" stroke="hsl(0, 0%, 40%)" strokeWidth="1.5" />
          {/* Rotors */}
          <ellipse cx="5" cy="10" rx="4" ry="1" fill="hsl(0, 0%, 60%)" opacity="0.5" />
          <ellipse cx="30" cy="10" rx="4" ry="1" fill="hsl(0, 0%, 60%)" opacity="0.5" />
          <ellipse cx="5" cy="14" rx="4" ry="1" fill="hsl(0, 0%, 60%)" opacity="0.5" />
          <ellipse cx="30" cy="14" rx="4" ry="1" fill="hsl(0, 0%, 60%)" opacity="0.5" />
          {/* Camera */}
          <circle cx="17.5" cy="16" r="2" fill="hsl(0, 0%, 20%)" />
        </svg>
      )}

      {/* Floating Holographic Display */}
      {futuristicProgress > 0.6 && (
        <div
          className="absolute transition-all duration-500"
          style={{
            bottom: '35%',
            left: '30%',
            width: '60px',
            height: '40px',
            opacity: Math.min((futuristicProgress - 0.6) * 2, 0.7),
            background: 'linear-gradient(135deg, hsla(180, 100%, 70%, 0.3) 0%, hsla(200, 100%, 60%, 0.2) 100%)',
            border: '1px solid hsla(180, 100%, 80%, 0.5)',
            borderRadius: '4px',
            boxShadow: '0 0 15px hsla(180, 100%, 70%, 0.3)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/4 h-1 bg-cyan-400/50 rounded" />
          </div>
        </div>
      )}

      {/* ===== END FUTURISTIC ELEMENTS ===== */}

      {/* Cottage */}
      <svg className="absolute bottom-20 right-1/4 w-32 h-32" viewBox="0 0 100 100">
        {/* Main house */}
        <rect x="20" y="50" width="60" height="40" fill="hsl(30, 50%, 70%)" />
        {/* Roof */}
        <polygon points="10,50 50,20 90,50" fill="hsl(15, 60%, 35%)" />
        {/* Door */}
        <rect x="40" y="65" width="20" height="25" fill="hsl(25, 70%, 30%)" />
        {/* Windows */}
        <rect x="25" y="60" width="12" height="12" fill="hsl(200, 70%, 80%)" />
        <rect x="63" y="60" width="12" height="12" fill="hsl(200, 70%, 80%)" />
        {/* Chimney */}
        <rect x="65" y="25" width="10" height="20" fill="hsl(0, 40%, 50%)" />
      </svg>

      {/* Tree */}
      <svg className="absolute bottom-16 right-1/3 w-20 h-28" viewBox="0 0 60 80">
        <rect x="25" y="50" width="10" height="30" fill="hsl(25, 50%, 35%)" />
        <ellipse cx="30" cy="35" rx="25" ry="30" fill="hsl(120, 45%, 35%)" />
      </svg>

      {/* Cow */}
      <svg className="absolute bottom-24 left-1/4 w-16 h-12" viewBox="0 0 60 40">
        <ellipse cx="30" cy="25" rx="20" ry="12" fill="hsl(30, 10%, 90%)" />
        <circle cx="48" cy="20" r="8" fill="hsl(30, 10%, 90%)" />
        <rect x="15" y="32" width="4" height="8" fill="hsl(30, 10%, 85%)" />
        <rect x="25" y="32" width="4" height="8" fill="hsl(30, 10%, 85%)" />
        <rect x="35" y="32" width="4" height="8" fill="hsl(30, 10%, 85%)" />
        <rect x="42" y="32" width="4" height="8" fill="hsl(30, 10%, 85%)" />
      </svg>

      {/* Atmospheric fog overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top,
            transparent 0%,
            rgba(255,255,255,${fogOpacity * 0.3}) 30%,
            rgba(255,255,255,${fogOpacity * 0.5}) 60%,
            rgba(255,255,255,${fogOpacity * 0.7}) 100%)`,
        }}
      />

      {/* Cloud layers */}
      {scrollProgress > 0.3 && (
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: fogOpacity }}>
          <div className="absolute w-64 h-20 rounded-full bg-white/40 blur-xl" style={{ top: '20%', left: '10%' }} />
          <div className="absolute w-48 h-16 rounded-full bg-white/30 blur-xl" style={{ top: '30%', left: '60%' }} />
          <div className="absolute w-56 h-18 rounded-full bg-white/35 blur-xl" style={{ top: '15%', left: '40%' }} />
        </div>
      )}

      {/* CSS Animation for windmill */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Beanstalk Progress Component - Segment-based growth (pieces stay fixed once drawn)
const BeanstalkProgress = ({ scrollProgress, visible }) => {
  if (!visible) return null;

  const growthProgress = Math.min((scrollProgress - 0.25) / 0.75, 1);

  // Define fixed stalk segments that appear at specific thresholds
  // Each segment has a fixed position and appears when growthProgress exceeds its threshold
  const stalkSegments = [
    { threshold: 0, y1: 800, y2: 750, x1: 75, x2: 80, width: 45 },
    { threshold: 0.08, y1: 750, y2: 690, x1: 80, x2: 70, width: 44 },
    { threshold: 0.16, y1: 690, y2: 620, x1: 70, x2: 85, width: 43 },
    { threshold: 0.24, y1: 620, y2: 550, x1: 85, x2: 72, width: 42 },
    { threshold: 0.32, y1: 550, y2: 480, x1: 72, x2: 80, width: 40 },
    { threshold: 0.40, y1: 480, y2: 410, x1: 80, x2: 68, width: 38 },
    { threshold: 0.48, y1: 410, y2: 340, x1: 68, x2: 78, width: 36 },
    { threshold: 0.56, y1: 340, y2: 270, x1: 78, x2: 72, width: 34 },
    { threshold: 0.64, y1: 270, y2: 200, x1: 72, x2: 76, width: 32 },
    { threshold: 0.72, y1: 200, y2: 130, x1: 76, x2: 74, width: 30 },
    { threshold: 0.85, y1: 130, y2: 60, x1: 74, x2: 75, width: 28 },
  ];

  // Secondary vine segments (thinner, offset)
  const vineSegments = [
    { threshold: 0.05, y1: 790, y2: 730, x1: 90, x2: 100, width: 20 },
    { threshold: 0.15, y1: 730, y2: 660, x1: 100, x2: 88, width: 19 },
    { threshold: 0.25, y1: 660, y2: 590, x1: 88, x2: 98, width: 18 },
    { threshold: 0.35, y1: 590, y2: 520, x1: 98, x2: 85, width: 17 },
    { threshold: 0.45, y1: 520, y2: 450, x1: 85, x2: 95, width: 16 },
    { threshold: 0.55, y1: 450, y2: 380, x1: 95, x2: 82, width: 15 },
    { threshold: 0.65, y1: 380, y2: 310, x1: 82, x2: 90, width: 14 },
    { threshold: 0.75, y1: 310, y2: 240, x1: 90, x2: 85, width: 13 },
    { threshold: 0.88, y1: 240, y2: 170, x1: 85, x2: 88, width: 12 },
  ];

  // Tertiary vine (thinnest, other side)
  const tertiarySegments = [
    { threshold: 0.10, y1: 770, y2: 700, x1: 60, x2: 50, width: 12 },
    { threshold: 0.22, y1: 700, y2: 630, x1: 50, x2: 62, width: 11 },
    { threshold: 0.34, y1: 630, y2: 560, x1: 62, x2: 48, width: 10 },
    { threshold: 0.46, y1: 560, y2: 490, x1: 48, x2: 58, width: 10 },
    { threshold: 0.58, y1: 490, y2: 420, x1: 58, x2: 52, width: 9 },
    { threshold: 0.70, y1: 420, y2: 350, x1: 52, x2: 56, width: 9 },
    { threshold: 0.82, y1: 350, y2: 280, x1: 56, x2: 54, width: 8 },
  ];

  // Fixed leaf positions (appear and stay at their fixed y positions)
  const leaves = [
    { threshold: 0.12, cx: 115, cy: 720, rx: 35, ry: 16, rotation: -25, color: 'hsl(120, 50%, 38%)' },
    { threshold: 0.20, cx: 35, cy: 660, rx: 32, ry: 14, rotation: 30, color: 'hsl(120, 55%, 36%)' },
    { threshold: 0.30, cx: 120, cy: 580, rx: 30, ry: 13, rotation: -20, color: 'hsl(120, 50%, 40%)' },
    { threshold: 0.40, cx: 30, cy: 510, rx: 28, ry: 12, rotation: 25, color: 'hsl(120, 55%, 38%)' },
    { threshold: 0.50, cx: 110, cy: 440, rx: 26, ry: 11, rotation: -18, color: 'hsl(120, 50%, 40%)' },
    { threshold: 0.60, cx: 40, cy: 370, rx: 24, ry: 10, rotation: 22, color: 'hsl(120, 52%, 42%)' },
    { threshold: 0.70, cx: 115, cy: 300, rx: 22, ry: 9, rotation: -15, color: 'hsl(120, 50%, 42%)' },
    { threshold: 0.80, cx: 45, cy: 230, rx: 20, ry: 8, rotation: 20, color: 'hsl(120, 52%, 45%)' },
    { threshold: 0.90, cx: 105, cy: 160, rx: 18, ry: 7, rotation: -12, color: 'hsl(120, 55%, 45%)' },
  ];

  // Fixed bean positions
  const beans = [
    { threshold: 0.18, cx: 95, cy: 690, rx: 12, ry: 7 },
    { threshold: 0.28, cx: 55, cy: 620, rx: 11, ry: 7 },
    { threshold: 0.38, cx: 92, cy: 540, rx: 11, ry: 6 },
    { threshold: 0.48, cx: 58, cy: 470, rx: 10, ry: 6 },
    { threshold: 0.58, cx: 88, cy: 400, rx: 10, ry: 6 },
    { threshold: 0.68, cx: 62, cy: 330, rx: 9, ry: 5 },
    { threshold: 0.78, cx: 85, cy: 260, rx: 9, ry: 5 },
    { threshold: 0.88, cx: 65, cy: 190, rx: 8, ry: 5 },
  ];

  return (
    <div className="fixed left-0 top-0 w-44 h-screen z-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 150 800" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="stalkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(120, 50%, 22%)" />
            <stop offset="30%" stopColor="hsl(120, 55%, 32%)" />
            <stop offset="70%" stopColor="hsl(120, 55%, 35%)" />
            <stop offset="100%" stopColor="hsl(120, 50%, 25%)" />
          </linearGradient>
          <linearGradient id="stalkGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(120, 45%, 28%)" />
            <stop offset="50%" stopColor="hsl(120, 50%, 35%)" />
            <stop offset="100%" stopColor="hsl(120, 45%, 30%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="stalkShadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="hsl(120, 30%, 15%)" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Main stalk segments - each appears and stays fixed */}
        {stalkSegments.map((seg, i) => {
          if (growthProgress < seg.threshold) return null;
          const segmentProgress = Math.min((growthProgress - seg.threshold) / 0.08, 1);
          return (
            <line
              key={`stalk-${i}`}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x1 + (seg.x2 - seg.x1) * segmentProgress}
              y2={seg.y1 + (seg.y2 - seg.y1) * segmentProgress}
              stroke="url(#stalkGrad)"
              strokeWidth={seg.width}
              strokeLinecap="round"
              filter="url(#stalkShadow)"
            />
          );
        })}

        {/* Secondary vine segments */}
        {vineSegments.map((seg, i) => {
          if (growthProgress < seg.threshold) return null;
          const segmentProgress = Math.min((growthProgress - seg.threshold) / 0.10, 1);
          return (
            <line
              key={`vine-${i}`}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x1 + (seg.x2 - seg.x1) * segmentProgress}
              y2={seg.y1 + (seg.y2 - seg.y1) * segmentProgress}
              stroke="url(#stalkGrad2)"
              strokeWidth={seg.width}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}

        {/* Tertiary vine segments */}
        {tertiarySegments.map((seg, i) => {
          if (growthProgress < seg.threshold) return null;
          const segmentProgress = Math.min((growthProgress - seg.threshold) / 0.12, 1);
          return (
            <line
              key={`tertiary-${i}`}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x1 + (seg.x2 - seg.x1) * segmentProgress}
              y2={seg.y1 + (seg.y2 - seg.y1) * segmentProgress}
              stroke="hsl(120, 40%, 28%)"
              strokeWidth={seg.width}
              strokeLinecap="round"
              opacity={0.7}
            />
          );
        })}

        {/* Leaves - appear at fixed positions and stay there */}
        {leaves.map((leaf, i) => {
          if (growthProgress < leaf.threshold) return null;
          const leafOpacity = Math.min((growthProgress - leaf.threshold) * 5, 1);
          return (
            <ellipse
              key={`leaf-${i}`}
              cx={leaf.cx}
              cy={leaf.cy}
              rx={leaf.rx}
              ry={leaf.ry}
              fill={leaf.color}
              style={{
                opacity: leafOpacity,
                transform: `rotate(${leaf.rotation}deg)`,
                transformOrigin: `${leaf.cx}px ${leaf.cy}px`
              }}
            />
          );
        })}

        {/* Magic beans - appear at fixed positions */}
        {beans.map((bean, i) => {
          if (growthProgress < bean.threshold) return null;
          const beanOpacity = Math.min((growthProgress - bean.threshold) * 6, 1);
          return (
            <ellipse
              key={`bean-${i}`}
              cx={bean.cx}
              cy={bean.cy}
              rx={bean.rx}
              ry={bean.ry}
              fill="hsl(45, 90%, 55%)"
              filter="url(#glow)"
              style={{ opacity: beanOpacity }}
            />
          );
        })}
      </svg>

      {/* Progress indicator */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-green-700 bg-white/80 px-2 py-1 rounded">
        {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
};

// Quote Card Component
const QuoteCard = ({ text, variant = 'storybook' }) => {
  if (variant === 'storybook') {
    return (
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-12 shadow-lg max-w-2xl mx-auto">
        <div className="text-6xl text-amber-300 leading-none mb-2">"</div>
        <p className="font-serif text-3xl md:text-4xl italic text-amber-900 text-center leading-relaxed px-4">
          {text}
        </p>
        <div className="text-6xl text-amber-300 leading-none mt-2 text-right">"</div>
      </div>
    );
  }

  // Blueprint/patent filing style with organic colors
  return (
    <div className="relative bg-stone-50 border-2 border-emerald-800/30 rounded-xl p-12 shadow-lg max-w-2xl mx-auto overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <div className="text-5xl text-emerald-700/40 font-serif leading-none mb-2">"</div>
        <p className="font-mono text-lg md:text-xl text-emerald-900 text-center px-4">
          {text}
        </p>
        <div className="text-5xl text-emerald-700/40 font-serif leading-none mt-2 text-right">"</div>
      </div>
    </div>
  );
};

// Year Marker Component
const YearMarker = ({ year }) => (
  <div className="min-h-screen flex items-center justify-center relative">
    <span
      className="font-serif font-bold text-emerald-800/20"
      style={{
        fontSize: 'clamp(200px, 50vw, 500px)',
        lineHeight: 1,
        letterSpacing: '-0.02em'
      }}
    >
      {year}
    </span>
  </div>
);

// OOM (Orders of Magnitude) Visualization Component - Shows 1 → 100 → 1000+ growth
const OOMVisualization = ({ stage = 0 }) => {
  // stage 0: 1 cookie, stage 1: 100 cookies, stage 2: 1000+ cookies
  const stages = [
    { count: 1, label: '1', description: 'GPT-0.5 • 1 cookie' },
    { count: 100, label: '100', description: '2 OoM • 100 cookies' },
    { count: 1000, label: '1,000+', description: '3 OoM • 1,000 cookies' },
  ];

  // Generate cookie positions - fixed positions that accumulate
  const getCookiePositions = (count, maxDisplay = 120) => {
    const positions = [];
    const displayCount = Math.min(count, maxDisplay);
    const seed = 12345;

    for (let i = 0; i < displayCount; i++) {
      const hash = ((i * 1237 + seed) % 997) / 997;
      const hash2 = ((i * 2341 + seed) % 991) / 991;
      positions.push({
        x: 8 + hash * 84,
        y: 8 + hash2 * 84,
        size: 6 + (hash * 3),
      });
    }
    return positions;
  };

  const displayCount = stage === 0 ? 1 : stage === 1 ? 100 : 120;
  const cookies = getCookiePositions(displayCount);
  const currentStageData = stages[stage];

  return (
    <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-6 shadow-lg max-w-md mx-auto overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-3">Orders of Magnitude</h3>

        {/* Cookie display area */}
        <div className="relative h-48 bg-amber-50/50 rounded-lg border border-amber-200 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {cookies.map((cookie, i) => (
              <g key={i}>
                <ellipse
                  cx={cookie.x}
                  cy={cookie.y}
                  rx={cookie.size / 2}
                  ry={cookie.size / 2.5}
                  fill="hsl(30, 60%, 55%)"
                />
                <ellipse
                  cx={cookie.x - cookie.size * 0.1}
                  cy={cookie.y - cookie.size * 0.1}
                  rx={cookie.size / 4}
                  ry={cookie.size / 5}
                  fill="hsl(30, 50%, 65%)"
                  opacity={0.6}
                />
                <circle cx={cookie.x - cookie.size * 0.12} cy={cookie.y + cookie.size * 0.05} r={cookie.size * 0.07} fill="hsl(25, 70%, 25%)" />
                <circle cx={cookie.x + cookie.size * 0.08} cy={cookie.y - cookie.size * 0.06} r={cookie.size * 0.05} fill="hsl(25, 70%, 25%)" />
              </g>
            ))}
          </svg>

          {/* Overflow indicator */}
          {stage === 2 && (
            <div className="absolute inset-0 bg-gradient-to-t from-amber-100/80 to-transparent pointer-events-none flex items-end justify-center pb-2">
              <span className="text-amber-700 text-xs font-mono">+ many more...</span>
            </div>
          )}
        </div>

        {/* Count display */}
        <div className="mt-3 text-center">
          <span className="font-mono text-3xl font-bold text-amber-700">
            {stages[stage].label}
          </span>
          <span className="font-mono text-sm text-amber-600 ml-2">cookies</span>
        </div>

        {/* Stage indicator */}
        <div className="flex justify-center gap-3 mt-3">
          {stages.map((s, i) => (
            <div
              key={i}
              className={`px-2 py-0.5 rounded-full text-xs font-mono transition-all ${
                i <= stage
                  ? 'bg-amber-500 text-white'
                  : 'bg-stone-200 text-stone-500'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        <p className="font-mono text-emerald-700/60 text-xs mt-2 text-center">
          {currentStageData.description}
        </p>
      </div>
    </div>
  );
};

// Cost Chart Component - Blueprint/Patent Filing Style
const CostChart = ({ visibleModels }) => {
  const models = [
    { name: 'GPT-1', cost: 5000, year: 2018 },
    { name: 'GPT-2', cost: 40000, year: 2019 },
    { name: 'GPT-3', cost: 4600000, year: 2020 },
    { name: 'GPT-3.5', cost: 10000000, year: 2022 },
    { name: 'GPT-4', cost: 100000000, year: 2023 },
    { name: 'GPT-5', cost: 500000000, year: 2024 },
  ];

  const maxCost = 500000000;
  const barColors = ['#2d5a27', '#3d7a37', '#4a8f47', '#7a9a32', '#9a8a32', '#8a6a32'];

  const formatCost = (cost) => {
    if (cost >= 1000000) return `$${(cost / 1000000).toFixed(0)}M`;
    if (cost >= 1000) return `$${(cost / 1000).toFixed(0)}K`;
    return `$${cost}`;
  };

  return (
    <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-8 shadow-lg max-w-2xl mx-auto overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-6">Training Cost Progression</h3>
        <div className="space-y-4">
          {models.slice(0, visibleModels).map((model, index) => {
            const logWidth = (Math.log10(model.cost) / Math.log10(maxCost)) * 100;
            return (
              <div key={model.name} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-emerald-900 text-sm">{model.name}</span>
                  <span className="font-mono text-emerald-700 text-sm font-semibold">{formatCost(model.cost)}</span>
                </div>
                <div className="h-6 bg-stone-200 rounded overflow-hidden border border-emerald-800/20">
                  <div
                    className="h-full rounded transition-all duration-700 ease-out"
                    style={{
                      width: `${logWidth}%`,
                      backgroundColor: barColors[index] || barColors[barColors.length - 1],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="font-mono text-emerald-700/60 text-xs mt-4 text-center">Log scale visualization</p>
      </div>
    </div>
  );
};

// Definition Card - Blueprint/Patent Filing Style
const DefinitionCard = ({ label, term, definition }) => (
  <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-10 max-w-2xl mx-auto overflow-hidden">
    {/* Blueprint grid */}
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }} />
    <div className="relative z-10">
      <span className="font-mono text-emerald-700 text-xs uppercase tracking-wider">{label}</span>
      <h3 className="font-serif text-3xl text-emerald-900 mt-2 mb-4">{term}</h3>
      <div className="w-16 h-0.5 bg-emerald-600 mb-4" />
      <p className="text-emerald-800 leading-relaxed text-lg">{definition}</p>
    </div>
  </div>
);

// Scaling Table Component - Blueprint/Patent Filing Style
const ScalingTable = () => {
  const data = [
    { year: '2022', compute: '10K H100s', cost: '$500M', power: '10 MW', illustration: '10,000 homes' },
    { year: '2024', compute: '100K', cost: '$1B', power: '100 MW', illustration: '100,000 homes' },
    { year: '2026', compute: '1M', cost: '$10B', power: '1 GW', illustration: 'Hoover Dam' },
    { year: '2028', compute: '10M', cost: '$100B', power: '10 GW', illustration: 'Small US State' },
    { year: '2030', compute: '100M', cost: '$1T', power: '100 GW', illustration: '20% of US electricity' },
  ];

  return (
    <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-8 shadow-lg max-w-4xl mx-auto overflow-x-auto">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-4">AI Infrastructure Scaling Roadmap</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-emerald-800/30">
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Year</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Compute</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Cost</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Power</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Scale</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.year} className="border-b border-emerald-800/10 hover:bg-emerald-50/50 transition-colors">
                <td className="py-3 px-4 font-mono text-emerald-900 font-semibold">{row.year}</td>
                <td className="py-3 px-4 font-mono text-emerald-800">{row.compute}</td>
                <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">{row.cost}</td>
                <td className="py-3 px-4 font-mono text-amber-700">{row.power}</td>
                <td className="py-3 px-4 text-emerald-700">{row.illustration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Bullet List Component
const BulletList = ({ items, title }) => (
  <div className="max-w-xl mx-auto">
    {title && <h3 className="font-serif text-2xl text-slate-800 mb-6">{title}</h3>}
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-emerald-500" />
          <span className="text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Curtain Close Component
const CurtainClose = ({ actNumber }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative bg-gradient-to-b from-red-900 to-red-950 rounded-lg p-16 shadow-2xl border-4 border-amber-500/50">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)'
      }} />
      <div className="relative z-10 text-center">
        <div className="text-amber-400/60 text-sm font-serif tracking-widest mb-4">✦ ✦ ✦</div>
        <h2 className="font-serif text-4xl md:text-5xl text-amber-100 font-bold">
          End of Act {actNumber === 1 ? 'I' : 'II'}
        </h2>
        <div className="text-amber-400/60 text-sm font-serif tracking-widest mt-4">✦ ✦ ✦</div>
      </div>
    </div>
  </div>
);

// GPT Compute Scaling Table Component
const GPTComputeTable = () => {
  const data = [
    { model: 'GPT-2', compute: '4×10²¹ FLOP', cost: '$40K', growth: '—' },
    { model: 'GPT-3', compute: '3×10²³ FLOP', cost: '$4M', growth: '+2 orders of magnitude' },
    { model: 'GPT-4', compute: '8×10²⁴ FLOP', cost: '$100M', growth: '+1.5 orders of magnitude' },
  ];

  return (
    <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-8 shadow-lg max-w-3xl mx-auto overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-4">Model Compute & Cost Scaling</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-emerald-800/30">
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Model</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Compute</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Cost</th>
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.model} className="border-b border-emerald-800/10 hover:bg-emerald-50/50 transition-colors">
                <td className="py-3 px-4 font-mono text-emerald-900 font-semibold">{row.model}</td>
                <td className="py-3 px-4 font-mono text-emerald-800">{row.compute}</td>
                <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">{row.cost}</td>
                <td className="py-3 px-4 text-amber-700">{row.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Historical Capex Table Component
const HistoricalCapexTable = () => {
  const data = [
    { event: 'Railways (UK) (1840s)', gdp: '7%' },
    { event: 'Electrification (US) (1930)', gdp: '0.5%' },
    { event: 'Manhattan Project (1944)', gdp: '1%' },
    { event: 'Interstate System (1958)', gdp: '1.5%' },
    { event: 'Apollo Project (1966)', gdp: '0.6%' },
    { event: 'Telecom Buildout (2000)', gdp: '1.2%' },
    { event: 'AI Capex (2025)', gdp: '1%' },
  ];

  return (
    <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-8 shadow-lg max-w-2xl mx-auto overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="relative z-10">
        <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-4">Historical Capital Expenditure</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-emerald-800/30">
              <th className="text-left py-3 px-4 font-mono text-emerald-700">Capex Event</th>
              <th className="text-right py-3 px-4 font-mono text-emerald-700">% of GDP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.event} className="border-b border-emerald-800/10 hover:bg-emerald-50/50 transition-colors">
                <td className="py-3 px-4 text-emerald-900">{row.event}</td>
                <td className="py-3 px-4 font-mono text-amber-700 font-semibold text-right">{row.gdp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Investment Highlights Component
const InvestmentHighlights = () => (
  <div className="relative bg-stone-100 border-2 border-emerald-800/30 rounded-xl p-8 shadow-lg max-w-3xl mx-auto overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(hsl(140, 30%, 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(140, 30%, 45%) 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }} />
    <div className="relative z-10">
      <h3 className="font-mono text-emerald-800 text-sm uppercase tracking-wider mb-6">Confirmed / Reported Investments</h3>

      <div className="mb-6">
        <h4 className="font-mono text-emerald-700 text-xs uppercase tracking-wider mb-3">2024 Investments</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Meta buys <span className="font-mono font-semibold">350,000 H100s</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Amazon bought <span className="font-mono font-semibold">1 GW</span> datacenter next to nuclear plant in PA</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Microsoft and OpenAI working on <span className="font-mono font-semibold">$100B</span> cluster, target 2028</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">OpenAI reportedly seeking <span className="font-mono font-semibold">"trillions"</span> in investment for compute</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-mono text-emerald-700 text-xs uppercase tracking-wider mb-3">2025 Investments</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Amazon signs <span className="font-mono font-semibold">1.92 GW</span> power contract in PA</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Google: started work on 3 sites totalling <span className="font-mono font-semibold">1.8 GW</span> nuclear power</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600">•</span>
            <span className="text-emerald-800">Meta and OpenAI describing sites planned to scale up to <span className="font-mono font-semibold">5 GW</span></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Title Card Component
const TitleCard = ({ title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-800 font-bold">{title}</h2>
      {subtitle && <p className="font-mono text-slate-500 mt-4 text-lg">{subtitle}</p>}
    </div>
  </div>
);

// Section Component - Full viewport height for clean scroll transitions
const Section = ({ children, className = '', align = 'left' }) => (
  <section className={`min-h-screen flex flex-col justify-center py-32 px-8 ${align === 'center' ? '' : 'ml-32'} ${className}`}>
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {children}
    </div>
  </section>
);

// Main App
function BeansTalkPresentation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [beanstalkVisible, setBeanstalkVisible] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
      
      // Show beanstalk after 25% scroll
      if (progress > 0.25 && !beanstalkVisible) {
        setBeanstalkVisible(true);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [beanstalkVisible]);
  
  return (
    <div ref={containerRef} className="h-screen overflow-y-auto overflow-x-hidden relative bg-gradient-to-b from-sky-100 to-amber-50">
      {/* Fixed background */}
      <PastoralBackground scrollProgress={scrollProgress} />
      
      {/* Beanstalk progress tracker */}
      <BeanstalkProgress scrollProgress={scrollProgress} visible={beanstalkVisible} />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* Scroll indicator */}
      {scrollProgress < 0.05 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 animate-bounce">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">

        {/* ===== SECTION 0: Opening - Pastoral Prologue ===== */}
        <section className="min-h-screen" />

        {/* Jack's Story */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Once upon a time, there lived a poor woman, her poor cow, and her poor son Jack.
            Jack was out in town, and met a man who claimed he had <span className="text-emerald-600 font-semibold">magic beans</span>.
            Jack, a naïve boy, traded the poor cow for the magic beans.
          </p>
        </Section>

        {/* ===== SECTION 1: The Magic Bean Pitch (Frontier AI Labs) ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            The goal of every frontier AI lab (OpenAI, Anthropic, Google, etc) is to create <span className="font-semibold">automated researchers</span>.
            As it stands today, scientific progress—across technology, biology, chemistry, medicine, materials, aerospace, computing, robotics—is
            all limited by the small amount of people that can do cutting-edge research.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            There is optimism that AI can remove this bottleneck—that we can create a
            <span className="text-emerald-600 font-semibold"> "country full of geniuses"</span> in a datacenter and can blow the top off of research in all of these areas.
          </p>
        </Section>

        {/* Singularity concept */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            There is a concept from science fiction called the <span className="font-semibold">"singularity"</span> that represents this:
            self-improving artificial intelligence, innovating at computer speed,
            improving the world faster than we can keep up. Diseases are cured, poverty is eliminated,
            supply chains are automated, humans live happily for hundreds of years.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 font-semibold">
            This is the cry of the magic bean salesman.
          </p>
        </Section>

        {/* ===== SECTION 2: Quote Card #1 ===== */}
        <Section align="center">
          <QuoteCard text="The allure of the legume" variant="storybook" />
        </Section>

        {/* ===== SECTION 3: Year Marker 2018 ===== */}
        <YearMarker year="2018" />

        {/* ===== SECTION 4: GPT-1 → GPT-2 ===== */}
        <Section>
          <CostChart visibleModels={2} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-1 is created. It generates words, but they are nonsense. GPT-2 is created, and it strings words together
            in a gruesome facsimile of thought, like a child improvising a story.
            Cost: <span className="font-mono text-emerald-600">$40,000</span>.
          </p>
        </Section>

        {/* ===== SECTION 5: Jack's Mother (Fury → Weeping) ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Upon hearing that Jack traded away their cow for these magic beans,
            his mother is furious. She sinks into a corner and weeps.
          </p>
        </Section>

        {/* ===== SECTION 6: Quote Card #2 ===== */}
        <Section align="center">
          <QuoteCard text="A cow ill-spent; legume lament" variant="storybook" />
        </Section>

        {/* ===== SECTION 7: Year Marker 2019 ===== */}
        <YearMarker year="2019" />

        {/* ===== SECTION 8: GPT-3 ===== */}
        <Section>
          <CostChart visibleModels={3} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-3 is created. It is 1000 times bigger than GPT-1.
            Cost: <span className="font-mono text-emerald-600">$4.6M</span>.
          </p>
        </Section>

        {/* ===== SECTION 9: "No Such Thing as Magic Beans" ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Jack's mother screams at Jack—he's a fool. <span className="italic">"There's no such thing as magic beans."</span> She rips the beans from his hand
            and throws them out the window.
          </p>
        </Section>

        {/* ===== SECTION 10: Quote Card #3 ===== */}
        <Section align="center">
          <QuoteCard text="Of magic beans, such tragic scenes" variant="storybook" />
        </Section>

        {/* ===== SECTION 11: Year Marker 2020 ===== */}
        <YearMarker year="2020" />

        {/* ===== SECTION 12: GPT-3.5 Turbo → ChatGPT ===== */}
        <Section>
          <CostChart visibleModels={4} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-3 is fine-tuned into GPT-3.5 Turbo and released as ChatGPT. It can talk to you like a human—including
            the fact that most of what it says being totally made-up—and is bad at counting.
            It reaches <span className="font-mono text-emerald-600">100 million users</span> within 2 months.
          </p>
        </Section>

        {/* ===== SECTION 13: The Beanstalk Appears ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Overnight, outside the window, an enormous, impossible beanstalk shoots into the sky.
          </p>
        </Section>

        <Section align="center" id="beanstalk-emerge">
          <QuoteCard text="Illustrious beans, pants pockets; industrious green plant rockets" variant="storybook" />
          <p className="text-slate-500 mt-8 text-sm">
            ← The beanstalk has emerged
          </p>
        </Section>

        {/* ===== SECTION 14: Year Marker 2023 ===== */}
        <YearMarker year="2023" />

        {/* ===== SECTION 15: GPT-4o Era ===== */}
        <Section>
          <CostChart visibleModels={5} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-4o is created, among many other models. They beat most humans at most tests.
            Their knowledge is on par with domain PhDs, across every domain. They produce sound and images
            and are universal translators. They can self-reflect, and read a whole book in seconds.
          </p>
        </Section>

        {/* ===== SECTION 16: Into the Clouds + Quote Card #5 ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Up, up, up Jack climbs. The air thins and the fog thickens as he pushes into the clouds.
            Through the mist, shapes start to take form.
          </p>
        </Section>

        <Section align="center">
          <QuoteCard text="Hark, on phloem towers, garbanzo empowers" variant="storybook" />
        </Section>

        {/* ===== SECTION 17: Year Marker 2024 ===== */}
        <YearMarker year="2024" />

        {/* ===== SECTION 18: GPT-5 → 5.1 → 5.2 ===== */}
        <Section>
          <CostChart visibleModels={6} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-5 is released, then 5.1, then 5.2—the state-of-the-art is a scorching potato,
            no lab holds it for more than a month. The pace is furious. We have to create harder and harder tests
            as the AI beats the ones we thought were unbeatable. AI solves unsolved math problems.
            Even the best programmers are outsourcing code-writing to agents—code that improves the very agents that write them.
          </p>
        </Section>

        {/* ===== SECTION 19: Giant's Castle + Quote Card #6 ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Jack pokes his head up from a cloud, and sees an enormous, luxurious castle.
            Back home, mother hasn't left the house since.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 italic">
            "No such thing as magic beans," she mutters.
          </p>
        </Section>

        <Section align="center">
          <QuoteCard text="Entombed and idle; legume denial" variant="storybook" />
        </Section>

        {/* ===== SECTION 20: Year Marker 2026 ===== */}
        <YearMarker year="2026" />

        {/* ===== SECTION 21: End of Act I ===== */}
        <CurtainClose actNumber={1} />

        {/* ===== SECTION 22: "I'm Not a Magic Bean Salesman" ===== */}
        <Section>
          <p className="text-xl text-slate-800 font-semibold leading-relaxed">
            I am not a magic bean salesman. In fact I probably worry far more than I should
            about coming off that way.
          </p>
          <p className="text-xl text-emerald-700 font-semibold mt-4">
            I am a beanstalk sherpa.
          </p>
        </Section>

        {/* ===== SECTION 23: Definition Card — Beanstalk ===== */}
        <Section align="center">
          <DefinitionCard
            label="Definition"
            term="Beanstalk"
            definition="A novel, enormous infrastructure project in service of a beautiful dream. Conceptually, it is a ladder into the clouds."
          />
        </Section>

        {/* ===== SECTION 24: Definition Card — Scaling Hypothesis ===== */}
        <Section align="center">
          <DefinitionCard
            label="Core Concept"
            term="The Scaling Hypothesis"
            definition="AI progress hinges on a pretty simple theory: bigger models perform better. The human brain has billions of neurons, and trillions of synapses, or connections between those neurons."
          />
        </Section>

        {/* ===== SECTION 25: GPT Scaling Table (Compute / Cost / Growth) ===== */}
        <Section align="center">
          <GPTComputeTable />
        </Section>

        {/* ===== SECTION 26: Orders of Magnitude Demo (Cookies) ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Bigger means adding more neurons and synapses to this artificial brain. It also requires more computers to do this.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            When we say bigger, we're talking <span className="font-semibold">orders of magnitude</span>.
            Imagine you have 1 cookie. This is like GPT-0.5. You think this cookie is good, so you want 2 orders of magnitude more cookies.
            That's 1 + 2 zeros—<span className="font-mono">100 cookies</span>. You can get there in a day.
          </p>
          <div className="mt-8">
            <OOMVisualization stage={0} />
          </div>
        </Section>

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Say you want another order of magnitude increase, so <span className="font-mono">1,000 cookies</span>. Now you're baking for a week. This is GPT-2.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            Someone else tries the cookies and says they want 3 MORE orders of magnitude. That's <span className="font-mono">1,000,000 cookies</span>.
            That's one thousand people baking cookies for a week. This is getting big fast. This is GPT-3.
          </p>
          <div className="mt-8">
            <OOMVisualization stage={1} />
          </div>
        </Section>

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            A cookie company calls and they want to mass produce your cookies. They want 3 orders-of-magnitude more cookies.
            That's <span className="font-mono">1 billion cookies</span>. Now you have to get the entire population of Chattanooga metro area to bake for 2 weeks. This is GPT-4.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            We're not done. What will you do when you need <span className="font-mono">1 trillion cookies</span>?
            That's 1 billion people making cookies for a week. An eighth of the world's population is making cookies—the beanstalk that dominates the horizon.
            As the world talks about the consequences of your cookie empire, the beanstalk rises.
          </p>
          <div className="mt-8">
            <OOMVisualization stage={2} />
          </div>
        </Section>

        {/* ===== SECTION 27: Title Card — Historical Beanstalks ===== */}
        <TitleCard title="Historical Beanstalks" />

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            A beanstalk is a novel, enormous infrastructure project in service of a fantastic dream.
            AI is not the first beanstalk.
          </p>
        </Section>

        {/* ===== SECTION 28: Manhattan Project ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            80 years ago, a small group of smart folk got the idea that you could take the smallest element of matter,
            split it in half, and harness power to subdue any enemy.
          </p>
        </Section>

        {/* ===== SECTION 29: Apollo Program ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            A couple decades later, a different group of smart folk decided they could send a rocket through space
            and walk on the moon—and that doing so would cement a place as the dominant global superpower.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            Both of these periods saw disproportionately massive investment in new research towards uncertain goals.
            The journey from magic beans to waltzing through a city in the sky was controversial and frenzied.
          </p>
        </Section>

        {/* ===== SECTION 30: Roadmap Table ===== */}
        <Section align="center">
          <ScalingTable />
          <p className="text-slate-600 mt-6 text-center">
            The scaling hypothesis will continue being tested until it fails. This table charts a simple conceptual roadmap for doing so.
          </p>
        </Section>

        {/* ===== SECTION 31: Investment Highlights ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Seems preposterous? Let's layer on actual confirmed investments from AI companies:
          </p>
        </Section>

        <Section align="center">
          <InvestmentHighlights />
        </Section>

        {/* ===== SECTION 32: "Not a Bubble" ===== */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed font-semibold">
            A beanstalk is a novel, enormous infrastructure project in service of a fantastic dream. AI is not the first beanstalk:
          </p>
        </Section>

        {/* ===== SECTION 33: Historical Capex Table ===== */}
        <Section align="center">
          <HistoricalCapexTable />
        </Section>

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            A beanstalk is not a bubble. Like a bubble, a beanstalk grows suddenly,
            but the similarities end there. A beanstalk is permanent connective tissue
            to a world we don't inhabit, but want to.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            The sense of wonder that entails is also sure to evoke fantastical ideas that never come to fruition.
            We don't know exactly what the world in the clouds holds in store for us. But unlike Jack's story,
            real beanstalks aren't a product of pure whimsy—it only gets built when we're reasonably sure what's up there is worth it.
          </p>
        </Section>

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed font-semibold">
            AI is not a bubble—it is a world historical event. It is a rare but precedented mobilization of capital
            towards a hypothesis that cannot be ignored.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 font-semibold">
            We are well beyond the "magic beans" stage. The beans are planted, the beanstalk is built,
            and we're onto exploring the Giant's castle, with all the risk and reward that poses.
          </p>
        </Section>

        {/* ===== SECTION 34: End of Act II ===== */}
        <CurtainClose actNumber={2} />

        {/* ===== SECTION 35: Title Card — On the Beanstalk and Beyond ===== */}
        <TitleCard title="On the Beanstalk and Beyond" />

        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            My role in all this is as a beanstalk sherpa. I didn't buy or plant the beans,
            nor am I building out the beanstalk or taking the first steps into the world it leads to.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            I'm just more of a guide for tricky-but-established paths, on trips where a lot of people want to go and few have ever been.
          </p>
        </Section>

        {/* ===== SECTION 36: Core Disciplines Intro ===== */}
        <Section>
          <h2 className="font-serif text-3xl text-slate-800 mb-4">Core Disciplines on the Beanstalk</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            What are core disciplines, on the beanstalk and beyond?
          </p>
          <ul className="mt-6 space-y-2">
            <li className="text-lg text-slate-700">• Situational Awareness</li>
            <li className="text-lg text-slate-700">• Energy</li>
            <li className="text-lg text-slate-700">• Aspiration</li>
          </ul>
        </Section>

        {/* ===== SECTION 37: Situational Awareness ===== */}
        <Section>
          <h3 className="font-serif text-2xl text-emerald-700 mb-4">1. Situational Awareness</h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            You must know what is happening around you. New paths are being forged, new tools invented,
            and many of them affect your journey. You can't climb the beanstalk effectively with your eyes closed.
            You can't tiptoe through the castle with Airpods in.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            There's a lot going on, which brings me to item 2:
          </p>
        </Section>

        {/* ===== SECTION 38: Energy ===== */}
        <Section>
          <h3 className="font-serif text-2xl text-emerald-700 mb-4">2. Energy</h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            There is no replacement for excitement and effort. Trepidation is also understandable—and valuable—but
            I recommend figuring out what specific part of the city in the sky you find most appealing and working towards that end.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            Which leads me to #3:
          </p>
        </Section>

        {/* ===== SECTION 39: Aspiration ===== */}
        <Section>
          <h3 className="font-serif text-2xl text-emerald-700 mb-4">3. Aspiration</h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            The city in the clouds that AI represents is a big unknown, with a lot of glamor, but also a lot to worry about.
            But there's something for everyone there. If you have trouble looking past some of the things that worry you—and
            believe me, I'm right there with you—I encourage you to look for the future that you are excited about.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            AI can help cure rare diseases that currently don't get funding. AI can help people who feel overlooked by the healthcare system
            navigate their illnesses. There's a ton of good that is possible—so find what that world looks like, and work towards it.
          </p>
        </Section>

        {/* ===== Core disciplines, shortened ===== */}
        <Section align="center">
          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-12 shadow-lg">
            <h2 className="font-serif text-3xl text-slate-800 mb-4">Core disciplines, shortened:</h2>
            <p className="font-mono text-xl text-emerald-700">Read things.</p>
            <p className="font-mono text-xl text-amber-600 mt-2">Believe in something.</p>
          </div>
        </Section>

        {/* ===== SECTION 40: Closing Screen ===== */}
        <Section align="center">
          <p className="font-serif text-2xl md:text-3xl text-slate-600 mb-4">
            Thank you for joining my
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-800">
            beans<span className="text-emerald-600">Talk</span>
          </h1>
          <div className="mt-12 flex justify-center">
            <svg width="80" height="80" viewBox="0 0 60 60">
              <ellipse cx="30" cy="30" rx="20" ry="12" fill="hsl(45, 90%, 55%)" />
              <ellipse cx="25" cy="27" rx="6" ry="4" fill="hsl(45, 100%, 75%)" opacity="0.6" />
            </svg>
          </div>
        </Section>

        {/* Spacer */}
        <div className="h-32" />

      </div>
    </div>
  );
}
