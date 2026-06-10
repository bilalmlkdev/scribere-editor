// components/InputArea.jsx

import { forwardRef, useEffect } from 'react';

const InputArea = forwardRef(({ inputValue, setInputValue, fontSize }, ref) => {
  // Remove the useEffect that overwrites innerHTML – it breaks cursor and causes loops

  const handleInput = e => {
    let html = e.currentTarget.innerHTML;

    const textContent = e.currentTarget.textContent || '';
    if (
      html === '<br>' ||
      html === '<div><br></div>' ||
      html === '<p><br></p>' ||
      textContent.trim() === ''
    ) {
      html = '';
      e.currentTarget.innerHTML = '';
    }

    setInputValue(html);
  };

  const handlePaste = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Set initial content only once using a ref to avoid re‑runs
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== inputValue) {
      ref.current.innerHTML = inputValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="w-full h-full overflow-hidden flex flex-col p-3 lg:p-0 bg-zinc-950/20 lg:bg-transparent">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder="Every great design starts with a single word..."
        className="w-full flex-1 px-3 py-2 lg:py-0 text-zinc-100 bg-transparent
                   resize-none outline-none tracking-wide font-normal border border-zinc-800/80 lg:border-none rounded-xl lg:rounded-none
                   scrollbar-thin overflow-auto transition-all duration-200
                   empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600
                   empty:before:pointer-events-none empty:before:font-medium empty:before:tracking-tight focus:ring-0"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
      />
    </div>
  );
});

InputArea.displayName = 'InputArea';
export default InputArea;
