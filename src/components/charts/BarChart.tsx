/**
 * Dependency-free inline-SVG bar chart with the teal->blue gradient from the
 * benchmark's Grafana widget. Deterministic (no random) so SSR/CSR match.
 */
export function BarChart({
  series,
  height = 96,
  className = '',
}: {
  series: number[];
  height?: number;
  className?: string;
}) {
  if (!series.length) return null;
  const max = Math.max(...series);
  const gap = 2;
  const barWidth = 100 / series.length;
  const gradientId = 'barGradient';
  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      {series.map((v, i) => {
        const h = max > 0 ? (v / max) * (height - 4) : 0;
        return (
          <rect
            key={i}
            x={i * barWidth + gap / 2}
            y={height - h}
            width={barWidth - gap}
            height={h}
            rx={1}
            fill={`url(#${gradientId})`}
          />
        );
      })}
    </svg>
  );
}
