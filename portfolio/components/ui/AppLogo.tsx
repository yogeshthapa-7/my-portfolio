'use client';

import React, { memo } from 'react';

interface AppLogoProps {
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  className = '',
  onClick,
}: AppLogoProps) {
  return (
    <>
      <div
        onClick={onClick}
        className={`logo-container cursor-pointer ${className}`}
      >
        <div className="logo-flip">
          {/* Default Front View: Yogesh */}
          <div className="logo-face logo-front">
            <span className="logo-text">Yogesh</span>
          </div>

          {/* Hover Revealed Back View: Thapa */}
          <div className="logo-face logo-back">
            <span className="logo-text-back">Thapa</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-container {
          perspective: 1200px;
          width: 110px; /* Slightly wider to let the luxury typography breathe */
          height: 46px;
        }

        .logo-flip {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 3D horizontal lift and flip effect on hover */
        .logo-container:hover .logo-flip {
          transform: rotateY(180deg) scale(1.06);
        }

        .logo-face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px; /* Sharper, more executive radiuses instead of pill shapes */
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          className: uppercase;
          letter-spacing: 0.18em;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          user-select: none;
        }

        /* FRONT FACE: Matte Cardstock Texturing */
        .logo-front {
          background: #1A1A1E;
          color: #E5E5E5;
          border: 1px solid #2D2D34;
          box-shadow: 
            0 12px 24px -10px rgba(0, 0, 0, 0.8),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.04);
        }

        /* BACK FACE: Deep Tech Charcoal Core */
        .logo-back {
          background: linear-gradient(135deg, #25262C, #111215);
          color: #FFFFFF;
          transform: rotateY(180deg);
          border: 1px solid #3F404A;
          box-shadow: 
            0 12px 28px -8px rgba(0, 0, 0, 0.9),
            inset 0 1px 2px 0 rgba(255, 255, 255, 0.08);
        }

        /* Letterpress debossing typography style */
        .logo-text {
          padding-left: 0.18em; /* Centers text perfectly despite tracking letter-spacing */
          text-shadow: 
            1px 1px 0px rgba(0, 0, 0, 0.8), 
            -0.5px -0.5px 0px rgba(255, 255, 255, 0.05);
        }

        .logo-text-back {
          padding-left: 0.18em;
          text-shadow: 
            0px 2px 4px rgba(0, 0, 0, 0.6),
            0px 0px 10px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
});

export default AppLogo;