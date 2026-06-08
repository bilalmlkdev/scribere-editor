import { useRef } from 'react';

export default function InputArea({ inputValue, setInputValue }) {
  const textareaRef = useRef(null);

  const handleChange = e => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <div className="w-full h-full overflow-hidden ">
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        placeholder="Every great design starts with a single word..."
        className="w-full h-full px-4 bg-transparent text-white  placeholder:text-white/30
                   resize-none outline-none text-[17px] leading-relaxed tracking-tight font-medium
                   scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20
                   overflow-auto"
      />
    </div>
  );
}
