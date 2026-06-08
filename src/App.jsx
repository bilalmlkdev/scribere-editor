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

  // Derived values from current theme
  const canvasBG = currentTheme.bgColor;
  const canvasTextColor = currentTheme.textValue;
  const canvasTextColorClass = currentTheme.textColor;
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

  const handleCanvasColors = theme => {
    setCurrentTheme(theme);
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

  // drop cap logic
  const [dropCap, setDropCap] = useState(false);

  const handleDropCapChange = value => {
    setDropCap(value);
  };

  // canvas padding
  const [canvasTextPadding, setCanvasTextPadding] = useState(52);

  const handlePaddingChange = value => {
    setCanvasTextPadding(value);
  };

  // Append kaomoji to input value
  const handleKaomojiInsert = emoji => {
    setInputValue(prev => prev + emoji);
  };

  // handle decorations
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
          canvasBG={canvasBG}
          canvasTextColor={canvasTextColor}
          canvasTextColorClass={canvasTextColorClass}
          canvasFont={selectedFont.fontFamily}
          placeholderColor={placeholderColor}
          canvasFontSize={18}
          canvasTextPadding={30}
        />

        <div className="grid grid-cols-2 flex-1 min-h-0">
          {/* Left Column */}
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
              />
            </div>

            {/* Input Area */}
            <div className="flex-1 min-h-0">
              <InputArea inputValue={inputValue} setInputValue={setInputValue} />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            {/* Canvas Area */}
            <div className="flex-1 min-h-0 border-l border-gray-200/20 flex items-center justify-center p-3">
              <Canvas
                targetRef={canvasRef}
                inputValue={inputValue}
                canvasBG={canvasBG}
                canvasTextColor={canvasTextColor}
                canvasTextColorClass={canvasTextColorClass}
                canvasFont={selectedFont.fontFamily}
                placeholderColor={placeholderColor}
                canvasWidth={viewportSize.width}
                canvasHeight={viewportSize.height}
                canvasRadius={18}
                canvasFontSize={28}
                canvasTextPadding={52}
                lineHeight={lineHeight}
                dropCap={dropCap}
                canvasTextPadding={canvasTextPadding}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
