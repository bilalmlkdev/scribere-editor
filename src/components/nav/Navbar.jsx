import { FiGithub } from 'react-icons/fi';
import ExportOptions from './Export/ExportOptions';
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
  canvasTextPadding,
  useCustomColors = false,
  customBgColor = null,
  customTextColor = null,
  textureIntensity,
  lineHeight = 2.0,
  dropCap = false,
}) {
  return (
    <nav className="flex items-center justify-between h-12 w-full max-w-full px-4 border-b border-white/20">
      {/* logo */}
      <Logo />

      {/* right side */}
      <div className="flex items-center gap-1.5">
        <ViewPorts onViewportChange={onViewportChange} />
        <Themes onThemeSelect={onThemeSelect} />
        <a
          href="https://github.com/byllzz/glyphic"
          className="flex items-center gap-1 bg-gray-100/10 border border-white/5 px-2 py-[7px] rounded-[7px] "
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub />
        </a>
        <span className="h-5 w-[1px] mx-1 bg-white/10"></span>
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
