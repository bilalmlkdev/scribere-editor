import { FiGithub } from 'react-icons/fi';
import ExportOptions from '../export/Export';
import Logo from './Logo';
import Themes from './Themes';
import ViewPorts from './ViewPorts';

export default function Navbar({
  targetRef,
  onThemeSelect,
  onViewportChange,
  inputValue,
  canvasBG,
  canvasTextColor,
  canvasTextColorClass,
  canvasFont,
  placeholderColor,
  canvasFontSize,
  canvasTextPadding = 52,
  useCustomColors = false,
  customBgColor = null,
  customTextColor = null,
  textureIntensity,
  lineHeight = 2.0,
  dropCap = false,
  onResetAll,
}) {
  return (
    <nav className="flex items-center justify-between h-12 w-full max-w-full px-4 border-b border-white/20">
      {/* logo */}
      <Logo />

      {/* right side */}
      <div className="flex items-center gap-1.5">
        <ViewPorts onViewportChange={onViewportChange} />
        <Themes onThemeSelect={onThemeSelect} />

        {/* GitHub icon - hidden on screens smaller than 768px */}
        <a
          href="https://github.com/byllzz/glyphic"
          className="hidden md:flex items-center gap-1 bg-gray-100/10 border border-white/5 px-2 py-[7px] rounded-[7px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub />
        </a>

        <button
          onClick={onResetAll}
          className="hidden md:flex items-center gap-1 bg-gray-100/10 border border-white/5 px-2 py-[7px] rounded-[7px] hover:bg-red-500/20 transition-colors"
          title="Reset all settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <span className="h-5 w-[1px] mx-1 bg-white/10 hidden md:flex"></span>
        <ExportOptions
          canvasFontSize={canvasFontSize}
          targetRef={targetRef}
          inputValue={inputValue}
          canvasBG={canvasBG}
          canvasTextColor={canvasTextColor}
          canvasTextColorClass={canvasTextColorClass}
          canvasFont={canvasFont}
          placeholderColor={placeholderColor}
          canvasTextPadding={canvasTextPadding}
          useCustomColors={useCustomColors}
          customBgColor={customBgColor}
          customTextColor={customTextColor}
          textureIntensity={textureIntensity}
          lineHeight={lineHeight}
          dropCap={dropCap}
        />
      </div>
    </nav>
  );
}
