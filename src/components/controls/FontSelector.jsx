import { useState, useRef, useEffect } from 'react';
import { TbCaretUpDownFilled } from 'react-icons/tb';
import { fonts } from '../../data/fonts';

export default function FontSelector({ onFontChange, currentFont }) {
  const [selectedFont, setSelectedFont] = useState(() => {
    if (currentFont?.fontFamily) {
      return fonts.find(f => f.fontFamily === currentFont.fontFamily) || fonts[0];
    }
    return fonts[0];
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (currentFont?.fontFamily) {
      const matchedFont = fonts.find(f => f.fontFamily === currentFont.fontFamily);
      if (matchedFont) setSelectedFont(matchedFont);
    }
  }, [currentFont]);

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

  const handleFontSelect = font => {
    setSelectedFont(font);
    closeMenu();
    onFontChange?.(font);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1.5 px-2 py-[6px] bg-gray-100/10 border border-white/5 rounded-[7px] group"
      >
        <span className="text-[12px] font-normal text-white/90 tracking-tight max-w-[100px] truncate">
          {selectedFont?.name || 'Font'}
        </span>
        <span className="text-[10px] font-light text-white/80 ml-3 relative top-[1px]">
          {selectedFont?.category}
        </span>
        <TbCaretUpDownFilled size={14} className="text-white/50" />
      </button>

      {openMenu && (
        <div
          className={`absolute top-full mt-1 left-0 w-[180px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 py-1 px-0.5 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          <div className="max-h-[320px] overflow-y-auto scrollbar-none">
            {fonts.map((font, index) => (
              <button
                key={font.id}
                onClick={() => handleFontSelect(font)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-[8px] transition-all duration-150
                  ${selectedFont?.id === font.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
                  ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: isAnimating ? `${index * 15}ms` : '0ms' }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] font-medium truncate"
                    style={{ fontFamily: font.fontFamily }}
                  >
                    {font.name}
                  </span>
                  <span className="text-[10px] text-white/80">{font.category}</span>
                </div>
                {selectedFont?.id === font.id && (
                  <span className="text-white text-[10px] scale-in">✓</span>
                )}
              </button>
            ))}
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
