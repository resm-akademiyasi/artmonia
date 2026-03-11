const BrushStrokes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* Bold diagonal swoosh — top right, orange */}
      <svg
        className="absolute top-[8%] right-0 w-[600px] h-[500px] opacity-[0.12]"
        viewBox="0 0 600 500"
        fill="none"
      >
        <path
          d="M600 0 C520 60, 400 90, 300 180 C200 270, 180 350, 80 420 C40 450, -10 470, -30 500"
          stroke="hsl(33 89% 51%)"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M580 30 C500 80, 420 120, 340 200 C260 280, 200 340, 120 400"
          stroke="hsl(33 89% 51%)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* Left side purple accent sweep */}
      <svg
        className="absolute top-[22%] -left-10 w-[350px] h-[600px] opacity-[0.08]"
        viewBox="0 0 350 600"
        fill="none"
      >
        <path
          d="M0 0 C80 80, 120 160, 100 280 C80 400, 40 480, 0 600"
          stroke="hsl(263 87% 55%)"
          strokeWidth="35"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M30 50 C90 130, 100 200, 80 300"
          stroke="hsl(263 87% 55%)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Mid-page wide horizontal orange swoosh */}
      <svg
        className="absolute top-[42%] -right-20 w-[800px] h-[300px] opacity-[0.10]"
        viewBox="0 0 800 300"
        fill="none"
      >
        <path
          d="M820 250 C700 200, 550 50, 350 80 C150 110, 50 220, -20 180"
          stroke="hsl(33 89% 51%)"
          strokeWidth="45"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* Left diagonal thin accent */}
      <svg
        className="absolute top-[55%] -left-5 w-[250px] h-[500px] opacity-[0.06]"
        viewBox="0 0 250 500"
        fill="none"
      >
        <path
          d="M0 500 C60 380, 180 280, 200 150 C210 80, 190 30, 250 0"
          stroke="hsl(33 89% 51%)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Bottom-right large curl — like logo spiral */}
      <svg
        className="absolute bottom-[8%] right-0 w-[500px] h-[500px] opacity-[0.10]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <path
          d="M500 350 C460 200, 350 100, 200 80 C100 70, 20 120, 10 220 C0 320, 80 400, 180 410"
          stroke="hsl(33 89% 51%)"
          strokeWidth="35"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M180 410 C280 420, 360 370, 380 280 C390 230, 360 190, 310 180"
          stroke="hsl(33 89% 51%)"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* Purple accent near bottom-left */}
      <svg
        className="absolute bottom-[20%] -left-10 w-[400px] h-[350px] opacity-[0.07]"
        viewBox="0 0 400 350"
        fill="none"
      >
        <path
          d="M-20 350 C60 280, 200 250, 280 150 C330 90, 380 30, 400 0"
          stroke="hsl(263 87% 55%)"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default BrushStrokes;
