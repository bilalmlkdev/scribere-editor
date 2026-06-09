import { forwardRef, useEffect } from 'react';

const InputArea = forwardRef(({ inputValue, setInputValue, fontSize }, ref) => {
  useEffect(() => {
    if (ref?.current && ref.current.innerHTML !== inputValue) {
      ref.current.innerHTML = inputValue;
    }
  }, [inputValue, ref]);

  const handleInput = e => {
    setInputValue(e.currentTarget.innerHTML);
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
                   resize-none outline-none tracking-tight font-medium
                   scrollbar-thin overflow-auto transition-all duration-200
                   empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-600
                   empty:before:pointer-events-none focus:ring-0"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
      />
    </div>
  );
});

InputArea.displayName = 'InputArea';
export default InputArea;
