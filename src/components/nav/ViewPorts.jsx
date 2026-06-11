import { useState, useRef, useEffect } from 'react';
import { FaRegSquare, FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa';
import { MdPortrait, MdLandscape } from 'react-icons/md';

export default function ViewPorts({ onViewportChange }) {
  const [option, setOption] = useState('Square');
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
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

  const options = [
    {
      id: 'Square',
      label: 'Square',
      ratio: '1:1',
      width: 530,
      height: 530,
      icon: <FaRegSquare size={15} />,
      preview: '□',
    },
    {
      id: 'Portrait',
      label: 'Portrait',
      ratio: '4:5',
      width: 400,
      height: 500,
      icon: <MdPortrait size={15} />,
      preview: '▯',
    },
    {
      id: 'Landscape',
      label: 'Landscape',
      ratio: '16:9',
      width: 640,
      height: 360,
      icon: <MdLandscape size={15} />,
      preview: '▭',
    },
    {
      id: 'Mobile',
      label: 'Mobile',
      ratio: '9:16',
      width: 360,
      height: 640,
      icon: <FaMobileAlt size={15} />,
      preview: '📱',
    },
    {
      id: 'Tablet',
      label: 'Tablet',
      ratio: '4:3',
      width: 600,
      height: 450,
      icon: <FaTabletAlt size={15} />,
      preview: '📟',
    },
    {
      id: 'Desktop',
      label: 'Desktop',
      ratio: '16:10',
      width: 800,
      height: 500,
      icon: <FaDesktop size={15} />,
      preview: '🖥',
    },
  ];

  const selectedOption = options.find(opt => opt.id === option);

  const handleOptionSelect = opt => {
    setOption(opt.id);
    closeMenu();
    if (onViewportChange) {
      onViewportChange({
        width: opt.width,
        height: opt.height,
        ratio: opt.ratio,
        id: opt.id,
      });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1 px-2 py-[6px] bg-gray-100/10
                   border border-white/5
                   rounded-[7px] group"
      >
        <span className="text-white mr-[1.5px] ">
          {selectedOption?.icon || <FaRegSquare size={16} />}
        </span>
        <span className="text-[12px] font-medium text-white">{option}</span>
        <span className="text-[12px] text-white">({selectedOption?.ratio})</span>
      </button>

      {/* Dropdown Menu with Animations */}
      {openMenu && (
        <div
          ref={dropdownRef}
          className={`absolute top-full mt-1 right-0 min-w-[220px]
                       bg-mauve-950 backdrop-blur-md
                       border border-white/10 rounded-[12px]
                       shadow-2xl shadow-black/50
                       overflow-hidden z-50 px-1 py-1
                       transition-all duration-200 ease-out origin-top-right
                       ${
                         isAnimating
                           ? 'opacity-100 scale-100 translate-y-0'
                           : 'opacity-0 scale-95 -translate-y-2'
                       }`}
        >
          {/* Options with stagger animation */}
          <div>
            {options.map((opt, index) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt)}
                className={`
                  w-full flex items-center justify-between px-3 py-2
                  transition-all duration-150 rounded-[8px] mb-0.5
                  ${
                    option === opt.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                  ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                `}
                style={{
                  transitionDelay: isAnimating ? `${index * 30}ms` : '0ms',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      ${option === opt.id ? 'text-white' : 'text-white/50'}
                      transition-colors duration-200
                    `}
                  >
                    {opt.icon}
                  </span>
                  <span className="text-[12px] font-medium">{opt.label}</span>
                  <span className="text-[10px] text-white/40">({opt.ratio})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-white/30 font-mono">
                    {opt.width}×{opt.height}
                  </span>
                  {option === opt.id && (
                    <span className="text-white text-[10px] transition-all duration-200 scale-in">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* component styles */}
      <style>{`
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
