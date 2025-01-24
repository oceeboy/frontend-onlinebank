import React from "react";

interface WaveProps {
  color?: string;
  height?: string;
}

const Wave: React.FC<WaveProps> = ({ color = "#6C63FF", height = "150px" }) => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height,
        background: `linear-gradient(to bottom, ${color}, ${color})`,
        clipPath:
          'path("M0 87C42 87 42 87 83.7 97.3C125 108 125 108 167 117.3C208.7 126.7 208.7 126.7 250.3 125.3C292 124 292 124 333.7 114.7C375 105.3 375 105.3 416.3 91C458 76.7 458 76.7 500 64C541.7 51.3 541.7 51.3 583 53.3C625 55.3 625 55.3 666.7 72.7C708 90 708 90 750 105.3C791.7 120.7 791.7 120.7 833.3 126.7C875 132.7 875 132.7 917 130.7C958.7 128.7 958.7 128.7 1000 126.7V0H0V87Z")',
      }}
    ></div>
  );
};

export default Wave;
