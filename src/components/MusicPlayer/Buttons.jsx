import React, { useEffect, useRef, useState } from "react";
import {
  AiFillBackward,
  AiFillForward,
  AiOutlineShareAlt,
  AiFillCaretLeft,
  AiFillCaretRight,
} from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";
import {
  FaVolumeHigh,
  FaVolumeLow,
  FaVolumeXmark,
  FaVolumeOff,
} from "react-icons/fa6";
import { BsArrowRepeat, BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import { TbDevices2, TbPlaylist } from "react-icons/tb";

export default function Buttons({
  isPlaying,
  setIsPlaying,
  isShuffle,
  setIsShuffle,
  isRepeat,
  setIsRepeat,
  currentIndex,
  setCurrentIndex,
  audioRef,
  tracks,
  setTrack,
}) {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };
  console.log("volume", volume);

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handlePlayNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setTrack(tracks[nextIndex]);
    setIsPlaying(true);
    audioRef.current.src = tracks[nextIndex].path;
    audioRef.current.play();
  };
  const handlePlayPrev = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(prevIndex);
    setTrack(tracks[prevIndex]);
    audioRef.current.src = tracks[prevIndex].path;
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const handleSkipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handleOnOffVolume = () => {
    if (!muteVolume) {
      setMuteVolume(true);
      setVolume(0);
    } else {
      setMuteVolume(false);
      setVolume(60);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <>
      <div className="w-[90%] flex flex-row items-center justify-between mb-7">
        <BiShuffle
          size={30}
          className={`${
            isShuffle ? "text-[#FEA5B0]" : "text-white"
          } cursor-pointer`}
          onClick={() => handleShuffle()}
        />
        <AiFillBackward
          size={45}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={() => handlePlayPrev()}
        />
        <AiFillCaretLeft
          size={40}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={() => handleSkipBackward()}
        />
        <div
          className="bg-[#FEA5B0] w-[60px] h-[60px] flex items-center rounded-full cursor-pointer"
          onClick={() => handlePlay()}
        >
          {isPlaying ? (
            <BsFillPauseFill size={36} className="mx-auto" />
          ) : (
            <BsPlayFill size={36} className="mx-auto translate-x-[5%]" />
          )}
        </div>
        <AiFillCaretRight
          size={40}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={() => handleSkipForward()}
        />
        <AiFillForward
          size={45}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={() => handlePlayNext()}
        />
        <BsArrowRepeat
          size={30}
          className={`${
            isRepeat ? "text-[#FEA5B0]" : "text-white"
          } cursor-pointer `}
          onClick={() => handleRepeat()}
        />
      </div>

      {/* Social, share buttons */}
      <div className="w-[90%] flex flex-row justify-between items-center text-white text-xl mb-11 cursor-pointer">
        {/* volume button */}
        <div className="flex flex-row items-center justify-between gap-3">
          <div onClick={() => handleOnOffVolume()}>
            {muteVolume || volume === 0 ? (
              <FaVolumeXmark />
            ) : volume < 50 && volume !== 0 ? (
              <FaVolumeLow />
            ) : (
              <FaVolumeHigh />
            )}
          </div>
          <input
            className="accent-pink-500 cursor-pointer"
            type="range"
            value={volume}
            min={0}
            max={100}
            onChange={(e) => {
              setVolume(Number(e.target.value));
            }}
          />
        </div>
        <div className="w-[20%] flex flex-row items-center justify-between">
          <AiOutlineShareAlt size={24} />
          <TbPlaylist size={24} />
        </div>
      </div>
    </>
  );
}
