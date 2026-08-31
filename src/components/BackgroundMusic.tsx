import { useCallback, useEffect, useRef, useState } from "react";
import musicSrc from "../assets/ed-sheeran-perfect-official-music-video_uP4Lnw04.mp3";

function MusicIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      {muted ? (
        <path
          d="M4 4l16 16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      return true;
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
      return;
    }

    await play();
  }, [isPlaying, pause, play]);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    void play();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [play]);

  useEffect(() => {
    if (!autoplayBlocked || isPlaying) return;

    const resumeOnInteraction = () => {
      void play();
    };

    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
    window.addEventListener("keydown", resumeOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
    };
  }, [autoplayBlocked, isPlaying, play]);

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-label={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-pressed={isPlaying}
      className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-(--invite-text) shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-transform hover:scale-105 active:scale-95"
    >
      <MusicIcon muted={!isPlaying} />
    </button>
  );
}
