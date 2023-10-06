import jaykii from "@/assets/SongImg/chieu_hom_ay.jpeg";
import andiez from "@/assets/SongImg/cho_doi_co_dang_so.jpeg";
import kuun from "@/assets/SongImg/tinh_co_yeu_em.jpeg";
import tuanhung from "@/assets/SongImg/gap_doi_yeu_thuong.jpeg";

export const songs = [
  {
    songName: "Chiều hôm ấy",
    singer: "Jaykii",
    path: "/Music/ChieuHomAy-JayKii.mp3",
    image: jaykii.src,
  },
  {
    songName: "Chờ đợi có đáng sợ",
    singer: "Andiez",
    path: "/Music/ChoDoiCoDangSo-Andiez.mp3",
    image: andiez.src,
  },
  {
    songName: "Tình cờ yêu em",
    singer: "Kuun Đức Nam",
    path: "/Music/TinhCoYeuEm-KuunDucNam.mp3",
    image: kuun.src,
  },
  {
    songName: "Gấp đôi yêu thương",
    singer: "Tuấn Hưng",
    path: "/Music/GapDoiYeuThuong-TuanHung.mp3",
    image: tuanhung.src,
  },
];

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};
