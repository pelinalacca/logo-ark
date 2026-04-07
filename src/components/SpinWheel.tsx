import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

const SEGMENTS = [
  { label: "%10 İndirim", color: "hsl(356, 93%, 45%)" },
  { label: "%20 İndirim", color: "hsl(0, 0%, 15%)" },
  { label: "%5 İndirim", color: "hsl(356, 80%, 55%)" },
  { label: "%30 İndirim", color: "hsl(0, 0%, 22%)" },
  { label: "%15 İndirim", color: "hsl(356, 93%, 45%)" },
  { label: "Hediye Modül", color: "hsl(0, 0%, 15%)" },
  { label: "%25 İndirim", color: "hsl(356, 80%, 55%)" },
  { label: "%50 İndirim", color: "hsl(45, 90%, 55%)" },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

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
    }, 4500);
  }, [spinning, rotation]);

  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 10;

  const createSegmentPath = (index: number) => {
    const startAngle = (index * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
    return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const midAngle = ((index + 0.5) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const textRadius = radius * 0.65;
    return {
      x: center + textRadius * Math.cos(midAngle),
      y: center + textRadius * Math.sin(midAngle),
      angle: (index + 0.5) * SEGMENT_ANGLE,
    };
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Pointer */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "16px solid transparent",
              borderRight: "16px solid transparent",
              borderTop: "32px solid hsl(356, 93%, 45%)",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Wheel */}
        <div
          className="relative"
          style={{
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.25))",
          }}
        >
          <svg
            ref={wheelRef}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            {/* Outer ring */}
            <circle
              cx={center}
              cy={center}
              r={radius + 6}
              fill="none"
              stroke="hsl(0, 0%, 12%)"
              strokeWidth="8"
            />
            {/* Segments */}
            {SEGMENTS.map((seg, i) => (
              <path key={i} d={createSegmentPath(i)} fill={seg.color} stroke="hsl(0,0%,100%)" strokeWidth="1.5" />
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
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${pos.angle}, ${pos.x}, ${pos.y})`}
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                >
                  {SEGMENTS[i].label}
                </text>
              );
            })}
            {/* Center circle */}
            <circle cx={center} cy={center} r="32" fill="hsl(0, 0%, 12%)" stroke="hsl(0,0%,100%)" strokeWidth="3" />
            <text x={center} y={center} fill="hsl(356, 93%, 45%)" fontSize="11" fontWeight="800" textAnchor="middle" dominantBaseline="central">
              LOGO
            </text>
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spin}
        disabled={spinning}
        size="lg"
        className="px-12 py-6 text-lg font-bold tracking-wide rounded-full shadow-lg transition-all hover:scale-105 disabled:opacity-60"
      >
        {spinning ? "Çark Dönüyor..." : "ÇARKI ÇEVİR"}
      </Button>

      {/* Result */}
      {result && (
        <div className="animate-in fade-in zoom-in duration-500 bg-card border-2 border-primary rounded-2xl px-10 py-6 text-center shadow-xl">
          <p className="text-muted-foreground text-sm mb-1">Kazandınız!</p>
          <p className="text-3xl font-black text-primary">{result}</p>
          <p className="text-muted-foreground text-xs mt-2">Logo Yazılım çözümlerinde geçerlidir.</p>
        </div>
      )}
    </div>
  );
}
