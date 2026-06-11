// components/Loader.jsx

import { useEffect, useState, useRef } from 'react';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [fillPercent, setFillPercent] = useState(0);
  const animationFrameRef = useRef();
  const completedRef = useRef(false);

  useEffect(() => {
    const duration = 2400;
    const startTime = performance.now();

    const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const updateCounter = now => {
      const elapsed = now - startTime;
      let progress = Math.min(1, elapsed / duration);
      let eased = easeInOutCubic(progress);
      let targetPercent = eased * 100;

      // Prevent negative values (causes SVG errors)
      if (targetPercent < 0) targetPercent = 0;

      if (targetPercent > 97) {
        const remaining = 100 - 97;
        const extraProgress = (targetPercent - 97) / remaining;
        const verySlow = extraProgress * extraProgress;
        targetPercent = 97 + verySlow * remaining;
      }

      setCount(Math.floor(targetPercent));
      setFillPercent(targetPercent);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setFillPercent(100);
        if (!completedRef.current && onComplete) {
          completedRef.current = true;
          setTimeout(() => onComplete(), 150);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCounter);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  // Ensure width never goes negative – clamp between 0 and 600
  const clipWidth = Math.max(0, Math.min(600, (fillPercent / 100) * 600));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative w-full max-w-[90vw] sm:max-w-[600px]">
        <svg viewBox="0 0 600 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="glyphicClip">
              <rect x="0" y="0" width={clipWidth} height="150" />
            </clipPath>
          </defs>

          <text
            x="300"
            y="75"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontFamily="'Instrument Serif', 'Times New Roman', serif"
            fontSize="96"
            fontStyle="italic"
            fontWeight="400"
            letterSpacing="1"
          >
            glyphic
          </text>

          <text
            x="300"
            y="75"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontFamily="'Instrument Serif', 'Times New Roman', serif"
            fontSize="96"
            fontStyle="italic"
            fontWeight="400"
            letterSpacing="1"
            clipPath="url(#glyphicClip)"
          >
            glyphic
          </text>

          <text
            x="408"
            y="33"
            dominantBaseline="hanging"
            textAnchor="start"
            fill="rgba(255,255,255,0.3)"
            fontFamily="'Instrument Serif', 'Times New Roman', serif"
            fontSize="16"
            fontStyle="italic"
            fontWeight="400"
            letterSpacing="2"
          >
            editor
          </text>

          <text
            x="408"
            y="33"
            dominantBaseline="hanging"
            textAnchor="start"
            fill="white"
            fontFamily="'Instrument Serif', 'Times New Roman', serif"
            fontSize="16"
            fontStyle="italic"
            fontWeight="400"
            letterSpacing="2"
            clipPath="url(#glyphicClip)"
          >
            editor
          </text>
        </svg>
      </div>

      <div className="fixed bottom-6 right-6">
        <span className="font-secondary text-4xl font-medium text-white/70 tracking-wide">
          {count}
        </span>
      </div>
    </div>
  );
}
