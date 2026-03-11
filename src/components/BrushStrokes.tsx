const BrushStrokes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden="true">

      {/* === TOP ZONE (0-15%) === */}
      <svg
        className="absolute top-[2%] right-0 w-[800px] h-[700px] opacity-[0.32]"
        viewBox="0 0 600 500"
        fill="none"
      >
        <path
          d="M600 0 C520 60, 400 90, 300 180 C200 270, 180 350, 80 420 C40 450, -10 470, -30 500"
          stroke="hsl(33 89% 51%)"
          strokeWidth="70"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M580 30 C500 80, 420 120, 340 200 C260 280, 200 340, 120 400"
          stroke="hsl(33 89% 51%)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* === ZONE 15-25% — Left purple sweep === */}
      <svg
        className="absolute top-[14%] -left-10 w-[450px] h-[600px] opacity-[0.28]"
        viewBox="0 0 350 500"
        fill="none"
      >
        <path
          d="M0 0 C80 60, 120 140, 100 240 C80 340, 40 420, 0 500"
          stroke="hsl(263 87% 55%)"
          strokeWidth="55"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M30 40 C90 110, 100 180, 80 260"
          stroke="hsl(263 87% 55%)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* === ZONE 25-35% — Right orange arc === */}
      <svg
        className="absolute top-[26%] right-[-2%] w-[700px] h-[500px] opacity-[0.28]"
        viewBox="0 0 600 400"
        fill="none"
      >
        <path
          d="M620 50 C500 20, 350 100, 250 200 C150 300, 80 350, -10 380"
          stroke="hsl(33 89% 51%)"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* === ZONE 35-45% — Wide horizontal orange swoosh === */}
      <svg
        className="absolute top-[36%] -right-20 w-[1000px] h-[400px] opacity-[0.30]"
        viewBox="0 0 800 300"
        fill="none"
      >
        <path
          d="M820 250 C700 200, 550 50, 350 80 C150 110, 50 220, -20 180"
          stroke="hsl(33 89% 51%)"
          strokeWidth="75"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === ZONE 42-52% — Left purple diagonal === */}
      <svg
        className="absolute top-[43%] -left-10 w-[400px] h-[500px] opacity-[0.25]"
        viewBox="0 0 350 450"
        fill="none"
      >
        <path
          d="M-20 450 C50 350, 150 280, 220 180 C270 110, 320 40, 350 0"
          stroke="hsl(263 87% 55%)"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === ZONE 50-60% — Left diagonal orange accent === */}
      <svg
        className="absolute top-[52%] -left-5 w-[350px] h-[600px] opacity-[0.22]"
        viewBox="0 0 250 500"
        fill="none"
      >
        <path
          d="M0 500 C60 380, 180 280, 200 150 C210 80, 190 30, 250 0"
          stroke="hsl(33 89% 51%)"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* === ZONE 58-68% — Right flowing purple === */}
      <svg
        className="absolute top-[60%] right-0 w-[500px] h-[600px] opacity-[0.24]"
        viewBox="0 0 400 500"
        fill="none"
      >
        <path
          d="M420 0 C350 80, 280 160, 220 260 C160 360, 100 420, 20 500"
          stroke="hsl(263 87% 55%)"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M380 40 C330 100, 300 180, 260 280"
          stroke="hsl(263 87% 55%)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* === ZONE 68-78% — Wide orange cross sweep === */}
      <svg
        className="absolute top-[70%] left-[-5%] w-[1100px] h-[400px] opacity-[0.26]"
        viewBox="0 0 900 300"
        fill="none"
      >
        <path
          d="M-20 60 C150 20, 350 250, 550 120 C700 30, 800 180, 920 200"
          stroke="hsl(33 89% 51%)"
          strokeWidth="65"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* === ZONE 78-88% — Bottom-left purple accent === */}
      <svg
        className="absolute top-[80%] -left-10 w-[500px] h-[450px] opacity-[0.25]"
        viewBox="0 0 400 350"
        fill="none"
      >
        <path
          d="M-20 350 C60 280, 200 250, 280 150 C330 90, 380 30, 400 0"
          stroke="hsl(263 87% 55%)"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === ZONE 85-95% — Bottom-right spiral curl === */}
      <svg
        className="absolute top-[87%] right-0 w-[650px] h-[650px] opacity-[0.32]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <path
          d="M500 350 C460 200, 350 100, 200 80 C100 70, 20 120, 10 220 C0 320, 80 400, 180 410"
          stroke="hsl(33 89% 51%)"
          strokeWidth="65"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M180 410 C280 420, 360 370, 380 280 C390 230, 360 190, 310 180"
          stroke="hsl(33 89% 51%)"
          strokeWidth="35"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* === ZONE 93-100% — Bottom orange sweep === */}
      <svg
        className="absolute top-[94%] left-0 w-[800px] h-[400px] opacity-[0.24]"
        viewBox="0 0 700 300"
        fill="none"
      >
        <path
          d="M-20 280 C100 200, 300 50, 500 100 C620 130, 680 220, 720 280"
          stroke="hsl(33 89% 51%)"
          strokeWidth="55"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default BrushStrokes;