import { useState, useEffect } from 'react';
import { BiSolidQuoteAltRight } from 'react-icons/bi';
import { FiAlignLeft, FiAlignCenter, FiAlignRight, FiCheck, FiRefreshCw } from 'react-icons/fi';
import FontSizeSelector from './FontSizeSelector';
import ToolbarDropdown from './ToolbarDropdown';
import { TextColorSelector, HighlightSelector } from './ColorSelectors';

export default function TextToolbar({
  textareaRef,
  onFontSizeChange,
  currentFontSize,
  defaultFontSize = 17,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    quote: false,
  });

  const [fontSizeLabel, setFontSizeLabel] = useState('Default');
  const [opacity, setOpacity] = useState(100);
  const [textColor, setTextColor] = useState('default');
  const [highlightColor, setHighlightColor] = useState('none');

  useEffect(() => {
    if (currentFontSize === defaultFontSize) {
      setFontSizeLabel('Default');
    } else {
      setFontSizeLabel(String(currentFontSize));
    }
  }, [currentFontSize, defaultFontSize]);

  const updateActiveFormats = () => {
    if (!textareaRef?.current) return;

    let isQuoteActive = false;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let node = selection.getRangeAt(0).startContainer;
      while (node && node !== textareaRef.current) {
        if (node.nodeName === 'SPAN' && node.getAttribute('data-element-type') === 'blockquote') {
          isQuoteActive = true;
          break;
        }
        node = node.parentNode;
      }
    }

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikethrough'),
      quote: isQuoteActive,
    });
  };

  useEffect(() => {
    const editor = textareaRef?.current;
    if (editor) {
      const events = ['mouseup', 'keyup', 'click', 'input'];
      const handleUpdate = () => setTimeout(updateActiveFormats, 10);
      events.forEach(e => editor.addEventListener(e, handleUpdate));
      return () => events.forEach(e => editor.removeEventListener(e, handleUpdate));
    }
  }, [textareaRef]);

  const executeCommand = (command, value = null) => {
    if (!textareaRef?.current) return;
    textareaRef.current.focus();
    document.execCommand(command, false, value);
    updateActiveFormats();
    triggerInputChange();
  };

  const triggerInputChange = () => {
    if (!textareaRef?.current) return;
    const event = new Event('input', { bubbles: true });
    textareaRef.current.dispatchEvent(event);
  };

  const applySelectionStyle = (styleProperty, value) => {
    if (!textareaRef?.current) return;
    textareaRef.current.focus();

    const selection = window.getSelection();
    if (!selection || !selection.toString() || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style[styleProperty] = value;

    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);

    triggerInputChange();
    updateActiveFormats();
  };

  const toggleQuoteLayout = () => {
    if (!textareaRef?.current) return;
    textareaRef.current.focus();

    const selection = window.getSelection();
    if (!selection || !selection.toString() || selection.rangeCount === 0) return;

    if (activeFormats.quote) {
      // Unwrap: pull children out, remove the span
      const range = selection.getRangeAt(0);
      let container = range.startContainer;
      while (container && container !== textareaRef.current) {
        if (
          container.nodeName === 'SPAN' &&
          container.getAttribute('data-element-type') === 'blockquote'
        ) {
          const parent = container.parentNode;
          while (container.firstChild) {
            parent.insertBefore(container.firstChild, container);
          }
          container.remove();
          break;
        }
        container = container.parentNode;
      }
      triggerInputChange();
      setTimeout(updateActiveFormats, 20);
    } else {
      //  styles via span.style directly — no setAttribute('style') conflict
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');

      span.setAttribute('data-element-type', 'blockquote');

      // Apply every style property individually so nothing gets overwritten
      span.style.display = 'inline-block';
      span.style.borderLeft = '4px solid #4b5563';
      span.style.paddingLeft = '12px';
      span.style.color = '#a1a1aa';
      span.style.fontStyle = 'italic';
      span.style.margin = '4px 0';

      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);

      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);

      triggerInputChange();
      setTimeout(updateActiveFormats, 20);
    }
  };

  const handleOpacitySelect = value => {
    if (!textareaRef?.current) return;
    setOpacity(value);

    if (value === 100) {
      // Strip any existing opacity span wrapping the selection
      textareaRef.current.focus();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode; // text node → parent

      // Walk up looking for a span with opacity set
      while (container && container !== textareaRef.current) {
        if (container.nodeName === 'SPAN' && container.style.opacity) {
          const parent = container.parentNode;
          while (container.firstChild) {
            parent.insertBefore(container.firstChild, container);
          }
          container.remove();
          break;
        }
        container = container.parentNode;
      }

      triggerInputChange();
      updateActiveFormats();
    } else {
      applySelectionStyle('opacity', (value / 100).toString());
    }
  };

  const handleFontSizeChange = (label, sizeValue) => {
    setFontSizeLabel(label);
    const selection = window.getSelection();
    if (!selection.toString()) {
      onFontSizeChange?.(label === 'Default' ? defaultFontSize : parseInt(sizeValue, 10));
    } else {
      applySelectionStyle('fontSize', sizeValue);
    }
  };

  const opacityOptions = [100, 90, 80, 70, 60, 50, 40, 30];

  const resetFormatting = () => {
    if (!textareaRef?.current) return;
    textareaRef.current.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    document.execCommand('removeFormat', false, null);

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parentElement = container.nodeType === 1 ? container : container.parentNode;

    if (parentElement && parentElement !== textareaRef.current) {
      if (parentElement.tagName === 'SPAN') {
        const parent = parentElement.parentNode;
        while (parentElement.firstChild) {
          parent.insertBefore(parentElement.firstChild, parentElement);
        }
        parentElement.remove();
      }
    }

    setFontSizeLabel('Default');
    setOpacity(100);
    setTextColor('default');
    setHighlightColor('none');
    setActiveMenu(null);

    triggerInputChange();
    setTimeout(updateActiveFormats, 20);
  };

  return (
    <div className="inline-flex items-center gap-0.5 bg-zinc-950 border border-white/10 rounded-[16px] px-1 py-0.5 text-white select-none text-sm  relative z-[999]">
      <button className="w-7 h-7 shrink-0 flex items-center justify-center text-zinc-500 font-bold pointer-events-none bg-zinc-800 rounded-lg">
        T
      </button>

      <div className="w-px h-4 bg-zinc-800 mx-1 shrink-0" />

      <button
        onClick={() => executeCommand('bold')}
        className={`w-8 h-8 shrink-0 flex items-center justify-center font-bold rounded-lg transition-colors ${activeFormats.bold ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}
      >
        B
      </button>
      <button
        onClick={() => executeCommand('italic')}
        className={`w-8 h-8 shrink-0 flex items-center justify-center italic rounded-lg transition-colors ${activeFormats.italic ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}
      >
        I
      </button>
      <button
        onClick={() => executeCommand('underline')}
        className={`w-8 h-8 shrink-0 flex items-center justify-center underline decoration-1 underline-offset-2 rounded-lg transition-colors ${activeFormats.underline ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}
      >
        U
      </button>
      <button
        onClick={() => executeCommand('strikethrough')}
        className={`w-8 h-8 shrink-0 flex items-center justify-center line-through rounded-lg transition-colors ${activeFormats.strikethrough ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}
      >
        S
      </button>

      <div className="w-px h-4 bg-zinc-800 mx-0.5 shrink-0" />

      <FontSizeSelector
        isOpen={activeMenu === 'fontSize'}
        setIsOpen={open => setActiveMenu(open ? 'fontSize' : null)}
        label={fontSizeLabel}
        onSelect={handleFontSizeChange}
      />

      <button
        onClick={() => executeCommand('formatBlock', '<h1>')}
        className="w-8 h-8 shrink-0 flex items-center justify-center font-medium text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60"
      >
        H₁
      </button>
      <button
        onClick={() => executeCommand('formatBlock', '<h2>')}
        className="w-8 h-8 shrink-0 flex items-center justify-center font-medium text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60"
      >
        H₂
      </button>

      <button
        onClick={toggleQuoteLayout}
        className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg transition-colors ${activeFormats.quote ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}
        title="Toggle Quote Format"
      >
        <BiSolidQuoteAltRight size={13} />
      </button>

      <ToolbarDropdown
        isOpen={activeMenu === 'opacity'}
        onClose={() => setActiveMenu(null)}
        trigger={
          <button
            onClick={() => setActiveMenu(activeMenu === 'opacity' ? null : 'opacity')}
            className="w-9 h-8 shrink-0 flex items-center justify-center font-semibold text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
          >
            {opacity}%
          </button>
        }
      >
        <div className="w-32">
          <div className="text-[10px] font-bold tracking-wider text-zinc-500 px-2 py-1">
            OPACITY
          </div>
          {opacityOptions.map(op => (
            <button
              key={op}
              onClick={() => handleOpacitySelect(op)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg text-left"
            >
              <div
                className={`w-2 h-2 rounded-full border ${
                  opacity === op ? 'bg-white border-white' : 'border-zinc-600'
                }`}
              />
              {op}%
            </button>
          ))}
        </div>
      </ToolbarDropdown>

      <div className="w-px h-4 bg-zinc-800 mx-0.5 shrink-0" />

      <button
        onClick={() => executeCommand('justifyLeft')}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40"
      >
        <FiAlignLeft size={14} />
      </button>
      <button
        onClick={() => executeCommand('justifyCenter')}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40"
      >
        <FiAlignCenter size={14} />
      </button>
      <button
        onClick={() => executeCommand('justifyRight')}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40"
      >
        <FiAlignRight size={14} />
      </button>

      <TextColorSelector
        isOpen={activeMenu === 'textColor'}
        setIsOpen={open => setActiveMenu(open ? 'textColor' : null)}
        activeColor={textColor}
        onSelect={(colorLabel, finalColor) => {
          setTextColor(colorLabel);
          executeCommand('foreColor', finalColor);
        }}
      />

      <HighlightSelector
        isOpen={activeMenu === 'highlight'}
        setIsOpen={open => setActiveMenu(open ? 'highlight' : null)}
        activeColor={highlightColor}
        onSelect={(colorLabel, finalColor) => {
          setHighlightColor(colorLabel);
          executeCommand('backColor', finalColor);
        }}
      />

      <div className="w-px h-4 bg-zinc-800 mx-1 shrink-0" />

      <button
        onClick={resetFormatting}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-red-400 rounded-lg hover:bg-zinc-800/40 transition-colors"
        title="Clear Formatting"
      >
        <FiRefreshCw size={13} />
      </button>

      <button
        onClick={() => setActiveMenu(null)}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-zinc-800/40"
      >
        <FiCheck size={15} />
      </button>
    </div>
  );
}
