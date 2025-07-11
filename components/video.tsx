"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

export default function SecureVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    const updateProgress = () => {
      if (video) {
        setProgress((video.currentTime / video.duration) * 100 || 0);
      }
    };

    const updateDuration = () => {
      if (video) setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
  };

  const skipTime = (amount: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(
      Math.max(0, video.currentTime + amount),
      duration
    );
  };

  return (
    <div className="relative w-full mx-auto  rounded-lg overflow-hidden ">
      <video
        ref={videoRef}
        className="w-full"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="h-30 group absolute bottom-0 w-full ">
        <div className="absolute -bottom-20 opacity-0 group-hover:bottom-0 transition-all duration-300 ease-in-out group-hover:opacity-100 w-full  text-white px-4 py-3 flex flex-col backdrop-blur-[2px] gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={seek}
            className="w-full accent-white"
          />
          <div className="flex items-center justify-center gap-14 text-shadow-black">
            <button
              onClick={() => skipTime(-10)}
              title="Back 10s"
              className="flex items-center font-bold gap-2 cursor-pointer"
            >
              -10s
              <FaBackward size={18} />
            </button>
            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              className="cursor-pointer"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button
              onClick={() => skipTime(10)}
              title="Forward 10s "
              className="flex items-center font-bold gap-2 cursor-pointer"
            >
              <FaForward size={18} /> 10s+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
