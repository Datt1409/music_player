import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./MusicPlayer/Header";
import SongInfo from "./MusicPlayer/SongInfo";
// import ProgressBar from "./MusicPlayer/ProgressBar";
import Buttons from "./MusicPlayer/Buttons";
import Lyrics from "./MusicPlayer/Lyrics";
import { songs } from "@/utils";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const track = useMemo(() => songs[currentIndex], [currentIndex]);

  return (
    <div className="mx-auto relative w-[430px] flex flex-col items-center mt-1 h-[700px] bg-[#430020] rounded-3xl overflow-hidden">
      {/* Header */}
      <Header />

      {/* Song info */}
      <SongInfo
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isShuffle={isShuffle}
        setIsShuffle={setIsShuffle}
        isRepeat={isRepeat}
        setIsRepeat={setIsRepeat}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        songs={songs}
        track={track}
      />

      {/* Buttons */}

      {/* Lyrics */}
      <Lyrics />
    </div>
  );
}
