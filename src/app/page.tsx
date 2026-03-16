"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import Image from "next/image"
import TEAMS_DATA_FILE from "@/data/teams.v4.json"
import PLAYERS_DATA_FILE from "@/data/players.v2.json"
import TEAM_STATS_FILE from "@/data/teamStats.v3.json" 
import TeamSelectRail from "@/components/TeamSelectRail"
import TeamWindow from "@/components/TeamWindow"
import TeamStatsComparison from "@/components/TeamStatsComparison"
import ProjectedFinalScore from "@/components/ProjectedFinalScore";
import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css"

const ROWS_PER_COL = 5; // Fixed 5 rows as per arcade style

export default function Page() {
  const [teamA, setTeamA] = useState<string | null>(null)
  const [teamB, setTeamB] = useState<string | null>(null)
  const [cursorIndex, setCursorIndex] = useState(0)
  const [pickPhase, setPickPhase] = useState<"A" | "B">("A")
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Sort and Pad Teams
  const gridTeams = useMemo(() => {
    const sorted = [...TEAMS_DATA_FILE].sort((a, b) => a.displayName.localeCompare(b.displayName));
    const numCols = Math.max(4, Math.ceil(sorted.length / ROWS_PER_COL));
    const totalSlots = numCols * ROWS_PER_COL;
    
    // Fill remaining slots with null for empty spots
    const padded = [...sorted];
    while (padded.length < totalSlots) {
      padded.push(null as any);
    }
    return padded;
  }, []);

  const teamAData = gridTeams.find(t => t?.id === teamA) || null
  const teamBData = gridTeams.find(t => t?.id === teamB) || null
  const statsA = teamA ? (TEAM_STATS_FILE as any)[teamA] : null
  const statsB = teamB ? (TEAM_STATS_FILE as any)[teamB] : null
  const playersA = teamA ? (PLAYERS_DATA_FILE as any)[teamA] : null
  const playersB = teamB ? (PLAYERS_DATA_FILE as any)[teamB] : null

  const playRazzle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); 
    }
  };

  const selectTeam = (teamId: string) => {
    if (pickPhase === "A") {
      setTeamA(teamId);
      setPickPhase("B");
      playRazzle();
    } else {
      // Prevent selecting the same team for both players
      if (teamId === teamA) return; 
      setTeamB(teamId);
      playRazzle();
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const totalSlots = gridTeams.length;

      if (e.key === "ArrowDown") setCursorIndex(prev => (prev + 1) % totalSlots);
      if (e.key === "ArrowUp") setCursorIndex(prev => (prev - 1 + totalSlots) % totalSlots);
      if (e.key === "ArrowRight") setCursorIndex(prev => Math.min(prev + ROWS_PER_COL, totalSlots - 1));
      if (e.key === "ArrowLeft") setCursorIndex(prev => Math.max(prev - ROWS_PER_COL, 0));
      
      if (e.key === "Enter") {
        const team = gridTeams[cursorIndex];
        if (team) selectTeam(team.id);
      }
      
      if (e.key === "Backspace") {
          if (teamB) { setTeamB(null); setPickPhase("B"); }
          else { setTeamA(null); setPickPhase("A"); }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cursorIndex, gridTeams, pickPhase, teamA, teamB]);

  return (
    <div className="jamScreenContainer">
      <BackgroundMusic />
      {/* SEGMENTED HEADER BAR */}
      <div className="jamHeaderImage">
        <Image
          src="/header_logo.png"
          alt="NCAA Jam"
          width={900}
          height={140}
          priority
          className="jamHeaderLogo"
        />
      </div>
      <audio ref={audioRef} src="/sound_razzle_dazzle.wav" preload="auto" />
      
      
      <TeamSelectRail
        teams={gridTeams}
        cursorIndex={cursorIndex}
        teamAId={teamA}
        teamBId={teamB}
        onCursorChange={setCursorIndex}
        onSelect={selectTeam}
      />

      <div className="jamWindowsWrapper">
        <TeamWindow team={teamAData} players={playersA} playerNum={1} />
        <TeamWindow team={teamBData} players={playersB} playerNum={2} />
      </div>

      <TeamStatsComparison teamAStats={statsA} teamBStats={statsB} />

      {teamA && teamB && (
        <ProjectedFinalScore 
          homeScore={68} 
          awayScore={107} 
        />
      )}
    </div>
  )
}