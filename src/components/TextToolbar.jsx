import { useState, useRef, useEffect } from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUndo,
  FaRedo,
  FaLink,
} from 'react-icons/fa';
import { TbLetterCase, TbClearFormatting } from 'react-icons/tb';

export default function TextToolbar({
  textareaRef,
  onFontSizeChange,
  currentFontSize,
  defaultFontSize = 17,
}) {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  const [selectedTextFontSize, setSelectedTextFontSize] = useState('default');
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const fontSizeRef = useRef(null);

  // Check active formatting on selection change
  const updateActiveFormats = () => {
    if (!textareaRef?.current) return;

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikethrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    });

    // Detect font size of selected text
    detectSelectedTextFontSize();
  };

  // Detect the font size of currently selected text
  const detectSelectedTextFontSize = () => {
    const selection = window.getSelection();
    if (selection.toString()) {
      const selectedNode = selection.anchorNode?.parentElement;
      if (selectedNode) {
        const fontSize = window.getComputedStyle(selectedNode).fontSize;
        const sizeNum = parseInt(fontSize, 10);
        setSelectedTextFontSize(sizeNum.toString());
      }
    }
  };

  // Monitor formatting changes
  useEffect(() => {
    const editor = textareaRef?.current;
    if (editor) {
      editor.addEventListener('mouseup', updateActiveFormats);
      editor.addEventListener('keyup', updateActiveFormats);
      editor.addEventListener('click', updateActiveFormats);
      editor.addEventListener('input', updateActiveFormats);
      return () => {
        editor.removeEventListener('mouseup', updateActiveFormats);
        editor.removeEventListener('keyup', updateActiveFormats);
        editor.removeEventListener('click', updateActiveFormats);
        editor.removeEventListener('input', updateActiveFormats);
      };
    }
  }, [textareaRef]);

  // Execute formatting command
  const executeCommand = (command, value = null) => {
    if (!textareaRef?.current) return;

    textareaRef.current.focus();
    document.execCommand(command, false, value);
    updateActiveFormats();

    // Trigger input event for parent component
    const event = new Event('input', { bubbles: true });
    textareaRef.current.dispatchEvent(event);
  };

  // Apply font size with inline styles (better control)
  const applyFontSize = sizeValue => {
    if (!textareaRef?.current) return;

    const selection = window.getSelection();

    // If no text is selected, just update the dropdown
    if (!selection.toString()) {
      if (sizeValue === 'default') {
        setSelectedTextFontSize('default');
        onFontSizeChange?.(defaultFontSize);
      } else {
        setSelectedTextFontSize(sizeValue);
        onFontSizeChange?.(parseInt(sizeValue, 10));
      }
      return;
    }

    // Apply to selected text
    const selectedText = selection.toString();
    const span = document.createElement('span');

    if (sizeValue === 'default') {
      span.style.fontSize = `${defaultFontSize}px`;
    } else {
      span.style.fontSize = `${sizeValue}px`;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();
    span.appendChild(document.createTextNode(selectedText));
    range.insertNode(span);

    // Update state
    if (sizeValue === 'default') {
      setSelectedTextFontSize('default');
      onFontSizeChange?.(defaultFontSize);
    } else {
      setSelectedTextFontSize(sizeValue);
      onFontSizeChange?.(parseInt(sizeValue, 10));
    }

    // Trigger input event
    const event = new Event('input', { bubbles: true });
    textareaRef.current.dispatchEvent(event);

    // Re-focus
    textareaRef.current.focus();
  };

  // Font size dropdown handler
  const handleFontSizeChange = e => {
    const size = e.target.value;
    applyFontSize(size);
  };

  // Text color picker
  const handleTextColor = e => {
    const color = e.target.value;
    setTextColor(color);
    document.execCommand('foreColor', false, color);
    textareaRef.current?.focus();
  };

  // Background color picker
  const handleBgColor = e => {
    const color = e.target.value;
    setBgColor(color);
    document.execCommand('backColor', false, color);
    textareaRef.current?.focus();
  };

  // Case transformations
  const applyCase = transformFn => {
    if (!textareaRef?.current) return;

    const selection = window.getSelection();
    if (!selection.toString()) return;

    const selectedText = selection.toString();
    const newText = transformFn(selectedText);
    document.execCommand('insertText', false, newText);
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  // Create toolbar button
  const ToolButton = ({ icon, action, title, active = false }) => (
    <button
      onClick={action}
      title={title}
      className={`p-2 rounded-md transition-all duration-150
        ${
          active
            ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
            : 'text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
        }
        active:scale-95 border`}
    >
      {icon}
    </button>
  );

  const ColorInput = ({ value, onChange, title }) => (
    <div className="flex items-center gap-1">
      <input
        type="color"
        value={value}
        onChange={onChange}
        title={title}
        className="w-8 h-8 rounded cursor-pointer border border-white/20 hover:border-white/40"
      />
    </div>
  );

  return (
    <div className="w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
      {/* Row 1: Basic Formatting + Font Size + Colors + Alignment */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10">
        {/* Basic Text Formatting */}
        <ToolButton
          icon={<FaBold size={14} />}
          action={() => executeCommand('bold')}
          title="Bold (Ctrl+B)"
          active={activeFormats.bold}
        />
        <ToolButton
          icon={<FaItalic size={14} />}
          action={() => executeCommand('italic')}
          title="Italic (Ctrl+I)"
          active={activeFormats.italic}
        />
        <ToolButton
          icon={<FaUnderline size={14} />}
          action={() => executeCommand('underline')}
          title="Underline (Ctrl+U)"
          active={activeFormats.underline}
        />
        <ToolButton
          icon={<FaStrikethrough size={14} />}
          action={() => executeCommand('strikethrough')}
          title="Strikethrough"
          active={activeFormats.strikethrough}
        />

        <div className="w-px h-6 bg-white/10" />

        {/* Font Size - With Default Option */}
        <select
          ref={fontSizeRef}
          onChange={handleFontSizeChange}
          value={selectedTextFontSize}
          className="px-2 py-1 text-sm rounded bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
          title="Font Size - Select text to change its size"
        >
          <option value="default">Default ({defaultFontSize}px)</option>
          <option disabled>━━━━━━━━━━</option>
          {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60].map(size => (
            <option key={size} value={size.toString()}>
              {size}px
            </option>
          ))}
        </select>

        <div className="w-px h-6 bg-white/10" />

        {/* Text & Background Color */}
        <ColorInput value={textColor} onChange={handleTextColor} title="Text Color" />
        <ColorInput value={bgColor} onChange={handleBgColor} title="Highlight Color" />

        <div className="w-px h-6 bg-white/10" />

        {/* Alignment */}
        <ToolButton
          icon={<FaAlignLeft size={14} />}
          action={() => executeCommand('justifyLeft')}
          title="Align Left"
        />
        <ToolButton
          icon={<FaAlignCenter size={14} />}
          action={() => executeCommand('justifyCenter')}
          title="Align Center"
        />
        <ToolButton
          icon={<FaAlignRight size={14} />}
          action={() => executeCommand('justifyRight')}
          title="Align Right"
        />
      </div>

      {/* Row 2: Lists, Case, Links & Cleanup */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10">
        {/* Lists */}
        <ToolButton
          icon={<FaListUl size={14} />}
          action={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          active={activeFormats.insertUnorderedList}
        />
        <ToolButton
          icon={<FaListOl size={14} />}
          action={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          active={activeFormats.insertOrderedList}
        />

        <div className="w-px h-6 bg-white/10" />

        {/* Case Transformations */}
        <ToolButton
          icon={<TbLetterCase size={14} style={{ transform: 'scaleY(1.2)' }} />}
          action={() => applyCase(text => text.toUpperCase())}
          title="UPPERCASE"
        />
        <ToolButton
          icon={<TbLetterCase size={14} style={{ transform: 'scaleY(0.8)' }} />}
          action={() => applyCase(text => text.toLowerCase())}
          title="lowercase"
        />

        <div className="w-px h-6 bg-white/10" />

        {/* Links & Special */}
        <ToolButton icon={<FaLink size={14} />} action={insertLink} title="Insert Link" />

        <div className="w-px h-6 bg-white/10" />

        {/* Undo/Redo */}
        <ToolButton
          icon={<FaUndo size={14} />}
          action={() => executeCommand('undo')}
          title="Undo (Ctrl+Z)"
        />
        <ToolButton
          icon={<FaRedo size={14} />}
          action={() => executeCommand('redo')}
          title="Redo (Ctrl+Y)"
        />

        <div className="w-px h-6 bg-white/10" />

        {/* Clear Formatting */}
        <ToolButton
          icon={<TbClearFormatting size={14} />}
          action={() => executeCommand('removeFormat')}
          title="Clear Formatting"
        />
      </div>

      {/* Help Text */}
      <div className="px-3 py-2 bg-white/5 text-[10px] text-white/30 font-mono">
        💡 Select text → Change its font size • Default resets to {defaultFontSize}px
      </div>
    </div>
  );
}
