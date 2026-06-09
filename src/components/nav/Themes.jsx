import { useRef, useState, useEffect } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import { IoColorPalette } from 'react-icons/io5';
import { themes } from '../../data/themes';

export default function Themes({ onThemeSelect }) {
  const [themesPanel, setThemesPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const themesMenu = useRef();
  const panelRef = useRef();

  useEffect(() => {
    const handleOutSideClick = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };

    document.addEventListener('mousedown', handleOutSideClick);
    return () => document.removeEventListener('mousedown', handleOutSideClick);
  }, []);

  const openPanel = () => {
    setThemesPanel(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closePanel = () => {
    setIsAnimating(false);
    setTimeout(() => setThemesPanel(false), 300);
  };

  const filteredThemes = themes.filter(theme =>
    theme.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative" ref={themesMenu}>
      <button
        className="flex items-center gap-1 bg-gray-100/10 border border-white/5 px-2 py-[6px] rounded-[7px] "
        onClick={openPanel}
      >
        <IoColorPalette size={14} className="text-white/80" />
        <span className="text-[12px] font-medium text-white">Themes</span>
      </button>

      {/* Themes Panel Modal with Animations */}
      {themesPanel && (
        <>
          {/* Backdrop with fade animation */}
          <div
            className={`fixed inset-0 z-50 transition-all duration-300 ease-out
              ${isAnimating ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`}
            onClick={closePanel}
          />

          {/* Modal Container with scale + fade animation */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              ref={panelRef}
              className={`w-full max-w-[660px] h-[95%] mx-auto bg-black/90 border-2 border-gray-200/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl pointer-events-auto
                transition-all duration-300 ease-out
                ${
                  isAnimating
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-4'
                }`}
            >
              {/* Header with slide down animation */}
              <div
                className={`flex items-center justify-between px-4 pb-2 pt-4 relative
                  transition-all duration-300 delay-75
                  ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              >
                <h4 className="text-[14px] font-semibold text-white/90">Choose Theme</h4>
                <button
                  onClick={closePanel}
                  className="w-7 h-7 flex items-center justify-center absolute top-1 right-1 rounded-lg hover:bg-white/10 transition-colors active:scale-90"
                >
                  <BiPlus className="rotate-45 text-white/70 text-xl" />
                </button>
              </div>

              {/* Search Bar with fade animation */}
              <div
                className={`px-3 py-3 transition-all duration-300 delay-100
                  ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              >
                <div className="relative">
                  <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  <input
                    type="text"
                    placeholder="Search themes..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-[8px] py-2.5 pl-9 pr-4 text-[13px] text-white/80 placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Themes Count with fade animation */}
              <div
                className={`px-5 transition-all duration-300 delay-150
                  ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="text-[12px] text-white/80">
                  {filteredThemes.length} themes available
                </span>
              </div>

              {/* Themes List - Scrollable with stagger animation */}
              <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar mb-4">
                <div className="grid grid-cols-2 gap-3">
                  {filteredThemes.map((theme, index) => (
                    <button
                      key={theme.id}
                      className={`w-full h-33 text-left rounded-[8px] ${theme.bgColor}
                        transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                      }}
                      onClick={() => {
                        onThemeSelect(theme);
                        closePanel();
                      }}
                    >
                      {/* Live Preview of the theme */}
                      <div className={`p-3 ${theme.bgColor} rounded-[8px]`}>
                        <div
                          className={`flex flex-col gap-2 ${theme.textColor} max-w-[80%] mx-auto relative`}
                        >
                          {/* Theme Name with actual font */}
                          <span className={`text-[10px] font-semibold transition-all duration-200`}>
                            {theme.name}
                          </span>

                          {/* Preview text with actual font and color */}
                          <p
                            className={`text-[13px] ${theme.fontFamily} leading-relaxed opacity-90`}
                          >
                            {theme.preview}
                          </p>

                          {/* Small indicator of what changes */}
                          <div className="flex gap-2 absolute -bottom-6">
                            <span className="text-[8px] opacity-50 uppercase tracking-wider">
                              BG
                            </span>
                            <div
                              className={`w-3 h-3 rounded-full ${theme.bgColor} border border-white/20 transition-all duration-200`}
                              style={{ backgroundColor: theme.bgValue }}
                            />
                            <span className="text-[8px] opacity-50 uppercase tracking-wider ml-1">
                              Text
                            </span>
                            <div
                              className="w-3 h-3 rounded-full border border-white/20 transition-all duration-200"
                              style={{ backgroundColor: theme.textValue }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Scrollbar Styles */}
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
