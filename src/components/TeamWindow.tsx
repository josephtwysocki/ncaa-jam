import React from "react";

interface Props {
  team: any;
  players: any[] | null;
  playerNum: 1 | 2;
}

const HEADSHOT_FALLBACK = "/headshots/headshot_filler.png";

export default function TeamWindow({ team, players, playerNum }: Props) {
  const isSelected = !!team && !!players && players.length >= 2;
  const teamClass = playerNum === 1 ? "jamTeamWindow p1Window" : "jamTeamWindow p2Window";

  return (
    <div className={teamClass}>
      {/* TOP SECTION: Portraits and Logo */}
      <div className="jamTeamTopSection">
        {!isSelected ? (
          <div className="jamChallengerPrompt">
            CHALLENGER
            <br />
            NEEDED !
          </div>
        ) : (
          <div className="jamPortraitGroup">
            <HeadshotImage player={players[0]} alt="P1" />
            <div
              className="jamLogoWrapper"
              style={{ "--logo-mask": `url(/logos/${team.id}_logo.png)` } as React.CSSProperties}
            >
              <img
                src={`/logos/${team.id}_logo.png`}
                className="jamTeamLogo"
                alt="Logo"
              />
            </div>
            <HeadshotImage player={players[1]} alt="P2" />
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: Stats or Press Start */}
      <div className="jamTeamBottomSection">
        {!isSelected ? (
          <div className="jamPressStartGroup">
            <div className="jamPressStartBox">
              <span className="jamPressStartText">SELECT TEAM</span>
            </div>
            <div className="jamPressStartBox">
              <span className="jamPressStartText">SELECT TEAM</span>
            </div>
          </div>
        ) : (
          <div className="jamStatsGroup">
            <PlayerStatsPane player={players[0]} />
            <PlayerStatsPane player={players[1]} />
          </div>
        )}
      </div>
    </div>
  );
}

function HeadshotImage({ player, alt }: { player: any; alt: string }) {
  const src =
    player?.headshot && typeof player.headshot === "string" && player.headshot.trim() !== ""
      ? player.headshot
      : HEADSHOT_FALLBACK;

  return (
    <img
      src={src}
      className="jamHeadshot"
      alt={alt}
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.src.endsWith(HEADSHOT_FALLBACK)) {
          target.src = HEADSHOT_FALLBACK;
        }
      }}
    />
  );
}

function PlayerStatsPane({ player }: { player: any }) {
  const stats = player?.stats || {};
  return (
    <div className="jamPlayerPane">
      <div className="jamNameplate">{player?.lastName || "PLAYER"}</div>
      <div className="jamStatsGrid">
        <Stat label="FG%" value={Math.round((stats.fg / 100) * 9)} />
        <Stat label="REB" value={Math.round((stats.reb / 100) * 9)} />
        <Stat label="3P%" value={Math.round((stats.tp / 100) * 9)} />
        <Stat label="AST" value={Math.round((stats.ast / 100) * 9)} />
        <Stat label="FT%" value={Math.round((stats.ft / 100) * 9)} />
        <Stat label="STL" value={Math.round((stats.stl / 100) * 9)} />
        <Stat label="PTS" value={Math.round((stats.pts / 100) * 9)} />
        <Stat label="TO" value={Math.round((stats.to / 100) * 9)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  let colorClass = "stat-white";
  if (value <= 3) colorClass = "stat-red";
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