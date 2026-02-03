// Using React from global scope (loaded via CDN)
const { useState, useEffect, useRef } = React;

// Pastoral Background Component
const PastoralBackground = ({ scrollProgress }) => {
  const fogOpacity = Math.min(scrollProgress * 0.7, 0.6);
  
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
    </div>
  );
};

// Beanstalk Progress Component - Bigger and thicker
const BeanstalkProgress = ({ scrollProgress, visible }) => {
  if (!visible) return null;

  const growthProgress = Math.min((scrollProgress - 0.25) / 0.75, 1);

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

        {/* Main stalk - grows from bottom, much thicker */}
        <path
          d={`M75 800 Q55 ${800 - growthProgress * 300} 85 ${800 - growthProgress * 400} Q60 ${800 - growthProgress * 550} 75 ${800 - growthProgress * 700}`}
          stroke="url(#stalkGrad)"
          strokeWidth="45"
          fill="none"
          strokeLinecap="round"
          filter="url(#stalkShadow)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000 - (growthProgress * 1000),
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />

        {/* Secondary vine - thicker */}
        <path
          d={`M85 800 Q105 ${800 - growthProgress * 280} 68 ${800 - growthProgress * 380} Q95 ${800 - growthProgress * 520} 78 ${800 - growthProgress * 680}`}
          stroke="url(#stalkGrad2)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          opacity={0.9}
          style={{
            strokeDasharray: 800,
            strokeDashoffset: 800 - (growthProgress * 800),
            transition: 'stroke-dashoffset 0.15s ease-out'
          }}
        />

        {/* Tertiary vine - adds more presence */}
        <path
          d={`M70 800 Q50 ${800 - growthProgress * 250} 80 ${800 - growthProgress * 350} Q55 ${800 - growthProgress * 480} 72 ${800 - growthProgress * 620}`}
          stroke="hsl(120, 40%, 28%)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity={0.7}
          style={{
            strokeDasharray: 700,
            strokeDashoffset: 700 - (growthProgress * 700),
            transition: 'stroke-dashoffset 0.18s ease-out'
          }}
        />

        {/* Leaves - bigger */}
        {growthProgress > 0.15 && (
          <ellipse cx="115" cy={800 - growthProgress * 220} rx="35" ry="16" fill="hsl(120, 50%, 38%)"
            style={{ opacity: Math.min((growthProgress - 0.15) * 3, 1), transform: 'rotate(-25deg)', transformOrigin: '115px ' + (800 - growthProgress * 220) + 'px' }} />
        )}
        {growthProgress > 0.2 && (
          <ellipse cx="120" cy={800 - growthProgress * 250} rx="32" ry="14" fill="hsl(120, 50%, 40%)"
            style={{ opacity: Math.min((growthProgress - 0.2) * 3, 1), transform: 'rotate(-20deg)', transformOrigin: '120px ' + (800 - growthProgress * 250) + 'px' }} />
        )}
        {growthProgress > 0.35 && (
          <ellipse cx="35" cy={800 - growthProgress * 350} rx="30" ry="13" fill="hsl(120, 55%, 36%)"
            style={{ opacity: Math.min((growthProgress - 0.35) * 3, 1), transform: 'rotate(30deg)', transformOrigin: '35px ' + (800 - growthProgress * 350) + 'px' }} />
        )}
        {growthProgress > 0.4 && (
          <ellipse cx="30" cy={800 - growthProgress * 400} rx="28" ry="12" fill="hsl(120, 55%, 38%)"
            style={{ opacity: Math.min((growthProgress - 0.4) * 3, 1), transform: 'rotate(25deg)', transformOrigin: '30px ' + (800 - growthProgress * 400) + 'px' }} />
        )}
        {growthProgress > 0.55 && (
          <ellipse cx="110" cy={800 - growthProgress * 480} rx="26" ry="11" fill="hsl(120, 50%, 40%)"
            style={{ opacity: Math.min((growthProgress - 0.55) * 3, 1), transform: 'rotate(-18deg)', transformOrigin: '110px ' + (800 - growthProgress * 480) + 'px' }} />
        )}
        {growthProgress > 0.6 && (
          <ellipse cx="115" cy={800 - growthProgress * 520} rx="24" ry="10" fill="hsl(120, 50%, 42%)"
            style={{ opacity: Math.min((growthProgress - 0.6) * 3, 1), transform: 'rotate(-15deg)', transformOrigin: '115px ' + (800 - growthProgress * 520) + 'px' }} />
        )}
        {growthProgress > 0.75 && (
          <ellipse cx="40" cy={800 - growthProgress * 600} rx="22" ry="9" fill="hsl(120, 52%, 42%)"
            style={{ opacity: Math.min((growthProgress - 0.75) * 3, 1), transform: 'rotate(22deg)', transformOrigin: '40px ' + (800 - growthProgress * 600) + 'px' }} />
        )}
        {growthProgress > 0.8 && (
          <ellipse cx="45" cy={800 - growthProgress * 650} rx="20" ry="8" fill="hsl(120, 52%, 45%)"
            style={{ opacity: Math.min((growthProgress - 0.8) * 3, 1), transform: 'rotate(20deg)', transformOrigin: '45px ' + (800 - growthProgress * 650) + 'px' }} />
        )}

        {/* Magic beans (golden) - bigger */}
        {growthProgress > 0.25 && (
          <ellipse cx="90" cy={800 - growthProgress * 280} rx="12" ry="7" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.25) * 4, 1) }} />
        )}
        {growthProgress > 0.3 && (
          <ellipse cx="88" cy={800 - growthProgress * 320} rx="11" ry="7" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.3) * 4, 1) }} />
        )}
        {growthProgress > 0.5 && (
          <ellipse cx="62" cy={800 - growthProgress * 440} rx="10" ry="6" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.5) * 4, 1) }} />
        )}
        {growthProgress > 0.55 && (
          <ellipse cx="58" cy={800 - growthProgress * 480} rx="10" ry="6" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.55) * 4, 1) }} />
        )}
        {growthProgress > 0.7 && (
          <ellipse cx="82" cy={800 - growthProgress * 560} rx="9" ry="5" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.7) * 4, 1) }} />
        )}
        {growthProgress > 0.75 && (
          <ellipse cx="80" cy={800 - growthProgress * 600} rx="9" ry="5" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.75) * 4, 1) }} />
        )}
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
  <div className="min-h-screen flex items-center justify-center">
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

        {/* Opening - Just the pastoral scene with scroll indicator */}
        <section className="min-h-screen" />

        {/* Jack's Story */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Once upon a time, there lived a poor woman, her poor cow, and her poor son Jack. 
            Jack was out in town, and met a man who claimed he had <span className="text-emerald-600 font-semibold">magic beans</span>. 
            Jack, a naïve boy, traded the poor cow for the magic beans.
          </p>
        </Section>
        
        {/* AI Promise */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            The goal of every frontier AI lab is to create <span className="font-semibold">automated researchers</span>. 
            Scientific progress—across technology, biology, chemistry, medicine, materials, aerospace, computing, robotics—is 
            limited by the small number of people who can do cutting-edge research.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            There is optimism that AI can remove this bottleneck—that we can create a 
            <span className="text-emerald-600 font-semibold">"country full of geniuses"</span> in a datacenter.
          </p>
        </Section>
        
        {/* Singularity concept */}
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            This is the "singularity"—self-improving artificial intelligence, innovating at computer speed, 
            improving the world faster than we can keep up. Diseases cured, poverty eliminated, 
            supply chains automated.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 font-semibold">
            This is the cry of the magic bean salesman. This is the allure of the legume.
          </p>
        </Section>
        
        {/* Quote Card 1 */}
        <Section align="center">
          <QuoteCard text="The allure of the legume" variant="storybook" />
        </Section>
        
        {/* 2018 */}
        <YearMarker year="2018" />
        
        <Section>
          <CostChart visibleModels={2} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-1 generates nonsense. GPT-2 strings words together like a child improvising a story. 
            Cost: <span className="font-mono text-emerald-600">$40,000</span>.
          </p>
        </Section>
        
        {/* Quote Card 2 */}
        <Section align="center">
          <QuoteCard text="A cow ill-spent; legume lament" variant="storybook" />
        </Section>
        
        {/* 2019 */}
        <YearMarker year="2019" />
        
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Upon hearing that Jack traded away their cow for these magic beans, 
            his mother is furious. She sinks into a corner and weeps.
          </p>
        </Section>
        
        <Section>
          <CostChart visibleModels={3} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-3: 1000x bigger than GPT-1. Cost: <span className="font-mono text-emerald-600">$4.6M</span>.
          </p>
        </Section>
        
        {/* Quote Card 3 */}
        <Section align="center">
          <QuoteCard text="Of magic beans, such tragic scenes" variant="storybook" />
        </Section>
        
        {/* 2020 */}
        <YearMarker year="2020" />
        
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            "There's no such thing as magic beans." She rips the beans from his hand 
            and throws them out the window.
          </p>
        </Section>
        
        <Section>
          <CostChart visibleModels={4} />
          <p className="text-slate-600 mt-6 text-center">
            ChatGPT reaches <span className="font-mono text-emerald-600">100 million users</span> within 2 months.
          </p>
        </Section>
        
        {/* Beanstalk emerges here (around 25% scroll) */}
        <Section align="center" id="beanstalk-emerge">
          <QuoteCard text="Illustrious beans, pants pockets; industrious green plant rockets" variant="storybook" />
          <p className="text-slate-500 mt-8 text-sm">
            ← The beanstalk has emerged
          </p>
        </Section>
        
        {/* 2023 */}
        <YearMarker year="2023" />
        
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Overnight, outside the window, an enormous, impossible beanstalk shoots into the sky.
          </p>
        </Section>
        
        <Section>
          <CostChart visibleModels={5} />
          <p className="text-slate-600 mt-6 text-center">
            GPT-4: Beats most humans at most tests. Knowledge on par with domain PhDs.
          </p>
        </Section>
        
        {/* Quote Card 4 */}
        <Section align="center">
          <QuoteCard text="Hark, on phloem towers, garbanzo empowers" variant="storybook" />
        </Section>
        
        {/* 2024 */}
        <YearMarker year="2024" />
        
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Up, up, up Jack climbs. The air thins and the fog thickens as he pushes into the clouds. 
            Through the mist, shapes start to take form.
          </p>
        </Section>
        
        <Section>
          <CostChart visibleModels={6} />
          <p className="text-slate-600 mt-6 text-center">
            The state-of-the-art is a scorching potato. No lab holds it for more than a month.
          </p>
        </Section>
        
        {/* 2026 */}
        <YearMarker year="2026" />
        
        <Section>
          <p className="text-lg text-slate-700 leading-relaxed">
            Jack pokes his head up from a cloud and sees an enormous, luxurious castle. 
            Back home, mother hasn't left the house since.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 italic">
            "No such thing as magic beans," she mutters.
          </p>
        </Section>
        
        {/* Quote Card 5 */}
        <Section align="center">
          <QuoteCard text="Entombed and idle; legume denial" variant="storybook" />
        </Section>
        
        {/* Sherpa intro */}
        <Section>
          <p className="text-xl text-slate-800 font-semibold leading-relaxed">
            I am not a magic bean salesman. In fact, I probably worry far more than I should 
            about coming off that way.
          </p>
          <p className="text-xl text-emerald-700 font-semibold mt-4">
            I am a beanstalk sherpa.
          </p>
        </Section>
        
        {/* Definition: Beanstalk */}
        <Section align="center">
          <DefinitionCard 
            label="Definition"
            term="Beanstalk"
            definition="A novel, enormous infrastructure project in service of a beautiful dream. Conceptually, it is a ladder into the clouds."
          />
        </Section>
        
        {/* Definition: Scaling Hypothesis */}
        <Section align="center">
          <DefinitionCard 
            label="Core Concept"
            term="The Scaling Hypothesis"
            definition="AI progress hinges on a simple observation: bigger models perform better. The human brain has billions of neurons and trillions of synapses. We're building artificial versions at exponential scale."
          />
        </Section>
        
        {/* Scaling Table */}
        <Section align="center">
          <ScalingTable />
        </Section>
        
        {/* Historical Beanstalks */}
        <Section>
          <h2 className="font-serif text-3xl text-slate-800 mb-6">Historical Beanstalks</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            AI is not the first beanstalk. 80 years ago, a small group figured out you could 
            split the atom. Decades later, another group decided they could walk on the moon.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            Both periods saw massive investment towards uncertain goals. The journey from 
            magic beans to waltzing through a city in the sky was controversial and frenzied.
          </p>
        </Section>
        
        {/* Not a bubble */}
        <Section>
          <h2 className="font-serif text-3xl text-slate-800 mb-6">Not a Bubble</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            A beanstalk is not a bubble. Like a bubble, a beanstalk grows suddenly, 
            but the similarities end there. A beanstalk is permanent connective tissue 
            to a world we don't inhabit, but want to.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4 font-semibold">
            AI is a world historical event. We are well beyond the "magic beans" stage. 
            The beans are planted, the beanstalk is built, and we're onto exploring the Giant's castle.
          </p>
        </Section>
        
        {/* Core Disciplines */}
        <Section>
          <h2 className="font-serif text-3xl text-slate-800 mb-8">Core Disciplines on the Beanstalk</h2>
          <BulletList items={[
            "Situational Awareness — Know what is happening around you. New paths are being forged, new tools invented.",
            "Energy — There is no replacement for excitement and effort. Figure out what part of the city in the sky appeals most to you.",
            "Aspiration — This is a rare time to put the cart before the horse, because the cart will probably learn to drive itself."
          ]} />
        </Section>
        
        {/* Closing */}
        <Section align="center">
          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-12 shadow-lg">
            <h2 className="font-serif text-3xl text-slate-800 mb-4">Core disciplines, shortened:</h2>
            <p className="font-mono text-xl text-emerald-700">Read things.</p>
            <p className="font-mono text-xl text-amber-600 mt-2">Believe in something.</p>
          </div>
        </Section>
        
        {/* Thank you */}
        <Section align="center">
          <p className="font-serif text-2xl md:text-3xl text-slate-600 mb-4">
            Thank you for coming to my
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
