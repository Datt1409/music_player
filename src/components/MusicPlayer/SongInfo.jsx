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
  tracks,
  setTrack,
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [timeProgress, setTimeProgress] = useState("00:00");
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
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setTimeProgress(formatTime(audio.currentTime));
      let newProgress;
      if (audio.currentTime / audio.duration) {
        newProgress = (audio.currentTime / audio.duration) * 100;
      }
      setInputValue(newProgress);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const handleTrackEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
      } else if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * (tracks.length + 1));
        console.log(randomIndex);
        setCurrentIndex(randomIndex);
        setTrack(tracks[randomIndex]);
        audio.src = tracks[randomIndex].path;
      } else {
        const nextIndex = (currentIndex + 1) % tracks.length;
        setCurrentIndex(nextIndex);
        setTrack(tracks[nextIndex]);
        audio.src = tracks[nextIndex].path;
      }
      setIsPlaying(true);
      audio.play();
    };
    audio.addEventListener("ended", handleTrackEnded);

    return () => audio.removeEventListener("ended", handleTrackEnded);
  }, [isRepeat, isShuffle, currentIndex, audioRef.current]);

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
          value={inputValue}
          ref={inputRef}
          className="accent-pink-500 cursor-pointer mb-2"
          onChange={(e) => {
            const newTime = (e.target.value / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setTimeProgress(formatTime(newTime));
            setInputValue(e.target.value);
          }}
        />

        {/* Minutes */}
        <div className="flex flex-row w-full items-center justify-between">
          <p
            className="text-base"
            style={{ color: "rgba(253.94, 165.06, 175.61, 0.50)" }}
          >
            {timeProgress}
          </p>
          <p
            className="text-base"
            style={{ color: "rgba(253.94, 165.06, 175.61, 0.50)" }}
          >
            {audioRef.current?.duration
              ? formatTime(audioRef.current.duration)
              : "--:--"}
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
        tracks={tracks}
        setInputValue={setInputValue}
        setTrack={setTrack}
      />
    </>
  );
}
