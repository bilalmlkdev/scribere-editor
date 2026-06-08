import React from 'react';
import glyphicLogo from '../assets/glyphicLogo.svg';

export default function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <span>
        <img src={glyphicLogo} alt="glyphic-logo" className="h-5 w-auto" />
      </span>
      <h3 className="font-medium text-[14px] tracking-wide bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
        Glyphic
      </h3>
    </div>
  );
}
