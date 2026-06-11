
import { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from '../nav/Navbar';
import { themes } from '../../data/themes';
import { fonts, defaultFont } from '../../data/fonts';
import { DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT, DEFAULT_PADDING } from '../../utils/editorHelpers';
import { useViewport } from '../../hooks/useViewport';
import { useTextSelectionToolbar } from '../../hooks/useTextSelectionToolbar';
import { useLocalStorage, STORAGE_KEYS } from '../../hooks/useLocalStorage';
import { EditorDesktop } from './EditorDesktop';
import { EditorMobile } from './EditorMobile';
import TextToolbar from '../toolbar/TextToolbar';

const findFontById = fontId => fonts.find(f => f.id === fontId) || defaultFont;
const findThemeByIndex = index => themes[index] || themes[0];

export default function Editor() {
  // Load persisted state
  const [storedState, setStoredState, clearStoredState] = useLocalStorage(
    STORAGE_KEYS.EDITOR_STATE,
    {
      inputValue: '',
      currentThemeId: 0,
      viewportSize: { width: 530, height: 530, id: 'Square' },
      selectedFontId: 'inter',
      lineHeight: DEFAULT_LINE_HEIGHT,
      canvasFontSize: DEFAULT_FONT_SIZE,
      canvasTextPadding: DEFAULT_PADDING,
      dropCap: false,
      textureIntensity: 0,
      useCustomColors: false,
      customBgColor: themes[0].bgValue,
      customTextColor: themes[0].textValue,
    },
  );

  // Local state
  const [inputValue, setInputValue] = useState(storedState.inputValue);
  const [currentTheme, setCurrentTheme] = useState(findThemeByIndex(storedState.currentThemeId));
  const [viewportSize, setViewportSize] = useState(storedState.viewportSize);
  const [selectedFont, setSelectedFont] = useState(findFontById(storedState.selectedFontId));
  const [lineHeight, setLineHeight] = useState(storedState.lineHeight);
  const [toolbarFontSize, setToolbarFontSize] = useState(storedState.canvasFontSize);
  const [canvasFontSize, setCanvasFontSize] = useState(storedState.canvasFontSize);
  const [canvasTextPadding, setCanvasTextPadding] = useState(storedState.canvasTextPadding);
  const [dropCap, setDropCap] = useState(storedState.dropCap);
  const [textureIntensity, setTextureIntensity] = useState(storedState.textureIntensity);
  const [useCustomColors, setUseCustomColors] = useState(storedState.useCustomColors);
  const [customBgColor, setCustomBgColor] = useState(storedState.customBgColor);
  const [customTextColor, setCustomTextColor] = useState(storedState.customTextColor);

  // Refs
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);
  const isInitialMount = useRef(true); // To avoid saving on first mount

  //  Hooks
  const isMobile = useViewport();
  const { toolbarState, toolbarRef } = useTextSelectionToolbar(textareaRef, isMobile);

  //  Save to localStorage (only after mount and when state actually changes)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const themeIndex = themes.findIndex(t => t.id === currentTheme.id);
    setStoredState({
      inputValue,
      currentThemeId: themeIndex >= 0 ? themeIndex : 0,
      viewportSize,
      selectedFontId: selectedFont.id,
      lineHeight,
      canvasFontSize,
      canvasTextPadding,
      dropCap,
      textureIntensity,
      useCustomColors,
      customBgColor,
      customTextColor,
    });
  }, [
    inputValue,
    currentTheme,
    viewportSize,
    selectedFont,
    lineHeight,
    canvasFontSize,
    canvasTextPadding,
    dropCap,
    textureIntensity,
    useCustomColors,
    customBgColor,
    customTextColor,
    setStoredState,
  ]);

  //  Handlers
  const handleInputChange = value => setInputValue(value);
  const handleThemeSelect = theme => setCurrentTheme(theme);
  const handleViewportChange = size => setViewportSize(size);
  const handleFontChange = font => setSelectedFont(font);
  const handleLineHeightChange = value => setLineHeight(value);
  const handlePaddingChange = value => setCanvasTextPadding(value);
  const handleDropCapChange = value => setDropCap(value);
  const handleTextureChange = value => setTextureIntensity(value);
  const handleToolbarFontSizeChange = size => {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    setToolbarFontSize(numSize);
    setCanvasFontSize(numSize);
  };
  const handleThemeColorsChange = ({ bg, text }) => {
    setCustomBgColor(bg);
    setCustomTextColor(text);
    setUseCustomColors(true);
  };

  const handleResetAll = useCallback(() => {
    if (confirm('Reset all settings and content? This cannot be undone.')) {
      clearStoredState();
      setInputValue('');
      setCurrentTheme(themes[0]);
      setViewportSize({ width: 530, height: 530, id: 'Square' });
      setSelectedFont(defaultFont);
      setLineHeight(DEFAULT_LINE_HEIGHT);
      setToolbarFontSize(DEFAULT_FONT_SIZE);
      setCanvasFontSize(DEFAULT_FONT_SIZE);
      setCanvasTextPadding(DEFAULT_PADDING);
      setDropCap(false);
      setTextureIntensity(0);
      setUseCustomColors(false);
      setCustomBgColor(themes[0].bgValue);
      setCustomTextColor(themes[0].textValue);
    }
  }, [clearStoredState]);

  //  Derived props
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
    onFontChange: handleFontChange,
    canvasFont: selectedFont.fontFamily,
    onLineHeightChange: handleLineHeightChange,
    currentLineHeight: lineHeight,
    onDropCapChange: handleDropCapChange,
    currentDropCap: dropCap,
    onPaddingChange: handlePaddingChange,
    currentPadding: canvasTextPadding,
    onKaomojiInsert: emoji => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        document.execCommand('insertText', false, emoji);
      } else {
        handleInputChange(inputValue + emoji);
      }
    },
    onDecorationInsert: symbol => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        document.execCommand('insertText', false, symbol);
      } else {
        handleInputChange(inputValue + symbol);
      }
    },
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
          onThemeSelect={handleThemeSelect}
          onViewportChange={handleViewportChange}
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
          onResetAll={handleResetAll}
        />

        {!isMobile ? (
          <EditorDesktop
            canvasProps={sharedCanvasProps}
            controlProps={sharedControlProps}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            textareaRef={textareaRef}
            toolbarFontSize={toolbarFontSize}
          />
        ) : (
          <EditorMobile
            canvasProps={sharedCanvasProps}
            controlProps={sharedControlProps}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            textareaRef={textareaRef}
            toolbarFontSize={toolbarFontSize}
            onToolbarFontSizeChange={handleToolbarFontSizeChange}
            defaultFontSize={DEFAULT_FONT_SIZE}
            onResetAll={handleResetAll}
          />
        )}
      </div>

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
