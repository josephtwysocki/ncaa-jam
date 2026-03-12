import PlayerCard from "./PlayerCard"

export default function TeamPanel({ team, players }: any) {
  if (!team) {
    return <div className="teamPanel empty">CHALLENGER NEEDED</div>
  }

  return (
    <div
      className="teamPanel"
      style={{ borderColor: team.primaryColor }}
    >
      <img
        src={`/logos/${team.id}_logo.png`}
        className="teamLogo"
      />

      <div className="players">
        {players?.map((p: any, idx: number) => (
          <PlayerCard key={idx} player={p} />
        ))}
      </div>
    </div>
  )
}