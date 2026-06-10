// components/ExportPanel.jsx

import { BiPlus } from 'react-icons/bi';
import { QualitySelector } from './QualitySelector';
import { FormatSelector } from './FormatSelector';
import { ExportButton } from './ExportButton';
import { PreviewBox } from './PreviewBox';
import ThemeOverride from './ThemeOverride'; // adjust path as needed

export const ExportPanel = ({
  isAnimating,
  panelRef,
  closePanel,
  quality,
  setQuality,
  format,
  setFormat,
  isExporting,
  handleExport,
  displayProps,
  inputValue,
  canvasFont,
  placeholderColor,
  canvasTextPadding,
  lineHeight,
  dropCap,
  textureIntensity,
  canvasFontSize,
  currentThemeObj,
  setOverrideColors,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
      <div
        ref={panelRef}
        className={`w-full max-w-[calc(100%-2rem)] md:max-w-[980px] bg-black border-2 border-gray-200/10 rounded-[12px] shadow-2xl p-5 pointer-events-auto
          transition-all duration-300 ease-out
          ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 mb-3 relative
          transition-all duration-300 delay-75
          ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <div>
            <h3 className="text-lg font-semibold text-white/90">Export Image</h3>
            <p className="text-xs text-white/40 mt-0.5">Configure and download your design</p>
          </div>
          <button
            onClick={closePanel}
            className="w-7 h-7 flex items-center absolute -top-4 -right-4 justify-center rounded-lg hover:bg-white/10 transition-colors active:scale-90"
          >
            <BiPlus className="rotate-45 text-white/70 text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 px-5">
          <div className="flex flex-col items-start">
            <div className="w-full">
              <QualitySelector
                quality={quality}
                setQuality={setQuality}
                isAnimating={isAnimating}
              />

              <div
                className={`mb-5 transition-all duration-300 delay-150 hidden md:flex md:flex-col
                ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <h4 className="text-xs font-medium text-white/50 mb-2">Theme Override</h4>
                <ThemeOverride onThemeOverride={setOverrideColors} currentTheme={currentThemeObj} />
              </div>

              <FormatSelector format={format} setFormat={setFormat} isAnimating={isAnimating} />
            </div>

            <ExportButton
              format={format}
              isExporting={isExporting}
              onExport={handleExport}
              isAnimating={isAnimating}
            />
          </div>

          <PreviewBox
            displayProps={displayProps}
            inputValue={inputValue}
            canvasFont={canvasFont}
            placeholderColor={placeholderColor}
            canvasTextPadding={canvasTextPadding}
            lineHeight={lineHeight}
            dropCap={dropCap}
            textureIntensity={textureIntensity}
            canvasFontSize={canvasFontSize}
            isAnimating={isAnimating}
          />
        </div>
      </div>
    </div>
  );
};
