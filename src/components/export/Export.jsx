// index.js
import { useState } from 'react';
import { useExportPanel } from '../../hooks/useExportPanel';
import { useExport } from '../../hooks/useExport';
import { ExportPanel } from './ExportPanel';

export default function ExportOptions({
  targetRef,
  inputValue,
  canvasBG,
  canvasTextColor,
  canvasTextColorClass,
  canvasFont,
  placeholderColor,
  canvasTextPadding,
  useCustomColors = false,
  customBgColor = null,
  customTextColor = null,
  textureIntensity,
  lineHeight,
  dropCap = false,
  canvasFontSize,
}) {
  const [quality, setQuality] = useState('Standard');
  const [format, setFormat] = useState('PNG');
  const [overrideColors, setOverrideColors] = useState(null);
  const { isOpen, isAnimating, panelRef, openPanel, closePanel } = useExportPanel();
  const { isExporting, handleExport } = useExport(targetRef, format, quality);

  // Close panel after export
  const onExport = () => {
    handleExport();
    closePanel();
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
  // components/export/Export.jsx (or wherever your main export component is)

  // Inside getDisplayProps, add a safe check:
  const getDisplayProps = () => {
    if (overrideColors) {
      return {
        bgClass: overrideColors.bgColor,
        bgColorValue: overrideColors.bgValue,
        textColorValue: overrideColors.textValue,
        textColorClass: overrideColors.textColor,
        isCustom: overrideColors.id && overrideColors.id !== 'current', // ✅ add guard
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

  return (
    <div className="relative">
      <button
        onClick={openPanel}
        className="flex items-center gap-1.5 px-2 py-1.5 bg-white/80 rounded-[6px] hover:bg-white/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
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
        <span className="text-[12px] font-medium text-black">Export</span>
      </button>

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 z-50 transition-all duration-300 ease-out
              ${isAnimating ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`}
            onClick={closePanel}
          />
          <ExportPanel
            isAnimating={isAnimating}
            panelRef={panelRef}
            closePanel={closePanel}
            quality={quality}
            setQuality={setQuality}
            format={format}
            setFormat={setFormat}
            isExporting={isExporting}
            handleExport={onExport}
            displayProps={displayProps}
            inputValue={inputValue}
            canvasFont={canvasFont}
            placeholderColor={placeholderColor}
            canvasTextPadding={canvasTextPadding}
            lineHeight={lineHeight}
            dropCap={dropCap}
            textureIntensity={textureIntensity}
            canvasFontSize={canvasFontSize}
            currentThemeObj={currentThemeObj}
            setOverrideColors={setOverrideColors}
          />
        </>
      )}
    </div>
  );
}
