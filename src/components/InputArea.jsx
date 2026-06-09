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
    const text = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
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
        className="w-full flex-1 px-4 py-3  rounded-lg text-white
                   resize-none outline-none tracking-tight font-medium
                   scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20
                   overflow-auto transition-all duration-200
                   empty:before:content-[attr(data-placeholder)] empty:before:text-white/30
                   empty:before:pointer-events-none
                   focus:border-white/30 focus:ring-1 focus:ring-white/10"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
      />
    </div>
  );
});

InputArea.displayName = 'InputArea';

export default InputArea;
