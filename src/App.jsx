import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import CanvasControls from './components/CanvasControls';
import Canvas from './components/Canvas';
import TextToolbar from './components/TextToolbar';
import { themes } from './data/themes';
import { fonts, defaultFont } from './data/fonts';

const DEFAULT_FONT_SIZE = 17; // Set your default font size here

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 530, height: 530, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(2.0);
  const [toolbarFontSize, setToolbarFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasFontSize, setCanvasFontSize] = useState(28);

  // Custom theme colors state
  const [customBgColor, setCustomBgColor] = useState('#0f3460');
  const [customTextColor, setCustomTextColor] = useState('#e0e0e0');
  const [textureIntensity, setTextureIntensity] = useState(20);
  const [useCustomColors, setUseCustomColors] = useState(false);

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

  // Fixed: Update both toolbar and canvas font size
  const handleToolbarFontSizeChange = size => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    setToolbarFontSize(numSize);
    setCanvasFontSize(numSize);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full max-w-[1150px] mx-auto h-full flex flex-col">
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

        <div className="grid grid-cols-2 flex-1 min-h-0">
          <div className="flex flex-col gap-3 h-full min-h-0">
            <div className="flex-shrink-0">
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

            {/* Text Toolbar - Now with defaultFontSize prop */}
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

          <div className="flex flex-col gap-3 h-full min-h-0">
            <div className="flex-1 min-h-0 border-l border-gray-200/20 flex items-center justify-center p-3">
              <Canvas
                targetRef={canvasRef}
                inputValue={inputValue}
                canvasBgColor={canvasBgColor}
                canvasBgClass={canvasBgClass}
                canvasTextColor={canvasTextColorValue}
                canvasTextColorClass={canvasTextColorClass}
                canvasFont={selectedFont.fontFamily}
                placeholderColor={placeholderColor}
                canvasWidth={viewportSize.width}
                canvasHeight={viewportSize.height}
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
      </div>
    </div>
  );
}
