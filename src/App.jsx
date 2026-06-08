import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import CanvasControls from './components/CanvasControls';
import Canvas from './components/Canvas';
import { themes } from './data/themes';
import { fonts, defaultFont } from './data/fonts';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 500, height: 500, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(2.0);

  // Custom theme colors state
  const [customBgColor, setCustomBgColor] = useState('#0f3460');
  const [customTextColor, setCustomTextColor] = useState('#e0e0e0');
  const [textureIntensity, setTextureIntensity] = useState(65);
  const [useCustomColors, setUseCustomColors] = useState(false);

  // Derived values - for custom colors we use inline styles, for themes we use Tailwind classes
  const useCustom = useCustomColors;
  const canvasBgColor = useCustom ? customBgColor : null;
  const canvasTextColorValue = useCustom ? customTextColor : currentTheme.textValue;
  const canvasBgClass = !useCustom ? currentTheme.bgColor : '';
  const canvasTextColorClass = !useCustom ? currentTheme.textColor : '';
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

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

  const canvasRef = useRef(null);

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
          canvasFontSize={18}
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

            <div className="flex-1 min-h-0">
              <InputArea inputValue={inputValue} setInputValue={setInputValue} />
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
                canvasFontSize={28}
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
