import { useState, useRef, useEffect } from 'react';
import { TbLineHeight } from 'react-icons/tb';

export default function LineHeight({ onLineHeightChange, currentLineHeight = 2.0 }) {
  const [lineHeight, setLineHeight] = useState(currentLineHeight);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (currentLineHeight) {
      setLineHeight(currentLineHeight);
    }
  }, [currentLineHeight]);

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

  const handleLineHeightChange = value => {
    const newValue = parseFloat(value);
    setLineHeight(newValue);
    onLineHeightChange?.(newValue);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-0.5 px-[6px] py-[5px] bg-gray-100/10 border border-white/5 rounded-[7px] group"
      >
        <TbLineHeight />
        <span className="text-[13px] font-medium text-white/90 ml-1">{lineHeight.toFixed(1)}</span>
      </button>

      {/* Dropdown Menu with Slider */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 right-0 w-[220px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 py-3 px-4 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          {/* Label and Value */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">
              Line Height
            </span>
            <span className="text-[14px] font-medium text-white/90">{lineHeight.toFixed(1)}</span>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min="0.8"
            max="3.0"
            step="0.1"
            value={lineHeight}
            onChange={e => handleLineHeightChange(e.target.value)}
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

          {/* Preset Buttons */}
          <div className="flex items-center justify-between gap-2 mt-3">
            {[1.0, 1.5, 2.0, 2.5, 3.0].map(preset => (
              <button
                key={preset}
                onClick={() => handleLineHeightChange(preset)}
                className={`flex-1 py-1 text-[10px] font-medium rounded-[4px] transition-all duration-200
                  ${
                    lineHeight === preset
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
              >
                {preset.toFixed(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
