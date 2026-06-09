import { forwardRef, useEffect } from 'react';

const InputArea = forwardRef(({ inputValue, setInputValue, fontSize }, ref) => {
  useEffect(() => {
    if (ref?.current && ref.current.innerHTML !== inputValue) {
      ref.current.innerHTML = inputValue;
    }
  }, [inputValue, ref]);

  const handleInput = e => {
    let html = e.currentTarget.innerHTML;

    // Normalize browser artifacts (<br>, variations of whitespace, or raw empty tags)
    const textContent = e.currentTarget.textContent || '';
    if (
      html === '<br>' ||
      html === '<div><br></div>' ||
      html === '<p><br></p>' ||
      textContent.trim() === ''
    ) {
      html = '';
      e.currentTarget.innerHTML = ''; // Force-clear the physical DOM node for CSS :empty to trigger
    }

    setInputValue(html);
  };

  const handlePaste = e => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder="Every great design starts with a single word..."
        className="w-full flex-1 px-4 text-zinc-100 bg-transparent
                   resize-none outline-none tracking-wide font-normal
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
