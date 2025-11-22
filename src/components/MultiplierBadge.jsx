export default function MultiplierBadge({ count, multiplier }) {
  return (
    <div className={`multiplier-badge multiplier-${count}`}>
      {count} ALPHA{count > 1 ? 'S' : ''} → {multiplier}% ({(multiplier / 100 + 1).toFixed(1)}x)
    </div>
  )
}