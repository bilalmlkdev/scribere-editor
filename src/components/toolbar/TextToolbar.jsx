import { useState, useEffect } from 'react';
import { BiSolidQuoteAltRight, BiText } from 'react-icons/bi';
import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiCheck,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
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
    const isResetValue = value === 'default' || value === 'none' || value === 'transparent';

    // 1. Check if selection matches or is inside an existing inline SPAN wrapper
    let parentSpan = range.commonAncestorContainer;
    if (parentSpan.nodeType === 3) {
      parentSpan = parentSpan.parentNode;
    }

    if (
      parentSpan &&
      parentSpan.nodeName === 'SPAN' &&
      parentSpan !== textareaRef.current &&
      parentSpan.textContent.trim() === selection.toString().trim()
    ) {
      if (isResetValue) {
        parentSpan.style[styleProperty] = '';
        if (!parentSpan.style.cssText) {
          const parent = parentSpan.parentNode;
          while (parentSpan.firstChild) {
            parent.insertBefore(parentSpan.firstChild, parentSpan);
          }
          parentSpan.remove();
        }
      } else {
        parentSpan.style[styleProperty] = value;
      }
      triggerInputChange();
      setTimeout(updateActiveFormats, 20);
      return;
    }

    // 2. Fragment extraction: Strip duplicate nested styles causing layout height to get stuck
    const span = document.createElement('span');
    if (!isResetValue) {
      span.style[styleProperty] = value;
    }

    const fragment = range.extractContents();

    // Prevent layering configurations that lock block/line height boxes
    const innerSpans = fragment.querySelectorAll('span');
    innerSpans.forEach(s => {
      if (s.style[styleProperty]) {
        s.style[styleProperty] = '';
        if (!s.style.cssText) {
          const p = s.parentNode;
          while (s.firstChild) {
            p.insertBefore(s.firstChild, s);
          }
          s.remove();
        }
      }
    });

    if (isResetValue || !span.style.cssText) {
      range.insertNode(fragment);
    } else {
      span.appendChild(fragment);
      range.insertNode(span);
    }

    // Reselect transformed contents cleanly
    const newRange = document.createRange();
    if (span.parentNode && !isResetValue) {
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    triggerInputChange();
    setTimeout(updateActiveFormats, 20);
  };

  const toggleQuoteLayout = () => {
    if (!textareaRef?.current) return;
    textareaRef.current.focus();

    const selection = window.getSelection();
    if (!selection || !selection.toString() || selection.rangeCount === 0) return;

    if (activeFormats.quote) {
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
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');

      span.setAttribute('data-element-type', 'blockquote');
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
      textareaRef.current.focus();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      if (container.nodeType === 3) container = container.parentNode;

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
    setActiveMenu(null);
  };

  const handleFontSizeChange = (label, sizeValue) => {
    setFontSizeLabel(label);
    const selection = window.getSelection();
    if (!selection.toString()) {
      onFontSizeChange?.(label === 'Default' ? defaultFontSize : parseInt(sizeValue, 10));
    } else {
      applySelectionStyle('fontSize', sizeValue);
    }
    setActiveMenu(null);
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
    <div className="w-full relative z-10 lg:z-99 bg-transparent lg:bg-zinc-900 rounded-none lg:rounded-[12px] border-b border-zinc-800/80 lg:border-none">
      <div className="w-full flex items-center justify-start overflow-x-auto whitespace-nowrap gap-[1px] px-2 py-2 lg:px-1 lg:py-0.5 text-white select-none text-xs sm:text-sm scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* Font Size Selector */}
        <div className="flex items-center gap-1 text-zinc-400 font-medium mr-1 shrink-0">
          <span className="uppercase tracking-wider bg-zinc-700/50 py-1.5 px-1.5 rounded-[8px] text-white mr-1 font-bold">
            <BiText size={16} />
          </span>
          <FontSizeSelector
            isOpen={activeMenu === 'fontSize'}
            setIsOpen={open => {
              if (open) setActiveMenu('fontSize');
              else setActiveMenu(null);
            }}
            label={fontSizeLabel}
            onSelect={handleFontSizeChange}
          />
        </div>

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <button
          onClick={() => executeCommand('bold')}
          className={`w-7 h-7 shrink-0 flex items-center justify-center font-bold rounded-md transition-all ${activeFormats.bold ? 'bg-zinc-100 text-zinc-950 scale-95' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
          B
        </button>
        <button
          onClick={() => executeCommand('italic')}
          className={`w-7 h-7 shrink-0 flex items-center justify-center italic rounded-md transition-all ${activeFormats.italic ? 'bg-zinc-100 text-zinc-950 scale-95' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
          I
        </button>
        <button
          onClick={() => executeCommand('underline')}
          className={`w-7 h-7 shrink-0 flex items-center justify-center underline decoration-1 underline-offset-2 rounded-md transition-all ${activeFormats.underline ? 'bg-zinc-100 text-zinc-950 scale-95' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
          U
        </button>
        <button
          onClick={() => executeCommand('strikethrough')}
          className={`w-7 h-7 shrink-0 flex items-center justify-center line-through rounded-md transition-all ${activeFormats.strikethrough ? 'bg-zinc-100 text-zinc-950 scale-95' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
          S
        </button>

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <button className="w-7 h-7 shrink-0 text-zinc-400 hover:text-white flex items-center justify-center rounded-md transition-colors hover:bg-zinc-800/50">
          <FiChevronDown size={14} />
        </button>
        <button className="w-7 h-7 shrink-0 text-zinc-400 hover:text-white flex items-center justify-center rounded-md transition-colors hover:bg-zinc-800/50">
          <FiChevronUp size={14} />
        </button>

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <button
          onClick={() => executeCommand('formatBlock', '<h1>')}
          className="w-7 h-7 shrink-0 flex items-center justify-center font-bold text-xs text-zinc-400 hover:text-white rounded-md transition-colors hover:bg-zinc-800/50"
        >
          H₁
        </button>
        <button
          onClick={() => executeCommand('formatBlock', '<h2>')}
          className="w-7 h-7 shrink-0 flex items-center justify-center font-bold text-xs text-zinc-400 hover:text-white rounded-md transition-colors hover:bg-zinc-800/50"
        >
          H₂
        </button>
        <button
          onClick={toggleQuoteLayout}
          className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-md transition-all ${activeFormats.quote ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
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
              className={`h-7 px-2 shrink-0 flex items-center justify-center font-semibold text-xs rounded-md transition-all ${activeMenu === 'opacity' ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
            >
              {opacity}%
            </button>
          }
        >
          <div className="w-32">
            <div className="text-[9px] font-bold tracking-wider text-zinc-500 px-2.5 py-1 uppercase">
              Opacity
            </div>
            {opacityOptions.map(op => (
              <button
                key={op}
                onClick={() => handleOpacitySelect(op)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition-colors text-left"
              >
                <span>{op}%</span>
                {opacity === op && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
              </button>
            ))}
          </div>
        </ToolbarDropdown>

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <button
          onClick={() => executeCommand('justifyLeft')}
          className="w-7 h-7 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-md transition-colors hover:bg-zinc-800/50"
        >
          <FiAlignLeft size={14} />
        </button>
        <button
          onClick={() => executeCommand('justifyCenter')}
          className="w-7 h-7 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-md transition-colors hover:bg-zinc-800/50"
        >
          <FiAlignCenter size={14} />
        </button>
        <button
          onClick={() => executeCommand('justifyRight')}
          className="w-7 h-7 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-md transition-colors hover:bg-zinc-800/50"
        >
          <FiAlignRight size={14} />
        </button>

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <TextColorSelector
          isOpen={activeMenu === 'textColor'}
          setIsOpen={open => setActiveMenu(open ? 'textColor' : null)}
          activeColor={textColor}
          onSelect={(colorLabel, finalColor) => {
            setTextColor(colorLabel);
            executeCommand('foreColor', finalColor);
            setActiveMenu(null);
          }}
        />

        <HighlightSelector
          isOpen={activeMenu === 'highlight'}
          setIsOpen={open => setActiveMenu(open ? 'highlight' : null)}
          activeColor={highlightColor}
          onSelect={(colorLabel, finalColor) => {
            setHighlightColor(colorLabel);
            executeCommand('backColor', finalColor);
            setActiveMenu(null);
          }}
        />

        <div className="w-px h-3.5 bg-zinc-800/80 mx-1 shrink-0" />

        <button
          onClick={resetFormatting}
          className="w-7 h-7 shrink-0 flex items-center justify-center text-zinc-400 hover:text-red-400 rounded-md hover:bg-zinc-800/50 transition-colors"
          title="Clear Formatting"
        >
          <FiRefreshCw size={12} />
        </button>

        <button
          onClick={() => setActiveMenu(null)}
          className="w-7 h-7 shrink-0 flex items-center justify-center text-emerald-400 hover:text-emerald-300 rounded-md hover:bg-zinc-800/50 ml-auto"
        >
          <FiCheck size={14} />
        </button>
      </div>
    </div>
  );
}
