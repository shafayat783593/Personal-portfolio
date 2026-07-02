"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Ambient cursor-follow glow. Desktop only (auto-disables on touch devices
 * and when the user has reduced motion turned on).
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 250, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 30, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      setHoveringLink(!!target.closest("a, button, [role='button']"));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft trailing glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hoveringLink ? 90 : 60,
          height: hoveringLink ? 90 : 60,
          background:
            "radial-gradient(circle, rgba(157,91,255,0.55) 0%, rgba(157,91,255,0) 70%)",
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
      {/* tight core dot, snaps faster than the glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-violet-400"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
