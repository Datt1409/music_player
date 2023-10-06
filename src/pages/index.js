import MusicPlayer from "../components/MusicPlayer";
import RectangleTop from "../components/RectangleTop";
import RectangleBottom from "../components/RectangleBottom";
import { tracks } from "@/utils";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center relative z-10 overflow-hidden`}
    >
      <RectangleTop />
      <MusicPlayer tracks={tracks} />
      <RectangleBottom />
    </main>
  );
}
