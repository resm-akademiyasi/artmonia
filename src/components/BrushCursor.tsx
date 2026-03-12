import { useEffect, useRef, useCallback } from "react";

const BrushCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform = `translate3d(${posRef.current.x - 4}px, ${posRef.current.y - 32}px, 0)`;
    }
  }, []);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updateCursor();
          rafRef.current = 0;
        });
      }
    };

    document.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.removeEventListener("mousemove", move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCursor]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-brush-cursor"
      style={{ willChange: "transform", left: 0, top: 0 }}
    />
  );
};

export default BrushCursor;
