import Image from "next/image";
import React from "react";
import rectangle_bot from "@/assets/Img/Rectangle_bot.png";

export default function RectangleBottom() {
  return (
    <>
      <Image
        src={rectangle_bot.src}
        width={1110}
        height={741}
        alt="Rectangle"
        className="absolute -bottom-16 -z-10"
      />
    </>
  );
}
