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

    let isVisible = true;

    const playVideo = () => {
      if (document.hidden || !isVisible) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // Mobile browsers can block autoplay in battery-saving modes.
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      playVideo();
    });
    observer.observe(video);

    playVideo();
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      document.removeEventListener("visibilitychange", playVideo);
      observer.disconnect();
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
      preload="metadata"
    >
      <source src="/media/video/studio-reel.mp4" type="video/mp4" />
    </video>
  );
}
