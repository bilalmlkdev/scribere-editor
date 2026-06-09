import ExportOptions from './ExportOptions';
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
  canvasFontSize = 16,
  canvasTextPadding = 30,
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
        <span className="h-6 w-[1px] mx-1 bg-white/20"></span>
        <ExportOptions
          targetRef={targetRef}
          inputValue={inputValue}
          canvasBG={canvasBG}
          canvasTextColor={canvasTextColor}
          canvasTextColorClass={canvasTextColorClass}
          canvasFont={canvasFont}
          placeholderColor={placeholderColor}
          canvasFontSize={canvasFontSize}
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
