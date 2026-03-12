import { useState, useMemo, useEffect } from "react";
import TeamSelectRail from "./TeamSelectRail";
import PlayerCard from "./PlayerCard";

// Example Mock Data - Replace with your actual data source
const MOCK_TEAMS = [
  {
    id: "spurs",
    displayName: "SAN ANTONIO",
    teamLogo: "/logos/spurs.png",
    players: [
      { lastName: "ROBINSON", headshot: "/players/robinson.png", stats: { fg: 7, reb: 5, tp: 3, ast: 7, ft: 8, stl: 3, pts: 7, to: 9 } },
      { lastName: "RODMAN", headshot: "/players/rodman.png", stats: { fg: 8, reb: 9, tp: 2, ast: 9, ft: 7, stl: 7, pts: 5, to: 4 } }
    ]
  },
  {
    id: "bulls",
    displayName: "CHICAGO",
    teamLogo: "/logos/bulls.png",
    players: [
      { lastName: "PIPPEN", headshot: "/players/pippen.png", stats: { fg: 8, reb: 6, tp: 5, ast: 8, ft: 7, stl: 9, pts: 8, to: 3 } },
      { lastName: "GRANT", headshot: "/players/grant.png", stats: { fg: 7, reb: 9, tp: 1, ast: 4, ft: 6, stl: 5, pts: 6, to: 2 } }
    ]
  },
  // ... add more teams to fill the 16 slots
];

export default function TeamSelectionScreen() {
  const [cursorIndex, setCursorIndex] = useState(0);
  const [teamAId, setTeamAId] = useState<string | null>(null);
  const [teamBId, setTeamBId] = useState<string | null>(null);
  const [pickPhase, setPickPhase] = useState<"A" | "B">("A");

  const sortedTeams = useMemo(() => {
    return [...MOCK_TEAMS].sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, []);

  const selectedTeamA = sortedTeams.find(t => t.id === teamAId);
  const selectedTeamB = sortedTeams.find(t => t.id === teamBId);

  const handleSelect = (teamId: string) => {
    if (pickPhase === "A") {
      setTeamAId(teamId);
      setPickPhase("B");
    } else {
      if (teamId === teamAId) return; // Cannot pick same team
      setTeamBId(teamId);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const COLS = 4;
      if (e.key === "ArrowRight") setCursorIndex(prev => Math.min(prev + 1, 15));
      if (e.key === "ArrowLeft") setCursorIndex(prev => Math.max(prev - 1, 0));
      if (e.key === "ArrowDown") setCursorIndex(prev => Math.min(prev + COLS, 15));
      if (e.key === "ArrowUp") setCursorIndex(prev => Math.max(prev - COLS, 0));
      if (e.key === "Enter") {
        const team = sortedTeams[cursorIndex];
        if (team) handleSelect(team.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cursorIndex, pickPhase, teamAId, sortedTeams]);

  return (
    <div className="jamScreenContainer">
      <h1 className="jamMainTitle">SELECT TEAM</h1>
      
      {/* Top Grid */}
      <TeamSelectRail
        teams={sortedTeams}
        cursorIndex={cursorIndex}
        teamAId={teamAId}
        teamBId={teamBId}
        pickPhase={pickPhase}
        onCursorChange={setCursorIndex}
        onSelect={handleSelect}
      />

      {/* Bottom Windows */}
      <div className="jamWindowsWrapper">
        <PlayerCard 
          teamId={teamAId} 
          playerA={selectedTeamA?.players[0]} 
          playerB={selectedTeamA?.players[1]} 
          teamLogo={selectedTeamA?.teamLogo}
          playerNum={1} 
        />
        <PlayerCard 
          teamId={teamBId} 
          playerA={selectedTeamB?.players[0]} 
          playerB={selectedTeamB?.players[1]} 
          teamLogo={selectedTeamB?.teamLogo}
          playerNum={2} 
        />
      </div>
    </div>
  );
}