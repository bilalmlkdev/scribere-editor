import { useState, useRef, useEffect } from 'react';
import { TbCaretUpDownFilled } from 'react-icons/tb';
import { MdOutlineSpaceBar } from 'react-icons/md';
import { RxPadding } from 'react-icons/rx';

export default function Padding({ onPaddingChange, currentPadding = 52 }) {
  const [padding, setPadding] = useState(currentPadding);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (currentPadding !== undefined) {
      setPadding(currentPadding);
    }
  }, [currentPadding]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) closeMenu();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openMenuHandler = () => {
    setOpenMenu(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setOpenMenu(false), 200);
  };

  const toggleMenu = () => {
    if (openMenu) {
      closeMenu();
    } else {
      openMenuHandler();
    }
  };

  const handlePaddingChange = value => {
    const newValue = parseInt(value);
    setPadding(newValue);
    onPaddingChange?.(newValue);
  };

  // Preset padding values
  const presets = [
    { value: 20, label: 'Small', icon: '🟩' },
    { value: 36, label: 'Medium', icon: '🟨' },
    { value: 52, label: 'Large', icon: '🟧' },
    { value: 80, label: 'X-Large', icon: '🟥' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1.5 px-2 py-[7px] bg-white/5 border border-white/10 rounded-[8px] transition-all duration-200 backdrop-blur-sm group hover:bg-white/10 active:scale-95"
      >
        <RxPadding
          size={14}
          className="text-white/80 group-hover:text-white transition-colors mb-[1px]"
        />
        <span className="text-[12px] font-medium text-white/80">Padding</span>
        <span className="text-[12px] font-medium text-white/90 ml-1">{padding}px</span>
        <TbCaretUpDownFilled size={14} className="text-white/50" />
      </button>

      {/* Dropdown Menu with Slider */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 right-0 w-[260px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 py-2.5 px-2.5 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          {/* Label and Value */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">
              Canvas Padding
            </span>
            <span className="text-[14px] font-medium text-white/90">{padding}px</span>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min="0"
            max="120"
            step="2"
            value={padding}
            onChange={e => handlePaddingChange(e.target.value)}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:scale-110"
          />

          {/* Value markers */}
          <div className="flex justify-between px-1 mt-1">
            <span className="text-[8px] text-white/30">0</span>
            <span className="text-[8px] text-white/30">30</span>
            <span className="text-[8px] text-white/30">60</span>
            <span className="text-[8px] text-white/30">90</span>
            <span className="text-[8px] text-white/30">120</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center justify-between gap-2 mt-3">
            {presets.map(preset => (
              <button
                key={preset.value}
                onClick={() => handlePaddingChange(preset.value)}
                className={`flex-1 py-1.5 text-[10px] font-medium rounded-[4px] transition-all duration-200
                  ${
                    padding === preset.value
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span>{preset.icon}</span>
                  <span>{preset.value}px</span>
                </div>
              </button>
            ))}
          </div>

          {/* Visual Preview */}
          <div className="mt-3  border-t border-white/10">
            <div className="bg-white/5 rounded-[6px] p-2">
              <span className="text-[9px] text-white/30 uppercase tracking-wider block mb-1">
                Preview
              </span>
              <div
                className="bg-white/10  relative"
                style={{ padding: `${Math.min(padding, 40)}px` }}
              >
                <div className="h-[2px] bg-white/30 rounded-full w-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] text-white/40">↕︎ {padding}px padding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
