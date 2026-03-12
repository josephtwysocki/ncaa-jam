export default function SimulatedScore({
  teamA,
  teamB,
  playersA,
  playersB
}: any) {
  if (!teamA || !teamB) return null

  const base = () => 70 + Math.floor(Math.random() * 20)

  return (
    <div className="score">
      <h2>SIMULATED SCORE</h2>
      <div className="scoreLine">
        {teamA.displayName} {base()} - {base()} {teamB.displayName}
      </div>
    </div>
  )
}