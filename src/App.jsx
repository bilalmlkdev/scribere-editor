import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import ExtraOptions from './components/ExtraOptions';
import Canvas from './components/Canvas';
import { themes } from './data/themes';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]); // Track full theme
  // const [canvasFontSize, setCanvasFontSize] = useState(28);
  // const [canvasTextPadding, setCanvasTextPadding] = useState(13);

  // Derived values from current theme
  const canvasBG = currentTheme.bgColor;
  const canvasTextColor = currentTheme.textValue; // Use hex value for inline style
  const canvasTextColorClass = currentTheme.textColor;
  const canvasFont = currentTheme.fontFamily;
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

  const handleCanvasColors = theme => {
    setCurrentTheme(theme);
  };

  const canvasRef = useRef(null);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full max-w-[1150px] mx-auto h-full flex flex-col">
        <Navbar
          onThemeSelect={handleCanvasColors}
          targetRef={canvasRef}
          inputValue={inputValue}
          canvasBG={canvasBG}
          canvasTextColor={canvasTextColor}
          canvasFont={canvasFont}
          placeholderColor={placeholderColor}
          canvasFontSize={18}
          canvasTextPadding={30}
        />

        <div className="grid grid-cols-2 flex-1 min-h-0">
          {/* Left Column */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            <div className="flex-shrink-0">
              <ExtraOptions />
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
                canvasFont={canvasFont}
                placeholderColor={placeholderColor}
                height="525px"
                canvasRadius={18}
                canvasFontSize={28}
                canvasTextPadding={52}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
