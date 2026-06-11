// components/InputArea.jsx

import { forwardRef, useEffect, useRef } from 'react';

const InputArea = forwardRef(({ inputValue, setInputValue, fontSize }, externalRef) => {
  const internalRef = useRef(null);
  const combinedRef = node => {
    internalRef.current = node;
    if (externalRef) {
      if (typeof externalRef === 'function') externalRef(node);
      else externalRef.current = node;
    }
  };

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

  // Set initial content only once
  useEffect(() => {
    if (internalRef.current && internalRef.current.innerHTML !== inputValue) {
      internalRef.current.innerHTML = inputValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-3 lg:p-0 bg-zinc-950/20 lg:bg-transparent">
      <div
        ref={combinedRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder="Every great design starts with a single word..."
        className="w-full px-3 py-2 lg:py-2 text-zinc-100 bg-transparent
                   outline-none tracking-wide font-normal
                   border border-zinc-800/80 lg:border-none rounded-xl lg:rounded-none
                   scrollbar-thin transition-colors duration-150
                   empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600
                   empty:before:pointer-events-none empty:before:font-medium empty:before:tracking-tight
                   focus:ring-0"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.6,
          height: 'auto',
        }}
      />
    </div>
  );
});

InputArea.displayName = 'InputArea';
export default InputArea;
