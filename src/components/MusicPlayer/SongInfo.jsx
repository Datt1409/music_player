import { formatTime } from "@/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Buttons from "./Buttons";
import Image from "next/image";

export default function SongInfo({
  isPlaying,
  setIsPlaying,
  isShuffle,
  setIsShuffle,
  isRepeat,
  setIsRepeat,
  currentIndex,
  setCurrentIndex,
  track,
  songs,
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const audioRef = useRef(null);
  const inputRef = useRef(null);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const onTimeUpdate = () => {
    if (audioRef.current.duration) {
      const progress = Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      inputRef.current.value = progress;
    }
  };

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, audioRef]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleTimeUpdate = () => {
      setCurrentTime(formatTime(audioElement.currentTime));
      const newProgress =
        (audioElement.currentTime / audioElement.duration) * 100;
      setInputValue(newProgress);
    };
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () =>
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleTrackEnded = () => {
      if (isRepeat) {
        audioElement.currentTime = 0;
      } else if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * (songs.length + 1));
        setCurrentIndex(randomIndex);
        audioElement.src = songs[randomIndex].path;
      } else {
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentIndex(nextIndex);
        audioElement.src = songs[nextIndex].path;
      }
      setIsPlaying(true);
      audioElement.play();
    };
    audioElement.addEventListener("ended", handleTrackEnded);

    return () => audioElement.removeEventListener("ended", handleTrackEnded);
  }, [isRepeat, isShuffle, currentIndex, audioRef]);

  return (
    <>
      {/* Img container */}
      <div className="relative w-full flex items-center justify-center z-10 mb-5">
        <div
          className={`relative rounded-full w-[220px] h-[220px] border-8 overflow-hidden border-[#FEA5B024] ${
            isPlaying ? "animation-spin " : "stop-animation-spin"
          }`}
          // style={{ backgroundImage: `url(${track.image})` }}
        >
          <Image
            src={track.image}
            width={220}
            height={220}
            alt="Background"
            className="object-cover"
          />
        </div>
        <div className="w-[200px] h-[166px] overflow-hidden absolute rounded-[60px] bg-[#FEA5B024] -right-6 top-[60px] -rotate-[29.13deg] -z-10"></div>
      </div>

      {/* Info */}
      <div className="flex flex-row justify-between items-center w-[90%] mb-8">
        <div className="flex flex-col">
          <h3 className="text-[30px] font-bold text-white capitalize">
            {track.songName}
          </h3>
          <h4 style={{ color: "rgba(253.94, 165.06, 175.61, 0.5) " }}>
            {track.singer}
          </h4>
        </div>
        <div className="cursor-pointer" onClick={toggleFavourite}>
          {isFavourite ? (
            <AiFillHeart size={36} className="text-[#FEA5B0]" />
          ) : (
            <AiOutlineHeart size={36} className="text-white" />
          )}
        </div>
      </div>

      <div className="flex flex-col w-[90%] mb-5">
        <audio ref={audioRef} onTimeUpdate={onTimeUpdate}>
          <source src={track.path} type="audio/mpeg" />
        </audio>
        <input
          type="range"
          min="1"
          max="100"
          value={inputValue}
          step="1"
          ref={inputRef}
          className="accent-pink-500 cursor-pointer mb-2"
          onChange={(e) => {
            let newInputValue = parseInt(e.target.value);
            const newTime = (newInputValue / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(formatTime(newTime));
            setInputValue(newInputValue);
          }}
        />

        {/* Minutes */}
        <div className="flex flex-row w-full items-center justify-between">
          <p
            className="text-base"
            style={{ color: "rgba(253.94, 165.06, 175.61, 0.50)" }}
          >
            {currentTime}
          </p>
          <p
            className="text-base"
            style={{ color: "rgba(253.94, 165.06, 175.61, 0.50)" }}
          >
            {audioRef.current ? formatTime(audioRef.current.duration) : "--:--"}
          </p>
        </div>
      </div>

      <Buttons
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isShuffle={isShuffle}
        setIsShuffle={setIsShuffle}
        isRepeat={isRepeat}
        setIsRepeat={setIsRepeat}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        audioRef={audioRef}
        songs={songs}
        setInputValue={setInputValue}
      />
    </>
  );
}
