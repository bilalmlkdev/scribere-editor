import { useState, useRef, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import * as htmlToImage from 'html-to-image';
import Canvas from './Canvas';
import ThemeOverride from './ThemeOverride';

export default function ExportOptions({
  targetRef,
  inputValue,
  canvasBG,
  canvasTextColor,
  canvasTextColorClass,
  canvasFont,
  placeholderColor,
  canvasFontSize,
  canvasTextPadding,
  // New props for custom colors
  useCustomColors = false,
  customBgColor = null,
  customTextColor = null,
  textureIntensity,
  lineHeight = 2.0,
  dropCap = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quality, setQuality] = useState('Standard');
  const [format, setFormat] = useState('PNG');
  const [overrideColors, setOverrideColors] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const panelRef = useRef(null);

  const qualityMap = {
    Standard: { scale: 2, label: '2x', size: '2160×2160' },
    High: { scale: 3, label: '3x', size: '3240×3240' },
    Ultra: { scale: 4, label: '4x', size: '4320×4320' },
  };

  // Get current theme object for ThemeOverride
  const currentThemeObj = {
    bgColor: canvasBG,
    bgValue:
      customBgColor ||
      (canvasBG === 'bg-white'
        ? '#FFFFFF'
        : canvasBG === 'bg-black'
          ? '#000000'
          : canvasBG === 'bg-gray-900'
            ? '#111827'
            : canvasBG === 'bg-rose-50'
              ? '#FFF1F2'
              : '#0F172A'),
    textColor: canvasTextColorClass,
    textValue: customTextColor || canvasTextColor,
  };

  // Use override colors if available
  const getDisplayProps = () => {
    if (overrideColors) {
      return {
        bgClass: overrideColors.bgColor,
        bgColorValue: overrideColors.bgValue,
        textColorValue: overrideColors.textValue,
        textColorClass: overrideColors.textColor,
        isCustom: overrideColors.id !== 'current',
      };
    }
    return {
      bgClass: canvasBG,
      bgColorValue: customBgColor,
      textColorValue: customTextColor,
      textColorClass: canvasTextColorClass,
      isCustom: useCustomColors,
    };
  };

  const displayProps = getDisplayProps();

  const openPanel = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closePanel = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const downloadFile = (data, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = data;
    link.click();
  };

  const exportAsPNG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    const scale = qualityMap[quality].scale;

    try {
      const originalWidth = targetRef.current.offsetWidth;
      const originalHeight = targetRef.current.offsetHeight;

      const options = {
        quality: 1,
        pixelRatio: scale,
        width: originalWidth * scale,
        height: originalHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${originalWidth}px`,
          height: `${originalHeight}px`,
        },
      };

      const dataUrl = await htmlToImage.toPng(targetRef.current, options);
      const filename = `glyphic-export-${Date.now()}.png`;
      downloadFile(dataUrl, filename);
    } catch (error) {
      console.error('PNG export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsSVG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    try {
      const svgElement = targetRef.current.querySelector('svg');
      if (svgElement) {
        const clonedSvg = svgElement.cloneNode(true);
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(clonedSvg);
        svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
        const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        const filename = `glyphic-export-${Date.now()}.svg`;
        downloadFile(dataUrl, filename);
      } else {
        const dataUrl = await htmlToImage.toSvg(targetRef.current, { quality: 1 });
        downloadFile(dataUrl, `glyphic-export-${Date.now()}.svg`);
      }
    } catch (error) {
      console.error('SVG export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (format === 'PNG') {
      exportAsPNG();
    } else {
      exportAsSVG();
    }
    closePanel();
  };

  return (
    <div className="relative">
      <button
        onClick={openPanel}
        className="flex items-center gap-1.5 px-2 py-1.5 bg-white/80 rounded-[7px] hover:bg-white/90 transition-all duration-200 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-black"
        >
          <path d="M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734" />
          <path
            d="M14 3.00231C13.5299 3 12.0307 3 11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C20.9472 19.2703 20.998 17.147 20.9999 13"
            strokeLinecap="round"
          />
          <path
            d="M17 7.5C17.4915 8.0057 18.7998 10 19.5 10M22 7.5C21.5085 8.0057 20.2002 10 19.5 10M19.5 10V2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[12px] font-medium text-black/90">Export</span>
      </button>

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 z-50 transition-all duration-300 ease-out
              ${isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`}
            onClick={closePanel}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              ref={panelRef}
              className={`w-full max-w-[980px] bg-black border-2 border-gray-200/10 rounded-[12px] shadow-2xl p-5 pointer-events-auto
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

              <div className="grid grid-cols-2 gap-x-5 px-5">
                <div className="flex flex-col items-start">
                  <div className="w-full">
                    <div
                      className={`mb-5 transition-all duration-300 delay-100
                      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                      <h4 className="text-xs font-medium text-white/50 mb-2">Quality</h4>
                      <div className="space-x-1.5 flex items-center justify-between">
                        {Object.entries(qualityMap).map(([key, val]) => (
                          <button
                            key={key}
                            onClick={() => setQuality(key)}
                            className={`w-full flex flex-col items-center justify-between gap-2 px-3 py-2.5 rounded-[5px] transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                              quality === key
                                ? 'bg-white/80 text-black border border-white/20'
                                : 'bg-transparent border border-gray-200/20 hover:bg-white/5'
                            }`}
                          >
                            <span className="text-sm font-medium">{key}</span>
                            <span className="text-xs">
                              {val.label} - {val.size}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`mb-5 transition-all duration-300 delay-150
                      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                      <h4 className="text-xs font-medium text-white/50 mb-2">Theme Override</h4>
                      <ThemeOverride
                        onThemeOverride={setOverrideColors}
                        currentTheme={currentThemeObj}
                      />
                    </div>

                    <div
                      className={`transition-all duration-300 delay-200
                      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                      <h4 className="text-xs font-medium text-white/50 mb-2">Format</h4>
                      <div className="flex gap-2">
                        {['PNG', 'SVG'].map(fmt => (
                          <button
                            key={fmt}
                            onClick={() => setFormat(fmt)}
                            className={`flex-1 py-2 rounded-[5px] text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                              format === fmt
                                ? 'bg-white/80 text-black'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`py-4 border-t w-full border-white/10 flex justify-end mt-4
                    transition-all duration-300 delay-250
                    ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <button
                      onClick={handleExport}
                      disabled={isExporting}
                      className="flex items-center justify-center gap-2 w-full text-center px-5 py-2 bg-white/80 rounded-[5px] hover:bg-white/90 transition-all duration-200 active:scale-95 text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isExporting ? 'Exporting...' : `Export ${format}`}</span>
                    </button>
                  </div>
                </div>

                {/* Preview Box */}
                <div
                  className={`relative bottom-3 left-10 transition-all duration-300 delay-100
                  ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <div className="flex items-center relative right-10">
                    <span className="text-[12px] font-medium text-white/80">Preview</span>
                  </div>

                  <div className="text-center flex items-center justify-center h-[310px] w-[315px]">
                    <Canvas
                      inputValue={inputValue}
                      canvasBgColor={displayProps.isCustom ? displayProps.bgColorValue : null}
                      canvasBgClass={!displayProps.isCustom ? displayProps.bgClass : ''}
                      canvasTextColor={displayProps.textColorValue}
                      canvasTextColorClass={
                        !displayProps.isCustom ? displayProps.textColorClass : ''
                      }
                      canvasFont={canvasFont}
                      placeholderColor={placeholderColor}
                      canvasWidth={280}
                      canvasHeight={280}
                      canvasRadius={0}
                      canvasFontSize={canvasFontSize}
                      canvasTextPadding={canvasTextPadding}
                      lineHeight={lineHeight}
                      dropCap={dropCap}
                      textureIntensity={textureIntensity}
                      useCustomColors={displayProps.isCustom}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
