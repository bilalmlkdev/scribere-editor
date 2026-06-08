// components/ThemeOverride.jsx
import { useState, useRef, useEffect } from 'react';
import { IoColorPalette, IoChevronDown } from 'react-icons/io5';
import { FiSun, FiMoon, FiSunset } from 'react-icons/fi';
import { MdOutlineBedtime, MdForest, MdPalette } from 'react-icons/md';
import { GiRose } from 'react-icons/gi';
import { TbWavesElectricity } from 'react-icons/tb';

const themePresets = [
  {
    id: 'current',
    name: 'Current theme',
    icon: <IoColorPalette size={14} />,
    bgColor: null,
    textColor: null,
    bgValue: null,
    textValue: null,
  },
  {
    id: 'light',
    name: 'Light theme',
    icon: <FiSun size={14} />,
    bgColor: 'bg-white',
    bgValue: '#FFFFFF',
    textColor: 'text-gray-900',
    textValue: '#111827',
  },
  {
    id: 'dark',
    name: 'Dark theme',
    icon: <FiMoon size={14} />,
    bgColor: 'bg-gray-900',
    bgValue: '#111827',
    textColor: 'text-gray-100',
    textValue: '#F3F4F6',
  },
  {
    id: 'sepia',
    name: 'Sepia',
    icon: <MdOutlineBedtime size={14} />,
    bgColor: 'bg-amber-50',
    bgValue: '#FFFBEB',
    textColor: 'text-amber-900',
    textValue: '#78350F',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    icon: <MdOutlineBedtime size={14} />,
    bgColor: 'bg-slate-900',
    bgValue: '#0F172A',
    textColor: 'text-slate-200',
    textValue: '#E2E8F0',
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: <MdForest size={14} />,
    bgColor: 'bg-emerald-900',
    bgValue: '#064E3B',
    textColor: 'text-emerald-100',
    textValue: '#D1FAE5',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: <FiSunset size={14} />,
    bgColor: 'bg-orange-900',
    bgValue: '#7C2D12',
    textColor: 'text-orange-100',
    textValue: '#FFEDD5',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: <TbWavesElectricity size={14} />,
    bgColor: 'bg-cyan-900',
    bgValue: '#164E63',
    textColor: 'text-cyan-100',
    textValue: '#CFFAFE',
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    icon: <GiRose size={14} />,
    bgColor: 'bg-rose-50',
    bgValue: '#FFF1F2',
    textColor: 'text-rose-800',
    textValue: '#9F1239',
  },
  {
    id: 'purple',
    name: 'Purple Haze',
    icon: <MdPalette size={14} />,
    bgColor: 'bg-purple-950',
    bgValue: '#3B0764',
    textColor: 'text-purple-200',
    textValue: '#E9D5FF',
  },
];

export default function ThemeOverride({ onThemeOverride, currentTheme }) {
  const [selectedPreset, setSelectedPreset] = useState('current');
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

  const selectedOption = themePresets.find(p => p.id === selectedPreset);

  const handleOptionSelect = preset => {
    setSelectedPreset(preset.id);
    setOpenMenu(false);

    if (preset && preset.id !== 'current') {
      onThemeOverride({
        bgColor: preset.bgColor,
        bgValue: preset.bgValue,
        textColor: preset.textColor,
        textValue: preset.textValue,
      });
    } else if (preset?.id === 'current') {
      onThemeOverride({
        bgColor: currentTheme?.bgColor,
        bgValue: currentTheme?.bgValue,
        textColor: currentTheme?.textColor,
        textValue: currentTheme?.textValue,
      });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="flex items-center gap-2 w-full px-3 py-2 bg-white/5 hover:bg-white/10
                   border border-white/10 hover:border-white/20
                   rounded-lg transition-all duration-200
                   backdrop-blur-sm group"
      >
        <span className="text-white/80 group-hover:text-white transition-colors">
          {selectedOption?.icon || <IoColorPalette size={14} />}
        </span>
        <span className="text-[13px] font-medium text-white/90 flex-1 text-left">
          {selectedOption?.name}
        </span>
        <IoChevronDown
          size={12}
          className={`text-white/50 transition-transform duration-200
                     ${openMenu ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className="absolute bottom-full mb-1 right-0 w-full min-w-[220px]
                       bg-black backdrop-blur-md
                       border border-white/10 rounded-xl
                       shadow-2xl  shadow-black/50
                       overflow-hidden z-50 px-1 py-0.5"
        >
          {/* Header */}

          {/* Options Grid */}
          <div className="max-h-[300px] overflow-y-auto scrollbar-none">
            {themePresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleOptionSelect(preset)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-[8px]

                  ${
                    selectedPreset === preset.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                    ${selectedPreset === preset.id ? 'text-white' : 'text-white/50'}
                    transition-colors
                  `}
                  >
                    {preset.icon}
                  </span>
                  <span className="text-[13px] font-medium">{preset.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Color preview dots */}
                  {preset.bgValue && preset.textValue && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.bgValue }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.textValue }}
                      />
                    </div>
                  )}
                  {selectedPreset === preset.id && (
                    <span className="text-white text-[10px] ml-1">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
