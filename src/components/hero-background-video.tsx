"use client";

import { useEffect, useRef } from "react";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      void video.play().catch(() => {
        // Mobile browsers can block autoplay in battery-saving modes.
      });
    };

    playVideo();
    document.addEventListener("visibilitychange", playVideo);
    window.addEventListener("focus", playVideo);

    return () => {
      document.removeEventListener("visibilitychange", playVideo);
      window.removeEventListener("focus", playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label="Infinity Tattoo Studio reel"
      autoPlay
      className="motion-hero-media absolute inset-0 -z-20 size-full object-cover opacity-70"
      loop
      muted
      playsInline
      poster="/media/hero-poster.jpeg"
      preload="auto"
    >
      <source src="/media/video/studio-reel.mp4" type="video/mp4" />
    </video>
  );
}
