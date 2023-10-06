import React from "react";
import rectangle_top from "@/assets/Img/Rectangle_top.png";
import Image from "next/image";

export default function RectangleTop() {
  return (
    <>
      <Image
        src={rectangle_top.src}
        width={1110}
        height={741}
        alt="Rectangle"
        className="absolute right-24 -top-24 -z-10"
      />
    </>
  );
}
