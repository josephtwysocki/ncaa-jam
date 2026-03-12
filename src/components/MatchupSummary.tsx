export default function MatchupSummary({
  teamA,
  teamB,
  playersA,
  playersB
}: any) {
  if (!teamA || !teamB) return null

  const avg = (arr: number[]) =>
    Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)

  const avgPtsA = avg(playersA.flatMap((p: any) => p.stats.pts))
  const avgPtsB = avg(playersB.flatMap((p: any) => p.stats.pts))

  const edge =
    avgPtsA > avgPtsB
      ? `${teamA.displayName} scoring edge`
      : `${teamB.displayName} scoring edge`

  return (
    <div className="summary">
      <h2>MATCHUP SUMMARY</h2>
      <p>{edge}</p>
    </div>
  )
}