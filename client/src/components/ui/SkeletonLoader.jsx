export const SkeletonLoader = ({ rows = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div
        key={index}
        className="h-12 animate-pulse rounded-lg bg-white/12"
        style={{ width: `${100 - index * 12}%` }}
      />
    ))}
  </div>
)
