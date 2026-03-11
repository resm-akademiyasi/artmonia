const BrushStrokes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden="true">

      {/* === TOP ZONE — Right orange diagonal === */}
      <svg
        className="absolute top-[2%] right-0 w-[800px] h-[700px] opacity-[0.32]"
        viewBox="-80 -40 740 600"
        fill="none"
        overflow="visible"
      >
        <path
          d="M600 0 C520 60, 400 90, 300 180 C200 270, 180 350, 80 420 C40 450, 10 470, 0 490"
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

      {/* === Left purple sweep === */}
      <svg
        className="absolute top-[14%] -left-10 w-[450px] h-[600px] opacity-[0.28]"
        viewBox="-40 -40 430 580"
        fill="none"
        overflow="visible"
      >
        <path
          d="M30 10 C100 70, 130 150, 110 250 C90 350, 50 430, 30 500"
          stroke="hsl(263 87% 55%)"
          strokeWidth="55"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M50 50 C110 120, 120 190, 100 270"
          stroke="hsl(263 87% 55%)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* === Right orange arc === */}
      <svg
        className="absolute top-[26%] right-[-2%] w-[700px] h-[500px] opacity-[0.28]"
        viewBox="-40 -40 700 480"
        fill="none"
        overflow="visible"
      >
        <path
          d="M580 50 C470 20, 340 100, 240 200 C140 300, 70 350, 20 380"
          stroke="hsl(33 89% 51%)"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* === Wide horizontal orange swoosh === */}
      <svg
        className="absolute top-[36%] right-0 w-[1000px] h-[400px] opacity-[0.30]"
        viewBox="-50 -50 900 400"
        fill="none"
        overflow="visible"
      >
        <path
          d="M780 250 C660 200, 520 50, 340 80 C160 110, 70 220, 20 180"
          stroke="hsl(33 89% 51%)"
          strokeWidth="75"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === Left purple diagonal === */}
      <svg
        className="absolute top-[43%] -left-10 w-[400px] h-[500px] opacity-[0.25]"
        viewBox="-40 -40 430 530"
        fill="none"
        overflow="visible"
      >
        <path
          d="M20 430 C80 340, 160 270, 230 180 C280 110, 320 50, 350 10"
          stroke="hsl(263 87% 55%)"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === Left diagonal orange accent === */}
      <svg
        className="absolute top-[52%] left-0 w-[350px] h-[600px] opacity-[0.22]"
        viewBox="-20 -20 290 540"
        fill="none"
        overflow="visible"
      >
        <path
          d="M20 480 C70 370, 170 270, 190 150 C200 80, 180 40, 230 10"
          stroke="hsl(33 89% 51%)"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* === Right flowing purple === */}
      <svg
        className="absolute top-[60%] right-0 w-[500px] h-[600px] opacity-[0.24]"
        viewBox="-30 -30 460 560"
        fill="none"
        overflow="visible"
      >
        <path
          d="M380 10 C320 90, 260 170, 200 270 C140 370, 90 430, 30 490"
          stroke="hsl(263 87% 55%)"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M350 50 C300 110, 270 190, 240 280"
          stroke="hsl(263 87% 55%)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* === Wide orange cross sweep === */}
      <svg
        className="absolute top-[70%] left-0 w-[1100px] h-[400px] opacity-[0.26]"
        viewBox="-40 -40 980 380"
        fill="none"
        overflow="visible"
      >
        <path
          d="M20 60 C170 20, 370 250, 550 120 C700 30, 790 180, 880 200"
          stroke="hsl(33 89% 51%)"
          strokeWidth="65"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* === Bottom-left purple accent === */}
      <svg
        className="absolute top-[80%] -left-10 w-[500px] h-[450px] opacity-[0.25]"
        viewBox="-40 -40 480 430"
        fill="none"
        overflow="visible"
      >
        <path
          d="M20 330 C90 270, 210 240, 280 150 C330 90, 370 40, 390 10"
          stroke="hsl(263 87% 55%)"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </svg>

      {/* === Bottom-right spiral curl === */}
      <svg
        className="absolute top-[87%] right-0 w-[650px] h-[650px] opacity-[0.32]"
        viewBox="-40 -40 580 580"
        fill="none"
        overflow="visible"
      >
        <path
          d="M480 340 C440 200, 340 100, 200 80 C100 70, 30 120, 20 220 C10 320, 80 390, 180 400"
          stroke="hsl(33 89% 51%)"
          strokeWidth="65"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M180 400 C280 410, 350 360, 370 280 C380 230, 350 195, 305 185"
          stroke="hsl(33 89% 51%)"
          strokeWidth="35"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* === Bottom orange sweep === */}
      <svg
        className="absolute top-[94%] left-0 w-[800px] h-[400px] opacity-[0.24]"
        viewBox="-40 -40 780 380"
        fill="none"
        overflow="visible"
      >
        <path
          d="M20 270 C130 200, 300 50, 490 100 C600 130, 660 220, 700 270"
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