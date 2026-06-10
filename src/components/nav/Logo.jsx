// components/nav/Logo.jsx

import { useEffect, useState } from 'react';
import glyphicLogo from '../../../public/glyphicLogo.svg';
import { useViewport } from '../../hooks/useViewport'; // adjust path if needed

export default function Logo() {
  const isMobile = useViewport(); // Use the shared hook instead of custom logic

  return (
    <div className="flex items-center gap-1.5">
      <span>
        <img src={glyphicLogo} alt="glyphic-logo" className="h-5 w-auto" />
      </span>
      <h3
        className={`font-medium text-[13.5px] tracking-wide bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent ${isMobile ? 'hidden' : 'block'}`}
      >
        Glyphic
      </h3>
    </div>
  );
}
