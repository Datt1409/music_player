import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Header() {
  return (
    <div className="my-7 flex flex-row items-center justify-between w-[90%] text-white">
      <AiOutlineDown size={20} />
      <h4 className="font-bold text-base">English Songs</h4>
      <BsThreeDotsVertical size={24} />
    </div>
  );
}
