import React from "react";
import {
  AiFillBackward,
  AiFillForward,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiShuffle } from "react-icons/bi";
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
  setInputValue,
  setTrack,
}) {
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

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

  return (
    <>
      <div className="w-[90%] flex flex-row items-center justify-between mb-7">
        <BiShuffle
          size={30}
          className={`${
            isShuffle ? "text-[#FEA5B0]" : "text-white"
          } cursor-pointer`}
          onClick={handleShuffle}
        />
        <AiFillBackward
          size={45}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={handlePlayPrev}
        />
        <div
          className="bg-[#FEA5B0] w-[60px] h-[60px] flex items-center rounded-full cursor-pointer"
          onClick={handlePlay}
        >
          {isPlaying ? (
            <BsFillPauseFill size={36} className="mx-auto" />
          ) : (
            <BsPlayFill size={36} className="mx-auto translate-x-[5%]" />
          )}
        </div>
        <AiFillForward
          size={45}
          className="text-[#FEA5B0] cursor-pointer"
          onClick={handlePlayNext}
        />
        <BsArrowRepeat
          size={30}
          className={`${
            isRepeat ? "text-[#FEA5B0]" : "text-white"
          } cursor-pointer `}
          onClick={handleRepeat}
        />
      </div>

      {/* Social, share buttons */}
      <div className="w-[90%] flex flex-row justify-between items-center text-white text-xl mb-11 cursor-pointer">
        {/* Device button */}
        <TbDevices2 />
        <div className="w-[20%] flex flex-row items-center justify-between">
          <AiOutlineShareAlt />
          <TbPlaylist />
        </div>
      </div>
    </>
  );
}
