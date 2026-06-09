import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import CanvasControls from './components/CanvasControls';
import Canvas from './components/Canvas';
import TextToolbar from './components/TextToolbar';
import { themes } from './data/themes';
import { defaultFont } from './data/fonts';

const DEFAULT_FONT_SIZE = 17;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 530, height: 530, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(2.0);
  const [toolbarFontSize, setToolbarFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasFontSize, setCanvasFontSize] = useState(DEFAULT_FONT_SIZE);

  const [activeTab, setActiveTab] = useState('editor');
  const [isMobile, setIsMobile] = useState(false);

  const [customBgColor, setCustomBgColor] = useState('#0f3460');
  const [customTextColor, setCustomTextColor] = useState('#e0e0e0');
  const [textureIntensity, setTextureIntensity] = useState(0);
  const [useCustomColors, setUseCustomColors] = useState(false);

  // Floating Context Toolbar Location Engine States
  const [toolbarState, setToolbarState] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  const canvasRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precise Global Selection Tracking Engine
  useEffect(() => {
    const editor = textareaRef.current;
    if (!editor) return;

    const evaluateSelection = () => {
      // 1. Instantly kill the floating logic if we are on mobile
      if (isMobile) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const selection = window.getSelection();

      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      // Check if selection anchors inside our editor
      if (!editor.contains(selection.anchorNode) && !editor.contains(selection.focusNode)) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) return;

      const spaceOffset = 55;
      let targetTop = rect.top - spaceOffset;
      let targetLeft = rect.left + rect.width / 2;

      // --- BULLETPROOF X-OVERFLOW PROTECTION ---
      // 220px is generously larger than half your toolbar. This ensures
      // translateX(-50%) never pulls the left edge off the screen.
      const safeHalfWidth = 220;
      const screenMargin = 16;

      targetLeft = Math.max(
        safeHalfWidth + screenMargin,
        Math.min(window.innerWidth - safeHalfWidth - screenMargin, targetLeft),
      );

      // Flip below text if it hits the top ceiling
      if (targetTop < screenMargin) {
        targetTop = rect.bottom + 12;
      }

      setToolbarState({
        visible: true,
        top: targetTop,
        left: targetLeft,
      });
    };

    // Attach to DOCUMENT so fast sweeps outside the box are caught perfectly
    const handleGlobalMouseUp = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setTimeout(evaluateSelection, 10);
    };

    const handleGlobalKeyUp = () => {
      setTimeout(evaluateSelection, 10);
    };

    // Hide instantly if user clicks anywhere else
    const handleGlobalMouseDown = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setToolbarState(prev => ({ ...prev, visible: false }));
    };

    // Failsafe for internal native selection wipes (like standard typing)
    const handleSelectionChange = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setToolbarState(prev => ({ ...prev, visible: false }));
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('keyup', handleGlobalKeyUp);
    document.addEventListener('mousedown', handleGlobalMouseDown);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('keyup', handleGlobalKeyUp);
      document.removeEventListener('mousedown', handleGlobalMouseDown);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isMobile]); // Re-bind if view layout state changes

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
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand('insertText', false, emoji);
    } else {
      setInputValue(prev => prev + emoji);
    }
  };

  const handleDecorationInsert = symbol => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand('insertText', false, symbol);
    } else {
      setInputValue(prev => prev + symbol);
    }
  };

  const handleToolbarFontSizeChange = size => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    setToolbarFontSize(numSize);
    setCanvasFontSize(numSize);
  };

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
    <div className="w-full h-screen overflow-hidden ">
      <div className="w-full max-w-[1150px] mx-auto h-full flex flex-col px-2 sm:px-0 relative">
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

        {!isMobile && (
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

              {/* No TextToolbar here on Desktop. It floats! */}
              <div className="flex-1 min-h-0 ">
                <InputArea
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  ref={textareaRef}
                  fontSize={toolbarFontSize}
                />
              </div>
            </div>

            <div className="flex flex-col h-full min-h-0 items-center justify-center  border-l border-gray-200/20">
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
        )}

        {isMobile && (
          <div className="flex flex-col flex-1 min-h-0 gap-3 mt-1 pb-3">
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

            {/* RESTORED: Natively embedded toolbar directly under controls on Mobile! */}
            <div className="flex-shrink-0 overflow-x-auto">
              <TextToolbar
                textareaRef={textareaRef}
                onFontSizeChange={handleToolbarFontSizeChange}
                currentFontSize={toolbarFontSize}
                defaultFontSize={DEFAULT_FONT_SIZE}
              />
            </div>

            <div className="flex-1 min-h-0">
              {activeTab === 'editor' ? (
                <div className="h-full bg-[#121214] rounded-xl border border-[#27272a]">
                  <InputArea
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    ref={textareaRef}
                    fontSize={toolbarFontSize}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-2 bg-black/20 rounded-xl">
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

            <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'editor' ? 'bg-[#27272a] text-white shadow' : 'text-zinc-400'}`}
              >
                ✏️ Write
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-[#27272a] text-white shadow' : 'text-zinc-400'}`}
              >
                👁️ Preview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Overlay Floating Toolbar Portal - DESKTOP ONLY */}
      {!isMobile && toolbarState.visible && (
        <div
          data-context-toolbar="true"
          style={{
            position: 'fixed',
            top: `${toolbarState.top}px`,
            left: `${toolbarState.left}px`,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'max-content',
          }}
          className="pointer-events-auto shadow-2xl transition-all duration-150 animate-in fade-in zoom-in-95 rounded-lg"
        >
          <TextToolbar
            textareaRef={textareaRef}
            onFontSizeChange={handleToolbarFontSizeChange}
            currentFontSize={toolbarFontSize}
            defaultFontSize={DEFAULT_FONT_SIZE}
          />
        </div>
      )}
    </div>
  );
}
