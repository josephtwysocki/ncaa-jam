import React from "react";

interface Props {
  teamAStats: any;
  teamBStats: any;
}

export default function TeamStatsComparison({ teamAStats, teamBStats }: Props) {
  return (
    <div className="jamTeamStatsContainer">
      {/* Team A Box */}
      <div className="jamTeamStatsBox p1Window">
        {!teamAStats ? (
          <div className="jamStatsPlaceholder">CHALLENGER NEEDED !</div>
        ) : (
          <>
            <StatsSection title="TEAM OFFENSE" stats={teamAStats.offense} oppStats={teamBStats?.offense} />
            <StatsSection title="TEAM DEFENSE" stats={teamAStats.defense} oppStats={teamBStats?.defense} />
          </>
        )}
      </div>

      {/* Team B Box */}
      <div className="jamTeamStatsBox p2Window">
        {!teamBStats ? (
          <div className="jamStatsPlaceholder">CHALLENGER NEEDED !</div>
        ) : (
          <>
            <StatsSection title="TEAM OFFENSE" stats={teamBStats.offense} oppStats={teamAStats?.offense} />
            <StatsSection title="TEAM DEFENSE" stats={teamBStats.defense} oppStats={teamAStats?.defense} />
          </>
        )}
      </div>
    </div>
  );
}

function StatsSection({ title, stats, oppStats }: any) {
  const offenseLabels: Record<string, string> = {
    asm: "SCORING MARGIN",
    ator: "ASSISTS / TO",
    efg: "EFFECTIVE FG",
    epr: "EFF POSSESSIONS",
    fp: "FLOOR PERCENT",
    eff: "OFF EFFICIENCY",
    ppg: "POINTS PER GAME",
    tsp: "TRUE SHOOTING",
  };

  const defenseLabels: Record<string, string> = {
    bp: "SHOT BLOCKING",
    opp_efg: "EFFECTIVE FG",
    opp_epr: "EFF POSSESSIONS",
    opp_fp: "FLOOR PERCENT",
    opp_orp: "OPP OFF REBOUND",
    opp_ppg: "OPP PPG",
    opp_tsp: "OPP TSP",
    spp: "STEALS / POSS",
  };

  const labels = title === "TEAM OFFENSE" ? offenseLabels : defenseLabels;

  return (
    <div className="jamStatsPane">
      <div className="jamStatsHeader">{title}</div>
      {Object.keys(labels).map((key) => {
        const rawVal = stats?.[key];
        const rawOppVal = oppStats?.[key];

        const val =
          rawVal !== undefined && rawVal !== null ? Math.round(rawVal) : null;
        const oppVal =
          rawOppVal !== undefined && rawOppVal !== null
            ? Math.round(rawOppVal)
            : null;

        let color = "stat-white";
        if (val !== null && oppVal !== null) {
          if (val > oppVal) color = "stat-green";
          else if (val < oppVal) color = "stat-red";
        }

        return (
          <div key={key} className="jamStatLine">
            <span className="jamStatLabel">{labels[key]} :</span>
            <span className={`jamStatValue ${color}`}>
              {val !== null ? val : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}