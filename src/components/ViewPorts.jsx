import React, { useState, useRef, useEffect } from 'react';
import { FaRegSquare, FaMobileAlt, FaTabletAlt, FaDesktop, FaChevronDown } from 'react-icons/fa';
import { MdPortrait, MdLandscape } from 'react-icons/md';

export default function ViewPorts() {
  const [option, setOption] = useState('Square');
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    {
      id: 'Square',
      label: 'Square',
      ratio: '1:1',
      icon: <FaRegSquare size={14} />,
      preview: '□',
    },
    {
      id: 'Portrait',
      label: 'Portrait',
      ratio: '4:5',
      icon: <MdPortrait size={14} />,
      preview: '▯',
    },
    {
      id: 'Landscape',
      label: 'Landscape',
      ratio: '16:9',
      icon: <MdLandscape size={14} />,
      preview: '▭',
    },
    {
      id: 'Mobile',
      label: 'Mobile',
      ratio: '9:16',
      icon: <FaMobileAlt size={12} />,
      preview: '📱',
    },
    {
      id: 'Tablet',
      label: 'Tablet',
      ratio: '4:3',
      icon: <FaTabletAlt size={12} />,
      preview: '📟',
    },
    {
      id: 'Desktop',
      label: 'Desktop',
      ratio: '16:10',
      icon: <FaDesktop size={12} />,
      preview: '🖥',
    },
  ];

  const selectedOption = options.find(opt => opt.id === option);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10
                   border border-white/10 hover:border-white/20
                   rounded-[8px] transition-all duration-200
                   backdrop-blur-sm group"
      >
        <span className="text-white/80 group-hover:text-white transition-colors">
          {selectedOption?.icon || <FaRegSquare size={14} />}
        </span>
        <span className="text-[13px] font-medium text-white/90">{option}</span>
        <span className="text-[11px] text-white/40 font-mono">{selectedOption?.ratio}</span>
        <FaChevronDown
          size={10}
          className={`text-white/50 transition-transform duration-200
                     ${openMenu ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className="absolute top-full mt-2 right-0 min-w-[180px]
                       bg-[#0a0a0f]/90 backdrop-blur-md
                       border border-white/10 rounded-xl
                       shadow-2xl shadow-black/50
                       overflow-hidden z-50
                       animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-white/5">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              Viewport Presets
            </span>
          </div>

          {/* Options */}
          <div className="py-1">
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => {
                  setOption(opt.id);
                  setOpenMenu(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5
                  transition-all duration-150
                  ${
                    option === opt.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                    ${option === opt.id ? 'text-white' : 'text-white/50'}
                    transition-colors
                  `}
                  >
                    {opt.icon}
                  </span>
                  <span className="text-[13px] font-medium">{opt.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/30">{opt.ratio}</span>
                  {option === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white/60" />}
                </div>
              </button>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-3 py-1.5 border-t border-white/5">
            <span className="text-[9px] text-white/25 font-mono">⌘ + K to change</span>
          </div>
        </div>
      )}
    </div>
  );
}
