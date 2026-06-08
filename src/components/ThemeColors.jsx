import { useState, useRef, useEffect } from 'react';
import { TbCaretUpDownFilled } from 'react-icons/tb';
import { IoColorPalette } from 'react-icons/io5';
import { FaRandom } from 'react-icons/fa';

const presetColors = [
  // Dark themes
  { bg: '#0f3460', text: '#e0e0e0', name: 'Dark Blue' },
  { bg: '#1a1a2e', text: '#e0e0e0', name: 'Dark Purple' },
  { bg: '#0d1117', text: '#c9d1d9', name: 'GitHub Dark' },
  { bg: '#2d2d2d', text: '#f8f8f2', name: 'Monokai' },
  { bg: '#1e1e2e', text: '#cdd6f4', name: 'Catppuccin' },
  { bg: '#0a0a0a', text: '#00ff00', name: 'Terminal Green' },
  { bg: '#1a1b26', text: '#9ece6a', name: 'Tokyo Night' },
  { bg: '#282c34', text: '#abb2bf', name: 'One Dark' },

  // Light themes
  { bg: '#ffffff', text: '#1a1a1a', name: 'Pure Light' },
  { bg: '#f5f5f5', text: '#333333', name: 'Soft Gray' },
  { bg: '#fef3c7', text: '#78350f', name: 'Warm Sepia' },
  { bg: '#e8f4f8', text: '#2c3e50', name: 'Ocean Breeze' },
  { bg: '#fce4ec', text: '#880e4f', name: 'Rose Pink' },
  { bg: '#e8eaf6', text: '#1a237e', name: 'Indigo Mist' },

  // Vibrant themes
  { bg: '#2ecc71', text: '#ffffff', name: 'Fresh Green' },
  { bg: '#e74c3c', text: '#ffffff', name: 'Vibrant Red' },
  { bg: '#3498db', text: '#ffffff', name: 'Bright Blue' },
  { bg: '#f39c12', text: '#ffffff', name: 'Warm Orange' },
  { bg: '#9b59b6', text: '#ffffff', name: 'Deep Purple' },
  { bg: '#1abc9c', text: '#ffffff', name: 'Turquoise' },

  // Pastel themes
  { bg: '#ffd1dc', text: '#5c2e4f', name: 'Pastel Pink' },
  { bg: '#c9e4de', text: '#2b4f3b', name: 'Pastel Mint' },
  { bg: '#fff4e6', text: '#8b4513', name: 'Pastel Cream' },
  { bg: '#d4e6f1', text: '#1a5276', name: 'Pastel Blue' },
  { bg: '#f5e6f7', text: '#6c3483', name: 'Pastel Lavender' },
];

// Paper texture intensities
const textureIntensities = [
  { value: 0, label: '0%', name: 'None' },
  { value: 25, label: '25%', name: 'Subtle' },
  { value: 50, label: '50%', name: 'Medium' },
  { value: 65, label: '65%', name: 'Strong' },
  { value: 75, label: '75%', name: 'Very Strong' },
  { value: 100, label: '100%', name: 'Maximum' },
];

export default function ThemeColors({
  onThemeChange,
  currentBg = '#0f3460',
  currentText = '#e0e0e0',
  onTextureChange,
  currentTexture = 65,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgColor, setBgColor] = useState(currentBg);
  const [textColor, setTextColor] = useState(currentText);
  const [textureIntensity, setTextureIntensity] = useState(currentTexture);
  const [activeTab, setActiveTab] = useState('colors'); // colors, presets
  const menuRef = useRef(null);

  useEffect(() => {
    setBgColor(currentBg);
    setTextColor(currentText);
  }, [currentBg, currentText]);

  useEffect(() => {
    setTextureIntensity(currentTexture);
  }, [currentTexture]);

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

  const handleBgColorChange = e => {
    const newColor = e.target.value;
    setBgColor(newColor);
    onThemeChange?.({ bg: newColor, text: textColor });
  };

  const handleTextColorChange = e => {
    const newColor = e.target.value;
    setTextColor(newColor);
    onThemeChange?.({ bg: bgColor, text: newColor });
  };

  const handleTextureChange = e => {
    const newValue = parseInt(e.target.value);
    setTextureIntensity(newValue);
    onTextureChange?.(newValue);
  };

  const handlePresetSelect = preset => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    onThemeChange?.({ bg: preset.bg, text: preset.text });
  };

  const handleRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * presetColors.length);
    const randomPreset = presetColors[randomIndex];
    setBgColor(randomPreset.bg);
    setTextColor(randomPreset.text);
    onThemeChange?.({ bg: randomPreset.bg, text: randomPreset.text });
  };

  const isDarkBg = hex => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1.5 px-2 py-[7px] bg-white/5 border border-white/10 rounded-[8px] transition-all duration-200 backdrop-blur-sm group hover:bg-white/10 active:scale-95"
      >
        <IoColorPalette
          size={14}
          className="text-white/80 group-hover:text-white transition-colors"
        />
        <span className="text-[12px] font-medium text-white/80">Theme Colors</span>
        <div
          className="w-3 h-3 rounded-full border border-white/30"
          style={{ backgroundColor: bgColor }}
        />
        <TbCaretUpDownFilled size={14} className="text-white/50" />
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 right-0 w-[360px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          {/* Header with Random Button */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              Theme Colors
            </span>
            <button
              onClick={handleRandomTheme}
              className="flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded-[4px] hover:bg-white/20 transition-all duration-200 active:scale-95"
              title="Random theme"
            >
              <FaRandom size={10} className="text-white/60" />
              <span className="text-[9px] text-white/60">Random</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('colors')}
              className={`flex-1 py-1.5 text-[10px] font-medium transition-all duration-150
                ${
                  activeTab === 'colors'
                    ? 'text-white border-b-2 border-white/50'
                    : 'text-white/40 hover:text-white/60'
                }`}
            >
              Colors
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 text-[10px] font-medium transition-all duration-150
                ${
                  activeTab === 'presets'
                    ? 'text-white border-b-2 border-white/50'
                    : 'text-white/40 hover:text-white/60'
                }`}
            >
              Presets
            </button>
          </div>

          <div className="p-3">
            {activeTab === 'colors' ? (
              <>
                {/* Background Color */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-white/60">Background</span>
                    <span className="text-[10px] font-mono text-white/40">{bgColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={handleBgColorChange}
                      className="w-10 h-8 rounded-[6px] cursor-pointer bg-transparent border border-white/20"
                    />
                    <div
                      className="flex-1 h-8 rounded-[6px] border border-white/20"
                      style={{ backgroundColor: bgColor }}
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-white/60">Text</span>
                    <span className="text-[10px] font-mono text-white/40">{textColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={handleTextColorChange}
                      className="w-10 h-8 rounded-[6px] cursor-pointer bg-transparent border border-white/20"
                    />
                    <div
                      className="flex-1 h-8 rounded-[6px] border border-white/20 flex items-center justify-center"
                      style={{ backgroundColor: textColor }}
                    >
                      <span
                        className="text-[10px]"
                        style={{ color: isDarkBg(textColor) ? '#fff' : '#000' }}
                      >
                        Aa
                      </span>
                    </div>
                  </div>
                </div>

                {/* Paper Texture */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-white/60">Paper Texture</span>
                    <span className="text-[10px] font-mono text-white/40">{textureIntensity}%</span>
                  </div>

                  {/* Texture Intensity Slider */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={textureIntensity}
                      onChange={handleTextureChange}
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
                    <div className="flex justify-between mt-1">
                      <span className="text-[8px] text-white/30">0%</span>
                      <span className="text-[8px] text-white/30">25%</span>
                      <span className="text-[8px] text-white/30">50%</span>
                      <span className="text-[8px] text-white/30">75%</span>
                      <span className="text-[8px] text-white/30">100%</span>
                    </div>
                  </div>

                  {/* Texture Preview */}
                  <div
                    className="h-12 rounded-[6px] border border-white/20 relative overflow-hidden"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${textColor}20 0px, ${textColor}20 2px, transparent 2px, transparent 8px)`,
                        opacity: textureIntensity / 100,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] text-white/50">Texture Preview</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Presets Grid
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-2">
                  {presetColors.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetSelect(preset)}
                      className={`flex items-center gap-2 p-2 rounded-[6px] transition-all duration-150
                        hover:bg-white/10 active:scale-95
                        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: isAnimating ? `${index * 20}ms` : '0ms' }}
                    >
                      <div className="flex flex-col">
                        <div className="flex gap-0.5">
                          <div
                            className="w-5 h-5 rounded-l-[4px] border border-white/20"
                            style={{ backgroundColor: preset.bg }}
                          />
                          <div
                            className="w-5 h-5 rounded-r-[4px] border border-white/20 flex items-center justify-center"
                            style={{ backgroundColor: preset.text }}
                          >
                            <span
                              className="text-[6px]"
                              style={{ color: isDarkBg(preset.text) ? '#fff' : '#000' }}
                            >
                              A
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] text-white/50 text-left mt-0.5">
                          {preset.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Current Theme Preview */}
          <div className="px-3 py-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[8px] text-white/30">Current</span>
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: bgColor }}
              />
              <span className="text-[9px] text-white/40">→</span>
              <div
                className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center"
                style={{ backgroundColor: textColor }}
              >
                <span
                  className="text-[6px]"
                  style={{ color: isDarkBg(textColor) ? '#fff' : '#000' }}
                >
                  A
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
