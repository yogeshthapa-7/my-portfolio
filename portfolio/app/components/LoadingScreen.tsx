'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400);
        }, 200);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] transition-opacity duration-400"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      {/* 3D rotating outer ring */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40" style={{ perspective: '800px' }}>
        <div
          className="absolute inset-0 rounded-full border-2 border-neutral-800"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'spin3d 4s linear infinite',
            borderTopColor: '#22d3ee',
            borderRightColor: '#a855f7',
          }}
        />
        <div
          className="absolute inset-3 rounded-full border border-neutral-800"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'spin3d 6s linear infinite reverse',
            borderBottomColor: '#6366f1',
            borderLeftColor: '#34d399',
          }}
        />

        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-light tracking-tighter text-neutral-100 font-mono">
            {progress}
            <span className="text-lg text-neutral-500">%</span>
          </span>
        </div>
      </div>

      {/* 3D progress bar track */}
      <div className="mt-10 w-48 sm:w-64 h-2 bg-neutral-900 rounded-full overflow-hidden" style={{ perspective: '600px', transformStyle: 'preserve-3d' }}>
        <div
          className="h-full rounded-full relative"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #22d3ee, #a855f7, #6366f1)',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(20deg)',
            boxShadow: '0 0 20px rgba(34,211,238,0.4), 0 4px 8px rgba(0,0,0,0.6)',
            transition: 'width 0.1s linear',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-600 font-medium">
        Initializing Experience
      </p>

      <style jsx global>{`
        @keyframes spin3d {
          from { transform: rotateX(60deg) rotateZ(0deg); }
          to { transform: rotateX(60deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
}
