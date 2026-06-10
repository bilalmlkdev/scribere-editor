import { useState, useRef, useEffect } from 'react';
import Navbar from './components/nav/Navbar';
import InputArea from './components/InputArea';
import CanvasControls from './components/controls/CanvasControls';
import Canvas from './components/Canvas';
import TextToolbar from './components/toolbar/TextToolbar';
import { themes } from './data/themes';
import { defaultFont } from './data/fonts';
import { RiEdit2Line } from 'react-icons/ri';
import { LuImage } from 'react-icons/lu';
import { FiGithub } from 'react-icons/fi';

const DEFAULT_FONT_SIZE = 16;
const DEFAULT_CANVAS_RADIUS = 18;
const DEFAULT_LINE_HEIGHT = 2.0;
const DEFAULT_PADDING = 52;
const DEFAULT_BG_COLOR = themes[0].bgValue;
const DEFAULT_TEXT_COLOR = themes[0].textValue;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 530, height: 530, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(DEFAULT_LINE_HEIGHT);
  const [toolbarFontSize, setToolbarFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasFontSize, setCanvasFontSize] = useState(DEFAULT_FONT_SIZE);

  const [activeTab, setActiveTab] = useState('editor');
  const [isMobile, setIsMobile] = useState(false);

  const [customBgColor, setCustomBgColor] = useState(DEFAULT_BG_COLOR);
  const [customTextColor, setCustomTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [textureIntensity, setTextureIntensity] = useState(0);
  const [useCustomColors, setUseCustomColors] = useState(false);

  const [canvasTextPadding, setCanvasTextPadding] = useState(DEFAULT_PADDING);
  const [dropCap, setDropCap] = useState(false);

  const [toolbarState, setToolbarState] = useState({
    visible: false,
    top: 0,
    left: 0,
  });

  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const toolbarRef = useRef(null);

  // monitor viewport size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // desktop text selection toolbar positioning
  useEffect(() => {
    const editor = textareaRef.current;
    if (!editor) return;

    const evaluateSelection = () => {
      if (isMobile) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      if (!editor.contains(selection.anchorNode) && !editor.contains(selection.focusNode)) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Decreased from 55 to 40 to bring the toolbar closer down to the text
      const spaceOffset = 40;
      let targetTop = rect.top - spaceOffset;
      let targetLeft = rect.left + rect.width / 2;

      const toolbarWidth = toolbarRef.current?.offsetWidth ?? 440;
      const halfToolbar = toolbarWidth / 2;
      const screenMargin = 12;

      targetLeft = Math.max(
        halfToolbar + screenMargin,
        Math.min(window.innerWidth - halfToolbar - screenMargin, targetLeft),
      );

      if (targetTop < screenMargin) {
        targetTop = rect.bottom + 12;
      }

      setToolbarState({ visible: true, top: targetTop, left: targetLeft });
    };

    const handleGlobalMouseUp = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setTimeout(evaluateSelection, 10);
    };
    const handleGlobalKeyUp = () => setTimeout(evaluateSelection, 10);
    const handleGlobalMouseDown = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setToolbarState(prev => ({ ...prev, visible: false }));
    };
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
  }, [isMobile]);

  const useCustom = useCustomColors;
  const canvasBgColor = useCustom ? customBgColor : null;
  const canvasTextColorValue = useCustom ? customTextColor : null;
  const canvasBgClass = !useCustom ? currentTheme.bgColor : '';
  const canvasTextColorClass = !useCustom ? currentTheme.textColor : '';
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

  const handleCanvasColors = theme => {
    setCurrentTheme(theme);
    setCustomBgColor(theme.bgValue);
    setCustomTextColor(theme.textValue);
    setUseCustomColors(false);
  };

  const handleThemeColorsChange = ({ bg, text }) => {
    setCustomBgColor(bg);
    setCustomTextColor(text);
    setUseCustomColors(true);
  };

  const handleTextureChange = intensity => setTextureIntensity(intensity);
  const handleViewportChange = size => setViewportSize(size);
  const handleFontChange = font => setSelectedFont(font);
  const handleLineHeightChange = value => setLineHeight(value);
  const handleDropCapChange = value => setDropCap(value);
  const handlePaddingChange = value => setCanvasTextPadding(value);

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
    return { width: viewportSize.width, height: viewportSize.height };
  };

  const canvasSize = getCanvasSize();

  const sharedCanvasProps = {
    targetRef: canvasRef,
    inputValue,
    canvasBgColor,
    canvasBgClass,
    canvasTextColor: canvasTextColorValue,
    canvasTextColorClass,
    canvasFont: selectedFont.fontFamily,
    placeholderColor,
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    canvasRadius: DEFAULT_CANVAS_RADIUS,
    canvasFontSize,
    canvasTextPadding,
    lineHeight,
    dropCap,
    textureIntensity,
    useCustomColors: useCustom,
  };

  const sharedControlProps = {
    onFontChange: handleFontChange,
    canvasFont: selectedFont.fontFamily,
    onLineHeightChange: handleLineHeightChange,
    currentLineHeight: lineHeight,
    onDropCapChange: handleDropCapChange,
    currentDropCap: dropCap,
    onPaddingChange: handlePaddingChange,
    currentPadding: canvasTextPadding,
    onKaomojiInsert: handleKaomojiInsert,
    onDecorationInsert: handleDecorationInsert,
    onThemeColorsChange: handleThemeColorsChange,
    currentBg: customBgColor,
    currentText: customTextColor,
    onTextureChange: handleTextureChange,
    currentTexture: textureIntensity,
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#030303]">
      <div className="w-full max-w-[1180px] mx-auto h-full flex flex-col px-0 lg:px-3 relative">
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
          canvasTextPadding={canvasTextPadding}
          useCustomColors={useCustom}
          customBgColor={customBgColor}
          customTextColor={customTextColor}
          textureIntensity={textureIntensity}
          lineHeight={lineHeight}
          dropCap={dropCap}
          canvasFontSize={canvasFontSize}
        />

        {/* desktop layout */}
        {!isMobile && (
          <div className="grid grid-cols-2 flex-1 min-h-0">
            <div className="flex flex-col gap-3 h-full min-h-0">
              <div className="flex-shrink-0">
                <CanvasControls {...sharedControlProps} />
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

            <div className="flex flex-col h-full min-h-0 items-center justify-center border-l border-zinc-800/60 p-6">
              <Canvas {...sharedCanvasProps} />
            </div>
          </div>
        )}

        {/* mobile layout */}
        {isMobile && (
          <div className="flex flex-col flex-1 min-h-0 gap-3 mt-1 pb-4">
            <div className="flex flex-col flex-1 min-h-0 bg-[#09090b] overflow-hidden">
              <div className="flex-shrink-0 px-0.5 sm:px-0">
                <CanvasControls {...sharedControlProps} />
              </div>

              {/* toolbar hides under sm breakpoint if preview is active */}
              <div className={`flex-shrink-0 ${activeTab === 'preview' ? 'hidden sm:block' : ''}`}>
                <TextToolbar
                  textareaRef={textareaRef}
                  onFontSizeChange={handleToolbarFontSizeChange}
                  currentFontSize={toolbarFontSize}
                  defaultFontSize={DEFAULT_FONT_SIZE}
                />
              </div>

              <div className="flex-1 min-h-0 bg-black/10">
                {activeTab === 'editor' ? (
                  <div className="h-full">
                    <InputArea
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      ref={textareaRef}
                      fontSize={toolbarFontSize}
                    />
                  </div>
                ) : (
                  <div className="h-full w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
                      <Canvas {...sharedCanvasProps} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-1 p-0.5 px-3.5 sm:px-4 border-b border-gray-100/10 pb-2.5">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 py-1.5! rounded-[10px] text-[14px] font-medium transition-all flex items-center justify-center gap-1 ${activeTab === 'editor' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  <RiEdit2Line size={17} />
                  Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-1.5! rounded-[10px] text-[14px] font-medium transition-all flex items-center justify-center gap-1 ${activeTab === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  <LuImage size={17} />
                  Preview
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 px-3.5 sm:px-4">
                <button className="px-3 flex items-center justify-center gap-1 py-2 text-xs bg-white/80 text-black rounded-[8px] font-medium transition-colors">
                  <FiGithub size={16} />
                  GitHub
                </button>

                <button className="px-3 flex items-center justify-center gap-1 py-2 text-xs bg-white/80 text-black rounded-[8px] font-medium transition-colors">
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
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* floating desktop toolbar */}
      {!isMobile && (
        <div
          ref={toolbarRef}
          data-context-toolbar="true"
          style={{
            position: 'fixed',
            top: `${toolbarState.top}px`,
            left: `${toolbarState.left}px`,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'max-content',
            opacity: toolbarState.visible ? 1 : 0,
            pointerEvents: toolbarState.visible ? 'auto' : 'none',
          }}
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
