"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

export default function SecureVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

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

  // Show controls on mouse move, hide after 4s
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 4000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      className="relative w-full mx-auto rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full"
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Controls */}
      <div className="h-20 absolute bottom-0 w-full pointer-events-none">
        <div
          className={`transition-all duration-300 ease-in-out w-full text-white px-4 py-3 flex flex-col backdrop-blur-[2px] gap-2
            ${
              showControls
                ? "opacity-100 pointer-events-auto bottom-0  bg-gradient-to-b from-transparent to-black/60"
                : "opacity-0 pointer-events-none -bottom-20"
            }`}
        >
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
              tabIndex={showControls ? 0 : -1}
            >
              -10s
              <FaBackward size={18} />
            </button>
            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              className="cursor-pointer"
              tabIndex={showControls ? 0 : -1}
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button
              onClick={() => skipTime(10)}
              title="Forward 10s "
              className="flex items-center font-bold gap-2 cursor-pointer text-shadow-2xs"
              tabIndex={showControls ? 0 : -1}
            >
              <FaForward size={18} className="" /> 10s+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
