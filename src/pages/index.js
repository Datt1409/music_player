import Image from "next/image";
import MusicPlayer from "../components/MusicPlayer";
import RectangleTop from "../components/RectangleTop";
import RectangleBottom from "../components/RectangleBottom";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center relative z-10 overflow-hidden`}
    >
      <RectangleTop />
      <MusicPlayer />
      <RectangleBottom />
    </main>
  );
}
