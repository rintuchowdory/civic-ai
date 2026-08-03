export default function StatCard({
  label,
  value,
  trend,
  index,
}: {
  label: string;
  value: string;
  trend?: string;
  index?: number;
}) {
  return (
    <div
      className="akte-card p-4 animate-fold"
      style={{ animationDelay: `${(index ?? 0) * 70}ms` }}
    >
      <p className="aktenzeichen">{`AZ-${String((index ?? 0) + 1).padStart(2, "0")}/STAT`}</p>
      <p className="font-display text-3xl font-semibold text-paper mt-2">{value}</p>
      <p className="text-xs text-paper/55 mt-1">{label}</p>
      {trend && <p className="text-[11px] text-amtsblau-bright/80 mt-2">{trend}</p>}
    </div>
  );
}
