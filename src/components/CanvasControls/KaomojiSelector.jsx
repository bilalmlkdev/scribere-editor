import { useState, useRef, useEffect } from 'react';

const kaomojis = [
  // Happy
  { id: 'happy1', emoji: '(◕‿◕✿)', name: 'happy', category: 'happy' },
  { id: 'happy2', emoji: '(◕ᴗ◕✿)', name: 'happy', category: 'happy' },
  { id: 'happy3', emoji: '(◠‿◠✿)', name: 'happy', category: 'happy' },
  { id: 'happy4', emoji: '(ᵔ◡ᵔ✿)', name: 'happy', category: 'happy' },
  { id: 'happy5', emoji: '(◡‿◡✿)', name: 'happy', category: 'happy' },

  // Sad
  { id: 'sad1', emoji: '(╥﹏╥)', name: 'sad', category: 'sad' },
  { id: 'sad2', emoji: '(ಥ﹏ಥ)', name: 'sad', category: 'sad' },
  { id: 'sad3', emoji: '(╯︵╰,)', name: 'sad', category: 'sad' },
  { id: 'sad4', emoji: '(｡•́︿•̀｡)', name: 'sad', category: 'sad' },
  { id: 'sad5', emoji: '(つ﹏⊂)', name: 'sad', category: 'sad' },

  // Angry
  { id: 'angry1', emoji: '(｀Д´)', name: 'angry', category: 'angry' },
  { id: 'angry2', emoji: '(◣_◢)', name: 'angry', category: 'angry' },
  { id: 'angry3', emoji: '(╬ Ò﹏Ó)', name: 'angry', category: 'angry' },
  { id: 'angry4', emoji: '(ノಠ益ಠ)ノ', name: 'angry', category: 'angry' },
  { id: 'angry5', emoji: '(┛◉Д◉)┛', name: 'angry', category: 'angry' },

  // Writing/Drawing
  { id: 'writing1', emoji: '(φ·ω·)', name: 'writing', category: 'writing' },
  { id: 'writing2', emoji: '(¬·ω·)', name: 'writing', category: 'writing' },
  { id: 'writing3', emoji: '(·ω·)', name: 'writing', category: 'writing' },
  { id: 'writing4', emoji: '(っ·ω·)っ', name: 'writing', category: 'writing' },
  { id: 'writing5', emoji: '(･ω･)', name: 'writing', category: 'writing' },

  // Love
  { id: 'love1', emoji: '(♥‿♥)', name: 'love', category: 'love' },
  { id: 'love2', emoji: '(♡‿♡)', name: 'love', category: 'love' },
  { id: 'love3', emoji: '(❤️‿❤️)', name: 'love', category: 'love' },
  { id: 'love4', emoji: '(´❤‿❤`)', name: 'love', category: 'love' },
  { id: 'love5', emoji: '(♥ω♥)', name: 'love', category: 'love' },

  // Hello/Wave
  { id: 'hello1', emoji: '( ´ ▽ ` )', name: 'hello', category: 'hello' },
  { id: 'hello2', emoji: '(￣▽￣)ノ', name: 'hello', category: 'hello' },
  { id: 'hello3', emoji: 'ヾ(＾∇＾)', name: 'hello', category: 'hello' },
  { id: 'hello4', emoji: '(｡◕‿◕｡)ノ', name: 'hello', category: 'hello' },
  { id: 'hello5', emoji: '(＾▽＾)／', name: 'hello', category: 'hello' },

  // CC/Confirmed
  { id: 'cc1', emoji: '(´·ω·)', name: 'cc', category: 'cc' },
  { id: 'cc2', emoji: '(-ω·)', name: 'cc', category: 'cc' },
  { id: 'cc3', emoji: '(·ω·)', name: 'cc', category: 'cc' },
  { id: 'cc4', emoji: '(·ω·)', name: 'cc', category: 'cc' },
  { id: 'cc5', emoji: '(·ω)', name: 'cc', category: 'cc' },
];

// Category icons
const categoryIcons = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  writing: '✍️',
  love: '💕',
  hello: '👋',
  cc: '✅',
};

export default function KaomojiSelector({ onInsert, currentText = '' }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('happy');
  const [cursorPosition, setCursorPosition] = useState(null);
  const menuRef = useRef(null);
  const textareaRef = useRef(null);

  // Find the textarea element in the DOM
  useEffect(() => {
    if (openMenu) {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textareaRef.current = textarea;
      }
    }
  }, [openMenu]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openMenuHandler = () => {
    setOpenMenu(true);
    setTimeout(() => setIsAnimating(true), 10);
    // Get current cursor position
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setOpenMenu(false), 200);
  };

  const toggleMenu = () => {
    if (openMenu) {
      closeMenu();
    } else {
      openMenuHandler();
    }
  };

  const insertKaomoji = kaomoji => {
    if (onInsert) {
      onInsert(kaomoji.emoji);
    } else if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + kaomoji.emoji + text.substring(end);
      textarea.value = newText;
      // Trigger input event
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
      // Set new cursor position
      textarea.selectionStart = textarea.selectionEnd = start + kaomoji.emoji.length;
      textarea.focus();
    }
    closeMenu();
  };

  const categories = [
    { id: 'happy', name: 'happy', icon: '😊' },
    { id: 'sad', name: 'sad', icon: '😢' },
    { id: 'angry', name: 'angry', icon: '😠' },
    { id: 'writing', name: 'writing', icon: '✍️' },
    { id: 'love', name: 'love', icon: '💕' },
    { id: 'hello', name: 'hello', icon: '👋' },
    { id: 'cc', name: 'cc', icon: '✅' },
  ];

  const filteredKaomojis = kaomojis.filter(k => k.category === selectedCategory);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-1.5 px-2 py-[6px] bg-gray-100/10 border border-white/5 rounded-[7px]  group"
      >
        <span className="text-[8px]">(◕‿◕✿)</span>
        <span className="text-[12px] font-medium text-white">Kaomoji</span>
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 right-0 w-[320px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-white/10">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              Kaomoji
            </span>
            <span className="text-[9px] text-white/30 ml-2">Click to insert at cursor</span>
          </div>

          {/* Category Pills */}
          <div className="px-2 py-2 border-b border-white/10 flex flex-wrap gap-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-1 rounded-[6px] text-[10px] font-medium transition-all duration-150
                  ${
                    selectedCategory === cat.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Kaomoji Grid */}
          <div className="max-h-[280px] overflow-y-auto custom-scrollbar p-3">
            <div className="grid grid-cols-3 gap-2">
              {filteredKaomojis.map((kaomoji, index) => (
                <button
                  key={kaomoji.id}
                  onClick={() => insertKaomoji(kaomoji)}
                  className={`py-2 px-2 bg-white/5 rounded-[6px] transition-all duration-150
                    hover:bg-white/15 hover:scale-105 active:scale-95
                    ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: isAnimating ? `${index * 30}ms` : '0ms' }}
                >
                  <div className="text-center">
                    <div className="text-[16px] mb-0.5">{kaomoji.emoji}</div>
                    <div className="text-[9px] text-white/40 truncate">{kaomoji.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 py-1.5 border-t border-white/10">
            <span className="text-[9px] text-white/30 font-mono">
              {filteredKaomojis.length} kaomojis
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
