import { useRef, useState, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IoColorPalette } from 'react-icons/io5';

export default function Themes() {
  const [themesPanel, setThemesPanel] = useState(false);
  const themesMenu = useRef();

  useEffect(() => {
    const handleOutSideClick = event => {
      if (themesMenu.current && themesMenu.current.contains(event.target)) {
        setThemesPanel(false);
      }
    };

    document.addEventListener('mousedown', handleOutSideClick);
    return () => window.removeEventListener('mousedown', handleOutSideClick);
  }, []);

  return (
    <div className="relative" ref={themesMenu}>
      <button
        className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-2 rounded-[8px]"
        onClick={() => setThemesPanel(true)}
      >
        <IoColorPalette /> <span className="text-[13px] font-medium text-white/90">Themes</span>
      </button>

      {/* themes Panel */}
      {themesPanel && (
        <div className="flex  fixed z-99 inset-0 w-full h-full items-center justify-center bg-black/80 ">
          <div className="w-full max-w-[670px] h-[96%] mx-auto border border-white/10 bg-black rounded-[16px] flex flex-col items-start px-4 py-3 ">
            {/* header */}
            <div className="flex items-center justify-between w-full">
              <h4 className="text-[15px] relative top-1">Choose Theme</h4>
              <button onClick={() => setThemesPanel(false)}>
                <BiPlus className="rotate-44 text-white" />
              </button>
            </div>
            {/* search bar */}
          </div>
        </div>
      )}
    </div>
  );
}
