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

// Beanstalk Progress Component
const BeanstalkProgress = ({ scrollProgress, visible }) => {
  if (!visible) return null;
  
  const growthProgress = Math.min((scrollProgress - 0.25) / 0.75, 1);
  
  return (
    <div className="fixed left-0 top-0 w-24 h-screen z-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 800" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="stalkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(120, 50%, 25%)" />
            <stop offset="50%" stopColor="hsl(120, 55%, 35%)" />
            <stop offset="100%" stopColor="hsl(120, 50%, 28%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main stalk - grows from bottom */}
        <path
          d={`M50 800 Q40 ${800 - growthProgress * 300} 55 ${800 - growthProgress * 400} Q45 ${800 - growthProgress * 550} 50 ${800 - growthProgress * 700}`}
          stroke="url(#stalkGrad)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000 - (growthProgress * 1000),
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />
        
        {/* Secondary vine */}
        <path
          d={`M55 800 Q65 ${800 - growthProgress * 280} 48 ${800 - growthProgress * 380} Q58 ${800 - growthProgress * 520} 52 ${800 - growthProgress * 680}`}
          stroke="hsl(120, 45%, 30%)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity={0.8}
          style={{
            strokeDasharray: 800,
            strokeDashoffset: 800 - (growthProgress * 800),
            transition: 'stroke-dashoffset 0.15s ease-out'
          }}
        />
        
        {/* Leaves */}
        {growthProgress > 0.2 && (
          <ellipse cx="70" cy={800 - growthProgress * 250} rx="20" ry="10" fill="hsl(120, 50%, 40%)" 
            style={{ opacity: Math.min((growthProgress - 0.2) * 3, 1), transform: 'rotate(-20deg)', transformOrigin: '70px ' + (800 - growthProgress * 250) + 'px' }} />
        )}
        {growthProgress > 0.4 && (
          <ellipse cx="30" cy={800 - growthProgress * 400} rx="18" ry="9" fill="hsl(120, 55%, 38%)" 
            style={{ opacity: Math.min((growthProgress - 0.4) * 3, 1), transform: 'rotate(25deg)', transformOrigin: '30px ' + (800 - growthProgress * 400) + 'px' }} />
        )}
        {growthProgress > 0.6 && (
          <ellipse cx="65" cy={800 - growthProgress * 520} rx="16" ry="8" fill="hsl(120, 50%, 42%)" 
            style={{ opacity: Math.min((growthProgress - 0.6) * 3, 1), transform: 'rotate(-15deg)', transformOrigin: '65px ' + (800 - growthProgress * 520) + 'px' }} />
        )}
        {growthProgress > 0.8 && (
          <ellipse cx="35" cy={800 - growthProgress * 650} rx="14" ry="7" fill="hsl(120, 52%, 45%)" 
            style={{ opacity: Math.min((growthProgress - 0.8) * 3, 1), transform: 'rotate(20deg)', transformOrigin: '35px ' + (800 - growthProgress * 650) + 'px' }} />
        )}
        
        {/* Magic beans (golden) */}
        {growthProgress > 0.3 && (
          <ellipse cx="58" cy={800 - growthProgress * 320} rx="8" ry="5" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.3) * 4, 1) }} />
        )}
        {growthProgress > 0.55 && (
          <ellipse cx="42" cy={800 - growthProgress * 480} rx="7" ry="4" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
            style={{ opacity: Math.min((growthProgress - 0.55) * 4, 1) }} />
        )}
        {growthProgress > 0.75 && (
          <ellipse cx="55" cy={800 - growthProgress * 600} rx="6" ry="4" fill="hsl(45, 90%, 55%)" filter="url(#glow)"
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
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-8 shadow-lg max-w-xl mx-auto">
        <div className="absolute -top-3 -left-3 text-5xl text-amber-300">"</div>
        <div className="absolute -bottom-3 -right-3 text-5xl text-amber-300">"</div>
        <p className="font-serif text-2xl md:text-3xl italic text-amber-900 text-center leading-relaxed">
          {text}
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative bg-slate-900 border border-cyan-500/30 rounded-lg p-8 shadow-lg max-w-xl mx-auto overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      <div className="absolute top-2 left-2 text-cyan-500 font-mono text-xs">[</div>
      <div className="absolute bottom-2 right-2 text-cyan-500 font-mono text-xs">]</div>
      <p className="font-mono text-lg text-cyan-100 text-center relative z-10">
        {text}
      </p>
    </div>
  );
};

// Year Marker Component
const YearMarker = ({ year }) => (
  <div className="flex justify-center py-16">
    <div className="inline-block bg-gradient-to-r from-slate-800 to-slate-900 px-12 py-6 rounded-lg shadow-xl">
      <span className="font-mono text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
        {year}
      </span>
    </div>
  </div>
);

// Cost Chart Component
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
  
  const formatCost = (cost) => {
    if (cost >= 1000000) return `$${(cost / 1000000).toFixed(0)}M`;
    if (cost >= 1000) return `$${(cost / 1000).toFixed(0)}K`;
    return `$${cost}`;
  };
  
  return (
    <div className="bg-slate-900 rounded-lg p-6 shadow-xl max-w-2xl mx-auto">
      <div className="absolute inset-0 opacity-5 rounded-lg" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <h3 className="font-mono text-cyan-400 text-sm uppercase tracking-wider mb-6">Training Cost Progression</h3>
      <div className="space-y-4">
        {models.slice(0, visibleModels).map((model, index) => {
          const logWidth = (Math.log10(model.cost) / Math.log10(maxCost)) * 100;
          return (
            <div key={model.name} className="relative">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-slate-300 text-sm">{model.name}</span>
                <span className="font-mono text-cyan-400 text-sm">{formatCost(model.cost)}</span>
              </div>
              <div className="h-6 bg-slate-800 rounded overflow-hidden">
                <div 
                  className="h-full rounded transition-all duration-700 ease-out"
                  style={{
                    width: `${logWidth}%`,
                    background: `linear-gradient(90deg, hsl(${120 + index * 20}, 70%, 40%), hsl(${140 + index * 20}, 60%, 50%))`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="font-mono text-slate-500 text-xs mt-4 text-center">Log scale visualization</p>
    </div>
  );
};

// Definition Card
const DefinitionCard = ({ label, term, definition }) => (
  <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-8 max-w-xl mx-auto relative overflow-hidden">
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }} />
    <div className="relative z-10">
      <span className="font-mono text-cyan-500 text-xs uppercase tracking-wider">{label}</span>
      <h3 className="font-serif text-2xl text-white mt-2 mb-4">{term}</h3>
      <div className="w-16 h-0.5 bg-cyan-500 mb-4" />
      <p className="text-slate-300 leading-relaxed">{definition}</p>
    </div>
  </div>
);

// Scaling Table Component
const ScalingTable = () => {
  const data = [
    { year: '2022', compute: '10K H100s', cost: '$500M', power: '10 MW', illustration: '10,000 homes' },
    { year: '2024', compute: '100K', cost: '$1B', power: '100 MW', illustration: '100,000 homes' },
    { year: '2026', compute: '1M', cost: '$10B', power: '1 GW', illustration: 'Hoover Dam' },
    { year: '2028', compute: '10M', cost: '$100B', power: '10 GW', illustration: 'Small US State' },
    { year: '2030', compute: '100M', cost: '$1T', power: '100 GW', illustration: '20% of US electricity' },
  ];
  
  return (
    <div className="bg-slate-900 rounded-lg p-6 shadow-xl max-w-4xl mx-auto overflow-x-auto">
      <h3 className="font-mono text-cyan-400 text-sm uppercase tracking-wider mb-4">AI Infrastructure Scaling Roadmap</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cyan-500/30">
            <th className="text-left py-3 px-4 font-mono text-cyan-400">Year</th>
            <th className="text-left py-3 px-4 font-mono text-cyan-400">Compute</th>
            <th className="text-left py-3 px-4 font-mono text-cyan-400">Cost</th>
            <th className="text-left py-3 px-4 font-mono text-cyan-400">Power</th>
            <th className="text-left py-3 px-4 font-mono text-cyan-400">Scale</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.year} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
              <td className="py-3 px-4 font-mono text-white">{row.year}</td>
              <td className="py-3 px-4 font-mono text-slate-300">{row.compute}</td>
              <td className="py-3 px-4 font-mono text-green-400">{row.cost}</td>
              <td className="py-3 px-4 font-mono text-amber-400">{row.power}</td>
              <td className="py-3 px-4 text-slate-400">{row.illustration}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

// Section Component
const Section = ({ children, className = '', align = 'left' }) => (
  <section className={`min-h-screen flex flex-col justify-center py-20 px-8 ${align === 'center' ? '' : 'ml-28'} ${className}`}>
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
        
        {/* Opening */}
        <Section align="center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-800 mb-6">
            beans<span className="text-emerald-600">Talk</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A scroll-driven journey through AI infrastructure, 
            told through the lens of Jack and the Beanstalk.
          </p>
        </Section>
        
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
          <p className="font-serif text-2xl text-slate-600 italic">
            Thank you for joining my beansTalk
          </p>
          <div className="mt-8 flex justify-center">
            <svg width="60" height="60" viewBox="0 0 60 60">
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
