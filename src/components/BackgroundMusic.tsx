// components/BackgroundMusic.tsx
"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35; // adjust to taste

    const tryPlay = async () => {
      if (hasStartedRef.current) return;
      try {
        await audio.play();
        hasStartedRef.current = true;
      } catch {
        // Autoplay blocked — wait for user interaction
      }
    };

    const startOnInteraction = async () => {
      if (hasStartedRef.current) return;
      try {
        await audio.play();
        hasStartedRef.current = true;
        window.removeEventListener("click", startOnInteraction);
        window.removeEventListener("keydown", startOnInteraction);
      } catch {
        // still blocked, do nothing
      }
    };

    tryPlay();

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      audio.pause();
    };
  }, []);

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/main_theme.mp3" type="audio/mp3" />
    </audio>
  );
}