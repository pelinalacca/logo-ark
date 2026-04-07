import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

const SEGMENTS = [
  { label: "%10 İndirim", color: "#D41220" },
  { label: "%20 İndirim", color: "#1A1A1A" },
  { label: "%5 İndirim", color: "#B80D19" },
  { label: "%30 İndirim", color: "#2A2A2A" },
  { label: "%15 İndirim", color: "#D41220" },
  { label: "Hediye Modül", color: "#1A1A1A" },
  { label: "%25 İndirim", color: "#B80D19" },
  { label: "%50 İndirim", color: "#2A2A2A" },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentIndex = Math.floor(normalizedAngle / SEGMENT_ANGLE);
      setResult(SEGMENTS[segmentIndex].label);
      setSpinning(false);
    }, 5000);
  }, [spinning, rotation]);

  const size = 420;
  const center = size / 2;
  const radius = size / 2 - 24;

  const createSegmentPath = (index: number) => {
    const startAngle = (index * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0 1 ${x2},${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const midAngle = ((index + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const textRadius = radius * 0.62;
    return {
      x: center + textRadius * Math.cos(midAngle),
      y: center + textRadius * Math.sin(midAngle),
      angle: (index + 0.5) * SEGMENT_ANGLE,
    };
  };

  // Decorative dots on segment borders
  const getDotPositions = () => {
    const dots = [];
    for (let i = 0; i < SEGMENTS.length; i++) {
      const angle = (i * SEGMENT_ANGLE - 90) * (Math.PI / 180);
      for (let r = 60; r < radius - 10; r += 18) {
        dots.push({
          x: center + r * Math.cos(angle),
          y: center + r * Math.sin(angle),
        });
      }
    }
    return dots;
  };

  // LED-like dots around the rim
  const getLedPositions = () => {
    const leds = [];
    const ledRadius = radius + 12;
    const count = 40;
    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) - 90) * (Math.PI / 180);
      leds.push({
        x: center + ledRadius * Math.cos(angle),
        y: center + ledRadius * Math.sin(angle),
        on: i % 2 === (spinning ? 1 : 0),
      });
    }
    return leds;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20" style={{ filter: "drop-shadow(0 3px 8px rgba(212,18,32,0.5))" }}>
          <svg width="40" height="48" viewBox="0 0 40 48">
            <defs>
              <linearGradient id="pointerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D41220" />
                <stop offset="100%" stopColor="#8B0A14" />
              </linearGradient>
            </defs>
            <polygon points="20,48 4,0 36,0" fill="url(#pointerGrad)" />
            <polygon points="20,48 4,0 36,0" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
          </svg>
        </div>

        {/* Glow effect behind wheel */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,18,32,0.15) 0%, transparent 70%)",
            transform: "scale(1.3)",
            filter: "blur(20px)",
          }}
        />

        {/* Wheel */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="relative z-10"
        >
          <defs>
            <filter id="innerShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <radialGradient id="centerGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#3a3a3a" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
            <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#555" />
              <stop offset="50%" stopColor="#222" />
              <stop offset="100%" stopColor="#555" />
            </linearGradient>
          </defs>

          {/* Outer metallic rim */}
          <circle cx={center} cy={center} r={radius + 18} fill="url(#rimGrad)" />
          <circle cx={center} cy={center} r={radius + 15} fill="#111" />

          {/* LED dots */}
          {getLedPositions().map((led, i) => (
            <circle
              key={`led-${i}`}
              cx={led.x}
              cy={led.y}
              r="3.5"
              fill={led.on ? "#D41220" : "#441010"}
              className={spinning ? "animate-pulse" : ""}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}

          {/* Wheel group with rotation */}
          <g
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: `${center}px ${center}px`,
              transition: spinning
                ? "transform 5s cubic-bezier(0.15, 0.6, 0.08, 1)"
                : "none",
            }}
          >
            {/* Segments */}
            {SEGMENTS.map((seg, i) => (
              <path key={i} d={createSegmentPath(i)} fill={seg.color} />
            ))}

            {/* Segment border dots */}
            {getDotPositions().map((dot, i) => (
              <circle key={`dot-${i}`} cx={dot.x} cy={dot.y} r="1.2" fill="rgba(255,255,255,0.15)" />
            ))}

            {/* Segment labels */}
            {SEGMENTS.map((_, i) => {
              const pos = getTextPosition(i);
              return (
                <text
                  key={`t-${i}`}
                  x={pos.x}
                  y={pos.y}
                  fill="white"
                  fontSize="14"
                  fontWeight="800"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                  letterSpacing="0.5"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.7)" }}
                >
                  {SEGMENTS[i].label}
                </text>
              );
            })}
          </g>

          {/* Center hub */}
          <circle cx={center} cy={center} r="40" fill="url(#centerGrad)" filter="url(#innerShadow)" />
          <circle cx={center} cy={center} r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx={center} cy={center} r="33" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={center} y={center - 4} fill="#D41220" fontSize="14" fontWeight="900" textAnchor="middle" dominantBaseline="central" letterSpacing="2">
            LOGO
          </text>
          <text x={center} y={center + 12} fill="rgba(255,255,255,0.4)" fontSize="7" fontWeight="600" textAnchor="middle" dominantBaseline="central" letterSpacing="1.5">
            YAZILIM
          </text>
        </svg>
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="relative px-14 py-4 text-lg font-black tracking-widest uppercase rounded-full text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: "linear-gradient(135deg, #D41220 0%, #8B0A14 100%)",
          boxShadow: spinning
            ? "0 4px 20px rgba(212,18,32,0.3)"
            : "0 8px 32px rgba(212,18,32,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {spinning ? "Çark Dönüyor..." : "Çarkı Çevir"}
      </button>

      {/* Result */}
      {result && (
        <div
          className="animate-in fade-in zoom-in duration-500 rounded-2xl px-12 py-8 text-center border"
          style={{
            background: "linear-gradient(135deg, rgba(212,18,32,0.05) 0%, rgba(26,26,26,0.05) 100%)",
            borderColor: "rgba(212,18,32,0.2)",
            boxShadow: "0 8px 32px rgba(212,18,32,0.1)",
          }}
        >
          <p className="text-muted-foreground text-sm mb-2 tracking-wide uppercase">Tebrikler!</p>
          <p className="text-4xl font-black text-primary">{result}</p>
          <p className="text-muted-foreground text-xs mt-3">Logo Yazılım çözümlerinde geçerlidir.</p>
        </div>
      )}
    </div>
  );
}
