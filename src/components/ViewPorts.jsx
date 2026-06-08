import { useState, useRef, useEffect } from 'react';
import { FaRegSquare, FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa';
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
        className="flex items-center gap-1.5 px-2 py-[7px] bg-white/5
                   border border-white/10
                   rounded-[8px] transition-all duration-200
                   backdrop-blur-sm group"
      >
        <span className="text-white/80 group-hover:text-white transition-colors">
          {selectedOption?.icon || <FaRegSquare size={14} />}
        </span>
        <span className="text-[12px] font-medium text-white/90">{option}</span>
        <span className="text-[11px] ">({selectedOption?.ratio})</span>
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className="absolute top-full mt-0.5 right-0 min-w-[180px]
                       bg-mauve-950 backdrop-blur-md
                       border-2 border-gray-200/10 rounded-[12px]
                       shadow-2xl shadow-black/50
                       overflow-hidden z-50 px-1
                       animate-in fade-in slide-in-from-top-10 duration-600"
        >
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
                  w-full flex items-center justify-between px-3 py-1.5
                  transition-all duration-150 rounded-[8px] mb-0.5
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
                  <span className="text-[12px] font-medium">{opt.label}</span>
                  <span className="text-[10px]">({opt.ratio})</span>
                </div>

                <div className="flex items-center gap-2">
                  {option === opt.id && <span className="text-white text-[10px]">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
