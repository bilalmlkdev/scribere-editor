import { useState, useRef, useEffect } from 'react';

export default function DropCap({ onDropCapChange, currentDropCap = false }) {
  const [dropCap, setDropCap] = useState(currentDropCap);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (currentDropCap !== undefined) {
      setDropCap(currentDropCap);
    }
  }, [currentDropCap]);

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

  const handleDropCapChange = value => {
    setDropCap(value);
    onDropCapChange?.(value);
  };

  // Drop cap style variants
  const variants = [
    { id: 'none', name: 'None', size: 'normal', lines: 0 },
    { id: 'standard', name: 'Standard', size: '3em', lines: 3 },
    { id: 'large', name: 'Large', size: '4.5em', lines: 4 },
    { id: 'huge', name: 'Huge', size: '6em', lines: 5 },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className={`flex items-center gap-1.5 px-[9px] py-[8px] border rounded-[7px] group
          ${
            dropCap && dropCap !== 'none'
              ? 'bg-white border-white/5 text-black'
              : 'bg-gray-100/10 border-white/5 text-white/80'
          }`}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            color="currentColor"
            className=""
          >
            <path
              d="M15 3.5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M15 9.5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3 15.5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3 21.5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3.58579 9.91421C4.17157 10.5 5.11438 10.5 7 10.5C8.88562 10.5 9.82843 10.5 10.4142 9.91421C11 9.32843 11 8.38562 11 6.5C11 4.61438 11 3.67157 10.4142 3.08579C9.82843 2.5 8.88562 2.5 7 2.5C5.11438 2.5 4.17157 2.5 3.58579 3.08579C3 3.67157 3 4.61438 3 6.5C3 8.38562 3 9.32843 3.58579 9.91421Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 left-0 w-[180px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50  transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          <div className="px-3 py-2 border-b border-white/10">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              Drop Cap Style
            </span>
          </div>

          <div className="py-1">
            {variants.map((variant, index) => (
              <button
                key={variant.id}
                onClick={() => handleDropCapChange(variant.id === 'none' ? false : variant.id)}
                className={`w-full flex items-center justify-between px-3 py-2 transition-all duration-150
                  ${
                    dropCap === variant.id || (!dropCap && variant.id === 'none')
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                  ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: isAnimating ? `${index * 50}ms` : '0ms' }}
              >
                <div className="flex flex-col items-start">
                  <span className="text-[12px] font-medium">{variant.name}</span>
                  {variant.lines > 0 && (
                    <span className="text-[9px] text-white/40">{variant.lines} lines</span>
                  )}
                </div>
                {(dropCap === variant.id || (!dropCap && variant.id === 'none')) && (
                  <span className="text-white text-[10px] scale-in">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Preview Example */}
          <div className="border-t border-white/10 mt-1">
            <div className="bg-white/5  p-2">
              <span className="text-[9px] text-white/30 uppercase tracking-wider block mb-1">
                Preview
              </span>
              <div className="text-[11px] text-white/60">
                {dropCap && dropCap !== 'none' ? (
                  <span className="flex items-start gap-1">
                    <span
                      className="font-bold text-white/80 float-left mr-1"
                      style={{
                        fontSize:
                          dropCap === 'standard'
                            ? '1.8em'
                            : dropCap === 'large'
                              ? '2.5em'
                              : '3.2em',
                        lineHeight: '0.8',
                      }}
                    >
                      T
                    </span>
                    <span>he quick brown fox jumps over the lazy dog.</span>
                  </span>
                ) : (
                  <span>The quick brown fox jumps over the lazy dog.</span>
                )}
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
