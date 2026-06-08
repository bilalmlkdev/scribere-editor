import { useState, useRef, useEffect } from 'react';
import { BiPlus, BiDownload } from 'react-icons/bi';
import { FiImage } from 'react-icons/fi';
import * as htmlToImage from 'html-to-image';

export default function ExportOptions({ targetRef }) {
  // targetRef is the ref of the design element to export
  const [isOpen, setIsOpen] = useState(false);
  const [quality, setQuality] = useState('Standard');
  const [format, setFormat] = useState('PNG');
  const [themeOverride, setThemeOverride] = useState('Current theme');
  const [isExporting, setIsExporting] = useState(false);
  const panelRef = useRef(null);

  // Quality multipliers and dimensions
  const qualityMap = {
    Standard: { scale: 2, label: '2x', size: '2160×2160' },
    High: { scale: 3, label: '3x', size: '3240×3240' },
    Ultra: { scale: 4, label: '4x', size: '4320×4320' },
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Helper: download file
  const downloadFile = (data, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = data;
    link.click();
  };

  // Export PNG with scaling
  const exportAsPNG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    const scale = qualityMap[quality].scale;

    try {
      // Get original dimensions
      const originalWidth = targetRef.current.offsetWidth;
      const originalHeight = targetRef.current.offsetHeight;

      // Set scaling options
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

  // Export SVG
  const exportAsSVG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    try {
      // Get SVG string from DOM
      const svgElement = targetRef.current.querySelector('svg');
      if (svgElement) {
        // Clone to avoid modifying original
        const clonedSvg = svgElement.cloneNode(true);
        // Add namespace
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        // Serialize
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(clonedSvg);
        // Add XML declaration
        svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
        // Convert to data URL
        const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        const filename = `glyphic-export-${Date.now()}.svg`;
        downloadFile(dataUrl, filename);
      } else {
        // Fallback: use html-to-image for non-SVG content (but will produce PNG inside SVG wrapper, not ideal)
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
    // Optionally close panel after export
    // setIsOpen(false);
  };

  // Preview text
  const previewText = `Quality: ${quality} • Format: ${format} • Theme: ${themeOverride}`;

  return (
    <div className="relative">
      {/* Export Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-2 py-1.5 bg-white/80 rounded-[7px] "
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

      {/* Export Modal Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={panelRef}
            className="w-full max-w-[980px] bg-black border-2 border-gray-200/10 rounded-[12px] shadow-2xl overflow-hidden p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 mb-3 relative">
              <div>
                <h3 className="text-lg font-semibold text-white/90">Export Image</h3>
                <p className="text-xs text-white/40 mt-0.5">Configure and download your design</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center absolute -top-4 -right-4 justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <BiPlus className="rotate-45 text-white/70 text-xl" />
              </button>
            </div>
            {/* main Content */}
            <div className="grid grid-cols-2 gap-x-5 px-5">
              {/* left side */}
              <div className="flex flex-col items-start">
                <div className="w-full">
                  {/* Quality Section */}
                  <div className="mb-5">
                    <h4 className="text-xs font-medium text-white/50 mb-2">Quality</h4>
                    <div className="space-x-1.5  flex items-center justify-between">
                      {Object.entries(qualityMap).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setQuality(key)}
                          className={`w-full flex flex-col items-center justify-between gap-2 px-3 py-2.5 rounded-[5px] transition-all ${
                            quality === key
                              ? 'bg-white/10 border border-white/20'
                              : 'bg-transparent border border-white/5 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-sm font-medium text-white/80">{key}</span>
                          <span className="text-xs text-white/40">
                            {val.label} - {val.size}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Override */}
                  <div className="mb-5">
                    <h4 className="text-xs font-medium text-white/50  mb-2">Theme Override</h4>
                    <div className="relative">
                      <select
                        value={themeOverride}
                        onChange={e => setThemeOverride(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-white/30 appearance-none cursor-pointer"
                      >
                        <option value="Current theme">Current theme</option>
                        <option value="Light theme">Light theme</option>
                        <option value="Dark theme">Dark theme</option>
                        <option value="Sepia">Sepia</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-3 h-3 text-white/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Format */}
                  <div>
                    <h4 className="text-xs font-medium text-white/50 mb-2">Format</h4>
                    <div className="flex gap-2">
                      {['PNG', 'SVG'].map(fmt => (
                        <button
                          key={fmt}
                          onClick={() => setFormat(fmt)}
                          className={`flex-1 py-2 rounded-[5px] text-sm font-medium transition-all ${
                            format === fmt
                              ? 'bg-white text-black'
                              : 'bg-white/5 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Export Button Footer */}
                <div className="py-4 border-t w-full border-white/10 flex justify-end">
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex items-center justify-center gap-2 w-full text-center px-5 py-2 bg-white rounded-[5px] hover:bg-white/90 transition-all text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BiDownload size={14} />
                    <span>{isExporting ? 'Exporting...' : `Export ${format}`}</span>
                  </button>
                </div>
              </div>

              {/* Preview Box */}
              <div className="relative bottom-3 left-10">
                <div className="flex items-center gap-1 mb-2">
                  <FiImage className="text-white/40 text-sm" />
                  <span className="text-[12px] font-medium text-white/30">Preview</span>
                </div>
                <div className="bg-white/5 p-3 text-center flex items-center justify-center h-[300px] w-[350px]">
                  <p className="text-white/80 text-sm font-mono">{previewText}</p>
                  {/* <p className="text-white/20 text-xs mt-2">hello</p> */}
                </div>
              </div>
            </div>
            {/* end  */}
          </div>
        </div>
      )}
    </div>
  );
}
