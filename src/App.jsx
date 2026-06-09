import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import CanvasControls from './components/CanvasControls';
import Canvas from './components/Canvas';
import TextToolbar from './components/TextToolbar';
import { themes } from './data/themes';
import { fonts, defaultFont } from './data/fonts';

const DEFAULT_FONT_SIZE = 17;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 530, height: 530, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(2.0);
  const [toolbarFontSize, setToolbarFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasFontSize, setCanvasFontSize] = useState(DEFAULT_FONT_SIZE);

  // Mobile tab state
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' or 'preview'
  const [isMobile, setIsMobile] = useState(false);

  // Custom theme colors state
  const [customBgColor, setCustomBgColor] = useState('#0f3460');
  const [customTextColor, setCustomTextColor] = useState('#e0e0e0');
  const [textureIntensity, setTextureIntensity] = useState(0);
  const [useCustomColors, setUseCustomColors] = useState(false);

  // Check screen size for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Derived values
  const useCustom = useCustomColors;
  const canvasBgColor = useCustom ? customBgColor : null;
  const canvasTextColorValue = useCustom ? customTextColor : currentTheme.textValue;
  const canvasBgClass = !useCustom ? currentTheme.bgColor : '';
  const canvasTextColorClass = !useCustom ? currentTheme.textColor : '';
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

  // Refs
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);

  const handleCanvasColors = theme => {
    setCurrentTheme(theme);
    setUseCustomColors(false);
  };

  const handleThemeColorsChange = ({ bg, text }) => {
    setCustomBgColor(bg);
    setCustomTextColor(text);
    setUseCustomColors(true);
  };

  const handleTextureChange = intensity => {
    setTextureIntensity(intensity);
  };

  const handleViewportChange = size => {
    setViewportSize(size);
  };

  const handleFontChange = font => {
    setSelectedFont(font);
  };

  const handleLineHeightChange = value => {
    setLineHeight(value);
  };

  const [dropCap, setDropCap] = useState(false);

  const handleDropCapChange = value => {
    setDropCap(value);
  };

  const [canvasTextPadding, setCanvasTextPadding] = useState(52);

  const handlePaddingChange = value => {
    setCanvasTextPadding(value);
  };

  const handleKaomojiInsert = emoji => {
    setInputValue(prev => prev + emoji);
  };

  const handleDecorationInsert = symbol => {
    setInputValue(prev => prev + symbol);
  };

  const handleToolbarFontSizeChange = size => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    setToolbarFontSize(numSize);
    setCanvasFontSize(numSize);
  };

  // Calculate responsive canvas size
  const getCanvasSize = () => {
    if (isMobile) {
      return {
        width: Math.min(viewportSize.width, 350),
        height: Math.min(viewportSize.height, 350),
      };
    }
    return { width: viewportSize.width, height: viewportSize.height };
  };

  const canvasSize = getCanvasSize();

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full max-w-[1150px] mx-auto h-full flex flex-col px-2 sm:px-0">
        <Navbar
          onThemeSelect={handleCanvasColors}
          onViewportChange={handleViewportChange}
          targetRef={canvasRef}
          inputValue={inputValue}
          canvasBG={canvasBgClass}
          canvasTextColor={canvasTextColorValue}
          canvasTextColorClass={canvasTextColorClass}
          canvasFont={selectedFont.fontFamily}
          placeholderColor={placeholderColor}
          canvasFontSize={canvasFontSize}
          canvasTextPadding={30}
          useCustomColors={useCustom}
          customBgColor={customBgColor}
          customTextColor={customTextColor}
          textureIntensity={textureIntensity}
          lineHeight={lineHeight}
          dropCap={dropCap}
        />

        {/* Desktop: Two columns side by side */}
        {!isMobile && (
          <div className="grid grid-cols-2 flex-1 min-h-0 gap-3 md:gap-0">
            {/* Left Column - Editor */}
            <div className="flex flex-col gap-3 h-full min-h-0 pr-2 md:pr-3">
              <div className="flex-shrink-0 overflow-x-auto">
                <CanvasControls
                  onFontChange={handleFontChange}
                  canvasFont={selectedFont.fontFamily}
                  onLineHeightChange={handleLineHeightChange}
                  currentLineHeight={lineHeight}
                  onDropCapChange={handleDropCapChange}
                  currentDropCap={dropCap}
                  onPaddingChange={handlePaddingChange}
                  currentPadding={canvasTextPadding}
                  onKaomojiInsert={handleKaomojiInsert}
                  onDecorationInsert={handleDecorationInsert}
                  onThemeColorsChange={handleThemeColorsChange}
                  currentBg={customBgColor}
                  currentText={customTextColor}
                  onTextureChange={handleTextureChange}
                  currentTexture={textureIntensity}
                />
              </div>

              <div className="flex-shrink-0">
                <TextToolbar
                  textareaRef={textareaRef}
                  onFontSizeChange={handleToolbarFontSizeChange}
                  currentFontSize={toolbarFontSize}
                  defaultFontSize={DEFAULT_FONT_SIZE}
                />
              </div>

              <div className="flex-1 min-h-0">
                <InputArea
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  ref={textareaRef}
                  fontSize={toolbarFontSize}
                />
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="flex flex-col gap-3 h-full min-h-0 pl-2 md:pl-3 border-l border-gray-200/20">
              <div className="flex-1 min-h-0 flex items-center justify-center p-3">
                <Canvas
                  targetRef={canvasRef}
                  inputValue={inputValue}
                  canvasBgColor={canvasBgColor}
                  canvasBgClass={canvasBgClass}
                  canvasTextColor={canvasTextColorValue}
                  canvasTextColorClass={canvasTextColorClass}
                  canvasFont={selectedFont.fontFamily}
                  placeholderColor={placeholderColor}
                  canvasWidth={canvasSize.width}
                  canvasHeight={canvasSize.height}
                  canvasRadius={18}
                  canvasFontSize={canvasFontSize}
                  canvasTextPadding={canvasTextPadding}
                  lineHeight={lineHeight}
                  dropCap={dropCap}
                  textureIntensity={textureIntensity}
                  useCustomColors={useCustom}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile: Stack layout with tab switching between InputArea and Canvas only */}
        {isMobile && (
          <div className="flex flex-col flex-1 min-h-0 gap-3">
            {/* Top Controls - Always Visible */}
            <div className="flex-shrink-0">
              <div className="overflow-x-auto">
                <CanvasControls
                  onFontChange={handleFontChange}
                  canvasFont={selectedFont.fontFamily}
                  onLineHeightChange={handleLineHeightChange}
                  currentLineHeight={lineHeight}
                  onDropCapChange={handleDropCapChange}
                  currentDropCap={dropCap}
                  onPaddingChange={handlePaddingChange}
                  currentPadding={canvasTextPadding}
                  onKaomojiInsert={handleKaomojiInsert}
                  onDecorationInsert={handleDecorationInsert}
                  onThemeColorsChange={handleThemeColorsChange}
                  currentBg={customBgColor}
                  currentText={customTextColor}
                  onTextureChange={handleTextureChange}
                  currentTexture={textureIntensity}
                />
              </div>
            </div>

            {/* Text Toolbar - Always Visible */}
            <div className="flex-shrink-0">
              <TextToolbar
                textareaRef={textareaRef}
                onFontSizeChange={handleToolbarFontSizeChange}
                currentFontSize={toolbarFontSize}
                defaultFontSize={DEFAULT_FONT_SIZE}
              />
            </div>

            {/* Tab Switcher - Only between Input and Preview */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex-1 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-200
                  ${
                    activeTab === 'editor'
                      ? 'bg-white/20 text-white border border-white/20'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                ✏️ Write
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-200
                  ${
                    activeTab === 'preview'
                      ? 'bg-white/20 text-white border border-white/20'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                👁️ Preview
              </button>
            </div>

            {/* Tab Content - Only InputArea OR Canvas changes */}
            <div className="flex-1 min-h-0">
              {activeTab === 'editor' ? (
                <InputArea
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  ref={textareaRef}
                  fontSize={toolbarFontSize}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-3 bg-black/20 rounded-xl">
                  <Canvas
                    targetRef={canvasRef}
                    inputValue={inputValue}
                    canvasBgColor={canvasBgColor}
                    canvasBgClass={canvasBgClass}
                    canvasTextColor={canvasTextColorValue}
                    canvasTextColorClass={canvasTextColorClass}
                    canvasFont={selectedFont.fontFamily}
                    placeholderColor={placeholderColor}
                    canvasWidth={canvasSize.width}
                    canvasHeight={canvasSize.height}
                    canvasRadius={18}
                    canvasFontSize={canvasFontSize}
                    canvasTextPadding={canvasTextPadding}
                    lineHeight={lineHeight}
                    dropCap={dropCap}
                    textureIntensity={textureIntensity}
                    useCustomColors={useCustom}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
