import { useState, useRef, useEffect } from 'react';
import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
  FiChevronDown,
  FiEdit2,
  FiDroplet,
  FiCheck,
} from 'react-icons/fi';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

export default function TextToolbar({ textareaRef, onFontSizeChange, defaultFontSize = 17 }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const [fontSizeLabel, setFontSizeLabel] = useState('Default');
  const [opacity, setOpacity] = useState('100');
  const [textColor, setTextColor] = useState('default');
  const [highlightColor, setHighlightColor] = useState('none');

  const toolbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateActiveFormats = () => {
    if (!textareaRef?.current) return;
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikethrough'),
    });
  };

  useEffect(() => {
    const editor = textareaRef?.current;
    if (editor) {
      const events = ['mouseup', 'keyup', 'click', 'input'];
      events.forEach(e => editor.addEventListener(e, updateActiveFormats));
      return () => events.forEach(e => editor.removeEventListener(e, updateActiveFormats));
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
    if (!selection.toString() || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Create new styling wrapper
    const span = document.createElement('span');
    span.style[styleProperty] = value;

    // Extract content to safely preserve multi-nested tags (bold, italic, colors)
    const fragment = range.extractContents();

    // Clear out old conflicting styles of the SAME type inside selection to prevent bugs
    if (fragment.querySelectorAll) {
      fragment.querySelectorAll('span').forEach(childSpan => {
        childSpan.style[styleProperty] = '';
        if (!childSpan.style.cssText) {
          childSpan.replaceWith(...childSpan.childNodes);
        }
      });
    }

    span.appendChild(fragment);
    range.insertNode(span);

    // FIX: Re-highlight text after node updates so you can apply styles again immediately
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(newRange);

    triggerInputChange();
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

  const fontSizes = [
    { label: 'Small', size: '12px' },
    { label: 'Default', size: '17px' },
    { label: '14px', size: '14px' },
    { label: '16px', size: '16px' },
    { label: '18px', size: '18px' },
    { label: '20px', size: '20px' },
    { label: '24px', size: '24px' },
    { label: '28px', size: '28px' },
    { label: '32px', size: '32px' },
    { label: '36px', size: '36px' },
    { label: '48px', size: '48px' },
    { label: '64px', size: '64px' },
  ];

  const opacities = ['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%'];
  const textColors = [
    '#ffffff',
    '#000000',
    '#6b7280',
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#10b981',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
  ];
  const highlightColors = [
    '#fde047',
    '#bbf7d0',
    '#bfdbfe',
    '#e9d5ff',
    '#fbcfe8',
    '#fca5a5',
    '#fef08a',
    '#86efac',
    '#93c5fd',
    '#c084fc',
    '#f472b6',
    '#feb7b7',
  ];

  return (
    <div
      ref={toolbarRef}
      className="relative inline-flex items-center gap-0.5 bg-[#121214] border border-[#27272a] rounded-xl p-1 text-white shadow-2xl select-none font-sans text-sm w-full md:w-auto overflow-x-auto max-w-full custom-scrollbar z-99"
    >
      <button className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors">
        T
      </button>
      <div className="w-px h-4 bg-zinc-800 mx-1 shrink-0" />

      {/* Styled Modifiers */}
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

      {/* Font Selector */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'fontSize' ? null : 'fontSize')}
          className="h-8 px-2 flex items-center gap-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <span className="text-xs font-medium whitespace-nowrap">{fontSizeLabel}</span>
          <FiChevronDown className="w-3 h-3 opacity-60" />
        </button>
        {activeMenu === 'fontSize' && (
          <div className="absolute top-10 left-0 w-44 bg-[#121214] border border-[#27272a] rounded-xl p-1 z-50 shadow-xl max-h-64 overflow-y-auto">
            <div className="text-[10px] font-bold tracking-wider text-zinc-500 px-2.5 py-1.5">
              FONT SIZE
            </div>
            {fontSizes.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleFontSizeChange(item.label, item.size);
                  setActiveMenu(null);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg text-left"
              >
                <span className={item.label === 'Default' ? 'text-zinc-400' : 'font-semibold'}>
                  {item.label}
                </span>
                <span className="text-zinc-500 text-[10px]">{item.size}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Headings & Blockquote */}
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
        onClick={() => executeCommand('formatBlock', '<h3>')}
        className="w-8 h-8 shrink-0 flex items-center justify-center font-medium text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60"
      >
        H₃
      </button>
      <button
        onClick={() => executeCommand('formatBlock', '<blockquote>')}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        title="Insert Quote"
      >
        <BiSolidQuoteAltRight size={13} />
      </button>

      {/* Opacity Matrix Popover */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'opacity' ? null : 'opacity')}
          className="w-8 h-8 shrink-0 flex items-center justify-center font-semibold text-xs text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          {opacity}%
        </button>
        {activeMenu === 'opacity' && (
          <div className="absolute top-10 left-0 w-36 bg-[#121214] border border-[#27272a] rounded-xl p-1 z-50 shadow-xl">
            <div className="text-[10px] font-bold tracking-wider text-zinc-500 px-2.5 py-1.5">
              OPACITY
            </div>
            {opacities.map((op, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setOpacity(op.replace('%', ''));
                  applySelectionStyle('opacity', (parseInt(op, 10) / 100).toString());
                  setActiveMenu(null);
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg text-left"
              >
                <div
                  className={`w-2 h-2 rounded-full border ${opacity === op.replace('%', '') ? 'bg-white border-white' : 'border-zinc-600'}`}
                />
                {op}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Alignment Actions */}
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
      <button
        onClick={() => executeCommand('justifyFull')}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/40"
      >
        <FiAlignJustify size={14} />
      </button>

      {/* Text Color Grid */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'textColor' ? null : 'textColor')}
          className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <FiEdit2 size={14} style={{ color: textColor !== 'default' ? textColor : undefined }} />
        </button>
        {activeMenu === 'textColor' && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-[#121214] border border-[#27272a] rounded-xl p-2.5 z-50 shadow-xl">
            <div className="text-[10px] font-bold tracking-wider text-zinc-500 mb-2">
              TEXT COLOR
            </div>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => {
                  setTextColor('default');
                  executeCommand('foreColor', '#ffffff');
                  setActiveMenu(null);
                }}
                className="w-6 h-6 rounded-full border border-zinc-700 relative flex items-center justify-center bg-zinc-900 "
              >
                <div className="w-7 h-0.5 bg-red-500 absolute rotate-45" />
              </button>
              {textColors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTextColor(color);
                    executeCommand('foreColor', color);
                    setActiveMenu(null);
                  }}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-full border border-black/40 hover:scale-110 transition-transform flex items-center justify-center"
                >
                  {textColor === color && (
                    <FiCheck className="w-3 h-3 text-black mix-blend-difference" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Highlight Color Grid */}
      <div className="relative">
        <button
          onClick={() => setActiveMenu(activeMenu === 'highlight' ? null : 'highlight')}
          className="w-8 h-8 shrink-0 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <FiDroplet
            size={14}
            style={{ color: highlightColor !== 'none' ? highlightColor : undefined }}
          />
        </button>
        {activeMenu === 'highlight' && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-52 bg-[#121214] border border-[#27272a] rounded-xl p-2.5 z-50 shadow-xl">
            <div className="text-[10px] font-bold tracking-wider text-zinc-500 mb-2">HIGHLIGHT</div>
            <div className="grid grid-cols-6 gap-1.5">
              <button
                onClick={() => {
                  setHighlightColor('none');
                  executeCommand('backColor', 'transparent');
                  setActiveMenu(null);
                }}
                className="w-6 h-6 rounded-full border border-zinc-700 relative flex items-center justify-center bg-zinc-900 "
              >
                <div className="w-7 h-0.5 bg-red-500 absolute rotate-45" />
              </button>
              {highlightColors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setHighlightColor(color);
                    executeCommand('backColor', color);
                    setActiveMenu(null);
                  }}
                  style={{ backgroundColor: color }}
                  className="w-6 h-6 rounded-md hover:scale-105 transition-transform flex items-center justify-center"
                >
                  {highlightColor === color && <FiCheck className="w-3 h-3 text-black" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-zinc-800 mx-1 shrink-0" />
      <button
        onClick={() => setActiveMenu(null)}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-zinc-800/40"
      >
        <FiCheck size={15} />
      </button>
    </div>
  );
}
