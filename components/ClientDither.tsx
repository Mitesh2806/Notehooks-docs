"use client";
import React from "react";
import Dither from "./Dither";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ClientDither = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Only render dither in dark mode
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (resolvedTheme !== "dark") return null;

  // Theme-aware colors for dark mode
  const waveColor = [0.11, 0.11, 0.12] as [number, number, number];
  const backgroundColor = [0.0, 0.0, 0.0] as [number, number, number];

  return (
    <div
      className="w-full h-screen fixed left-0 top-0 pointer-events-auto"
      style={{ zIndex: 0, opacity: 0.2 }}
    >
      <Dither
        waveColor={waveColor}
        backgroundColor={backgroundColor}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.15}
        colorNum={3}
        waveAmplitude={0.3}
        waveFrequency={1}
        waveSpeed={0.06}
      />
    </div>
  );
};


export default ClientDither;
