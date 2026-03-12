interface Props {
  teamId: string | null;
  playerA?: any;
  playerB?: any;
  teamLogo?: string;
  playerNum: 1 | 2;
}

export default function PlayerCard({ teamId, playerA, playerB, teamLogo, playerNum }: Props) {
  const isSelected = !!teamId;
  const teamClass = playerNum === 1 ? "jamTeamWindow p1Window" : "jamTeamWindow p2Window";

  return (
    <div className={teamClass}>
      <div className="jamTeamTopSection">
        {!isSelected ? (
          <div className="jamChallengerPrompt">CHALLENGER NEEDED !</div>
        ) : (
          <div className="jamPortraitGroup">
             <img src={playerA?.headshot} className="jamHeadshot" alt="P1" />
             <div className="jamLogoWrapper">
               <img src={teamLogo} className="jamTeamLogo" alt="Logo" />
             </div>
             <img src={playerB?.headshot} className="jamHeadshot" alt="P2" />
          </div>
        )}
      </div>

      <div className="jamTeamBottomSection">
        {!isSelected ? (
          <div className="jamPressStartGroup">
            <div className="jamPressStartBox">PRESS START</div>
            <div className="jamPressStartBox">PRESS START</div>
          </div>
        ) : (
          <div className="jamStatsGroup">
            <PlayerStatsPane player={playerA} />
            <PlayerStatsPane player={playerB} />
          </div>
        )}
      </div>
    </div>
  );
}

function PlayerStatsPane({ player }: { player: any }) {
  const stats = player?.stats || {};
  return (
    <div className="jamPlayerPane">
      <div className="jamNameplate">{player?.lastName || "PLAYER"}</div>
      <div className="jamStatsGrid">
        {Object.entries(stats).map(([key, val]: [string, any]) => (
          <Stat key={key} label={key.toUpperCase()} value={val} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  let colorClass = "stat-white";
  if (value <= 2) colorClass = "stat-red";
  else if (value >= 8) colorClass = "stat-green";

  return (
    <div className="jamStatLine">
      <span className="jamStatLabel">{label} :</span>
      <span className={`jamStatValue ${colorClass}`}>
        {value?.toString().padStart(2, "0") || "00"}
      </span>
    </div>
  );
}