// index.jsx

import { useState, useRef } from 'react';
import Navbar from '../nav/Navbar';
import { themes } from '../../data/themes';
import { defaultFont } from '../../data/fonts';
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT, DEFAULT_PADDING } from '../../utils/editorHelpers';
import { useViewport } from '../../hooks/useViewport';
import { useTextSelectionToolbar } from '../../hooks/useTextSelectionToolbar';
import { EditorDesktop } from './EditorDesktop';
import { EditorMobile } from './EditorMobile';
import TextToolbar from '../toolbar/TextToolbar';

export default function Editor() {
  // --- State ---
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [viewportSize, setViewportSize] = useState({ width: 530, height: 530, id: 'Square' });
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [lineHeight, setLineHeight] = useState(DEFAULT_LINE_HEIGHT);
  const [toolbarFontSize, setToolbarFontSize] = useState(DEFAULT_FONT_SIZE);
  const [canvasFontSize, setCanvasFontSize] = useState(DEFAULT_FONT_SIZE);

  const [customBgColor, setCustomBgColor] = useState(themes[0].bgValue);
  const [customTextColor, setCustomTextColor] = useState(themes[0].textValue);
  const [textureIntensity, setTextureIntensity] = useState(0);
  const [useCustomColors, setUseCustomColors] = useState(false);

  const [canvasTextPadding, setCanvasTextPadding] = useState(DEFAULT_PADDING);
  const [dropCap, setDropCap] = useState(false);

  // --- Refs ---
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);

  // --- Hooks ---
  const isMobile = useViewport();
  const { toolbarState, toolbarRef } = useTextSelectionToolbar(textareaRef, isMobile);

  // --- Derived canvas props ---
  const canvasBgColor = useCustomColors ? customBgColor : null;
  const canvasTextColorValue = useCustomColors ? customTextColor : null;
  const canvasBgClass = !useCustomColors ? currentTheme.bgColor : '';
  const canvasTextColorClass = !useCustomColors ? currentTheme.textColor : '';
  const placeholderColor = currentTheme.placeholderColor || 'text-gray-400';

  const canvasSize = { width: viewportSize.width, height: viewportSize.height };

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
    canvasRadius: 18,
    canvasFontSize,
    canvasTextPadding,
    lineHeight,
    dropCap,
    textureIntensity,
    useCustomColors,
  };

  const sharedControlProps = {
    onFontChange: setSelectedFont,
    canvasFont: selectedFont.fontFamily,
    onLineHeightChange: setLineHeight,
    currentLineHeight: lineHeight,
    onDropCapChange: setDropCap,
    currentDropCap: dropCap,
    onPaddingChange: setCanvasTextPadding,
    currentPadding: canvasTextPadding,
    onKaomojiInsert: emoji => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        document.execCommand('insertText', false, emoji);
      } else {
        setInputValue(prev => prev + emoji);
      }
    },
    onDecorationInsert: symbol => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        document.execCommand('insertText', false, symbol);
      } else {
        setInputValue(prev => prev + symbol);
      }
    },
    onThemeColorsChange: ({ bg, text }) => {
      setCustomBgColor(bg);
      setCustomTextColor(text);
      setUseCustomColors(true);
    },
    currentBg: customBgColor,
    currentText: customTextColor,
    onTextureChange: setTextureIntensity,
    currentTexture: textureIntensity,
  };

  const handleToolbarFontSizeChange = size => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    setToolbarFontSize(numSize);
    setCanvasFontSize(numSize);
  };

  const handleThemeSelect = theme => {
    setCurrentTheme(theme);
    setCustomBgColor(theme.bgValue);
    setCustomTextColor(theme.textValue);
    setUseCustomColors(false);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#030303]">
      <div className="w-full max-w-[1180px] mx-auto h-full flex flex-col px-0 lg:px-3 relative">
        <Navbar
          onThemeSelect={handleThemeSelect}
          onViewportChange={setViewportSize}
          targetRef={canvasRef}
          inputValue={inputValue}
          canvasBG={canvasBgClass}
          canvasTextColor={canvasTextColorValue}
          canvasTextColorClass={canvasTextColorClass}
          canvasFont={selectedFont.fontFamily}
          placeholderColor={placeholderColor}
          canvasTextPadding={canvasTextPadding}
          useCustomColors={useCustomColors}
          customBgColor={customBgColor}
          customTextColor={customTextColor}
          textureIntensity={textureIntensity}
          lineHeight={lineHeight}
          dropCap={dropCap}
          canvasFontSize={canvasFontSize}
        />

        {!isMobile ? (
          <EditorDesktop
            canvasProps={sharedCanvasProps}
            controlProps={sharedControlProps}
            inputValue={inputValue}
            setInputValue={setInputValue}
            textareaRef={textareaRef}
            toolbarFontSize={toolbarFontSize}
          />
        ) : (
          <EditorMobile
            canvasProps={sharedCanvasProps}
            controlProps={sharedControlProps}
            inputValue={inputValue}
            setInputValue={setInputValue}
            textareaRef={textareaRef}
            toolbarFontSize={toolbarFontSize}
            onToolbarFontSizeChange={handleToolbarFontSizeChange}
            defaultFontSize={DEFAULT_FONT_SIZE}
          />
        )}
      </div>

      {/* Floating toolbar for desktop */}
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
