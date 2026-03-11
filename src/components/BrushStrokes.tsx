const BrushStrokes = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Top-left spiral curl — inspired by logo */}
      <svg
        className="absolute -top-10 -left-20 w-[500px] h-[500px] opacity-[0.07]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250 80 C350 80, 420 150, 420 250 C420 350, 350 420, 250 420 C150 420, 80 350, 80 250 C80 180, 120 130, 180 110"
          stroke="hsl(33 89% 51%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M180 110 C220 95, 300 100, 340 160 C380 220, 360 300, 300 340 C240 380, 160 350, 140 280"
          stroke="hsl(33 89% 51%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M140 280 C130 230, 160 180, 220 170 C260 164, 290 190, 290 220"
          stroke="hsl(33 89% 51%)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Right side flowing stroke — runs down the page */}
      <svg
        className="absolute top-[15%] -right-10 w-[200px] h-[1200px] opacity-[0.05]"
        viewBox="0 0 200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 0 C120 100, 40 200, 60 350 C80 500, 180 550, 160 700 C140 850, 30 900, 50 1050 C60 1120, 100 1180, 140 1200"
          stroke="hsl(33 89% 51%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Left side thin accent line */}
      <svg
        className="absolute top-[40%] -left-5 w-[120px] h-[800px] opacity-[0.06]"
        viewBox="0 0 120 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 0 C90 80, 20 180, 50 300 C80 420, 10 520, 40 640 C55 720, 80 780, 70 800"
          stroke="hsl(263 87% 55%)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Mid-page swoosh */}
      <svg
        className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[900px] h-[200px] opacity-[0.04]"
        viewBox="0 0 900 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 150 C100 50, 250 20, 400 80 C550 140, 700 30, 900 100"
          stroke="hsl(33 89% 51%)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Bottom-right curl */}
      <svg
        className="absolute bottom-[10%] right-0 w-[350px] h-[350px] opacity-[0.06]"
        viewBox="0 0 350 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M350 175 C350 80, 270 0, 175 0 C80 0, 0 80, 0 175 C0 230, 30 280, 80 310"
          stroke="hsl(33 89% 51%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 310 C140 350, 250 340, 300 270 C330 230, 310 170, 260 150"
          stroke="hsl(33 89% 51%)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Thin diagonal brush stroke — bottom left */}
      <svg
        className="absolute bottom-[25%] -left-10 w-[300px] h-[400px] opacity-[0.04]"
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 400 C50 300, 150 250, 200 150 C230 80, 280 30, 300 0"
          stroke="hsl(263 87% 55%)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default BrushStrokes;
