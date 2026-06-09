import { useState, useRef, useEffect } from 'react';
import { TbCaretUpDownFilled, TbGenderHermaphrodite } from 'react-icons/tb';

const decorations = [
  // Dividers
  { id: 'divider1', symbol: '— ✦ —', name: 'Star Divider', category: 'divider', preview: '— ✦ —' },
  {
    id: 'divider2',
    symbol: '• · • · •',
    name: 'Dot Divider',
    category: 'divider',
    preview: '• · • · •',
  },
  { id: 'divider3', symbol: '~ * ~', name: 'Tilde Divider', category: 'divider', preview: '~ * ~' },
  { id: 'divider4', symbol: '═════', name: 'Line Divider', category: 'divider', preview: '═════' },
  {
    id: 'divider5',
    symbol: '❀ • ❀ • ❀',
    name: 'Flower Divider',
    category: 'divider',
    preview: '❀ • ❀ • ❀',
  },

  // Borders
  {
    id: 'border1',
    symbol: '✧ ˚₊‧⁺˖♡˖⁺‧₊˚ ✧',
    name: 'Sparkle Border',
    category: 'border',
    preview: '✧ ˚₊‧⁺˖♡˖⁺‧₊˚ ✧',
  },
  { id: 'border2', symbol: '⋆｡°✩', name: 'Star Border', category: 'border', preview: '⋆｡°✩' },
  {
    id: 'border3',
    symbol: '☾ ⋆*･ﾟ:⋆*･ﾟ',
    name: 'Moon Border',
    category: 'border',
    preview: '☾ ⋆*･ﾟ:⋆*･ﾟ',
  },

  // Bullets
  { id: 'bullet1', symbol: '✦', name: 'Star Bullet', category: 'bullet', preview: '✦' },
  { id: 'bullet2', symbol: '✧', name: 'White Star', category: 'bullet', preview: '✧' },
  { id: 'bullet3', symbol: '❥', name: 'Heart Bullet', category: 'bullet', preview: '❥' },
  { id: 'bullet4', symbol: '➤', name: 'Arrow Bullet', category: 'bullet', preview: '➤' },
  { id: 'bullet5', symbol: '❖', name: 'Diamond Bullet', category: 'bullet', preview: '❖' },
  { id: 'bullet6', symbol: '▪', name: 'Square Bullet', category: 'bullet', preview: '▪' },
  { id: 'bullet7', symbol: '▹', name: 'Small Arrow', category: 'bullet', preview: '▹' },

  // Flowers & Nature
  { id: 'flower1', symbol: '✿', name: 'Flower', category: 'flower', preview: '✿' },
  { id: 'flower2', symbol: '🌸', name: 'Cherry Blossom', category: 'flower', preview: '🌸' },
  { id: 'flower3', symbol: '🌼', name: 'Daisy', category: 'flower', preview: '🌼' },
  { id: 'flower4', symbol: '🌻', name: 'Sunflower', category: 'flower', preview: '🌻' },
  { id: 'flower5', symbol: '🍂', name: 'Leaf', category: 'flower', preview: '🍂' },
  { id: 'flower6', symbol: '🍃', name: 'Leaf Wind', category: 'flower', preview: '🍃' },

  // Stars & Sparkles
  { id: 'star1', symbol: '★', name: 'Star', category: 'star', preview: '★' },
  { id: 'star2', symbol: '☆', name: 'Hollow Star', category: 'star', preview: '☆' },
  { id: 'star3', symbol: '✨', name: 'Sparkle', category: 'star', preview: '✨' },
  { id: 'star4', symbol: '💫', name: 'Comet', category: 'star', preview: '💫' },
  { id: 'star5', symbol: '⚡', name: 'Lightning', category: 'star', preview: '⚡' },

  // Hearts
  { id: 'heart1', symbol: '❤️', name: 'Heart', category: 'heart', preview: '❤️' },
  { id: 'heart2', symbol: '🧡', name: 'Orange Heart', category: 'heart', preview: '🧡' },
  { id: 'heart3', symbol: '💛', name: 'Yellow Heart', category: 'heart', preview: '💛' },
  { id: 'heart4', symbol: '💚', name: 'Green Heart', category: 'heart', preview: '💚' },
  { id: 'heart5', symbol: '💙', name: 'Blue Heart', category: 'heart', preview: '💙' },
  { id: 'heart6', symbol: '💜', name: 'Purple Heart', category: 'heart', preview: '💜' },
  { id: 'heart7', symbol: '🖤', name: 'Black Heart', category: 'heart', preview: '🖤' },
  { id: 'heart8', symbol: '💕', name: 'Two Hearts', category: 'heart', preview: '💕' },
  { id: 'heart9', symbol: '💖', name: 'Sparkling Heart', category: 'heart', preview: '💖' },
  { id: 'heart10', symbol: '💗', name: 'Growing Heart', category: 'heart', preview: '💗' },

  // Arrows
  { id: 'arrow1', symbol: '→', name: 'Right Arrow', category: 'arrow', preview: '→' },
  { id: 'arrow2', symbol: '←', name: 'Left Arrow', category: 'arrow', preview: '←' },
  { id: 'arrow3', symbol: '↑', name: 'Up Arrow', category: 'arrow', preview: '↑' },
  { id: 'arrow4', symbol: '↓', name: 'Down Arrow', category: 'arrow', preview: '↓' },
  { id: 'arrow5', symbol: '↻', name: 'Refresh', category: 'arrow', preview: '↻' },
  { id: 'arrow6', symbol: '⇒', name: 'Double Right', category: 'arrow', preview: '⇒' },

  // Geometric
  { id: 'geo1', symbol: '◉', name: 'Target', category: 'geometric', preview: '◉' },
  { id: 'geo2', symbol: '○', name: 'Circle', category: 'geometric', preview: '○' },
  { id: 'geo3', symbol: '●', name: 'Filled Circle', category: 'geometric', preview: '●' },
  { id: 'geo4', symbol: '□', name: 'Square', category: 'geometric', preview: '□' },
  { id: 'geo5', symbol: '■', name: 'Filled Square', category: 'geometric', preview: '■' },
  { id: 'geo6', symbol: '△', name: 'Triangle', category: 'geometric', preview: '△' },
  { id: 'geo7', symbol: '▲', name: 'Filled Triangle', category: 'geometric', preview: '▲' },
  { id: 'geo8', symbol: '◇', name: 'Diamond', category: 'geometric', preview: '◇' },
  { id: 'geo9', symbol: '◆', name: 'Filled Diamond', category: 'geometric', preview: '◆' },

  // Musical
  { id: 'music1', symbol: '♪', name: 'Eighth Note', category: 'music', preview: '♪' },
  { id: 'music2', symbol: '♫', name: 'Beamed Note', category: 'music', preview: '♫' },
  { id: 'music3', symbol: '♩', name: 'Quarter Note', category: 'music', preview: '♩' },
  { id: 'music4', symbol: '🎵', name: 'Musical Note', category: 'music', preview: '🎵' },
  { id: 'music5', symbol: '🎶', name: 'Multiple Notes', category: 'music', preview: '🎶' },
];

const categoryIcons = {
  divider: '─',
  border: '▐',
  bullet: '•',
  flower: '🌸',
  star: '⭐',
  heart: '❤️',
  arrow: '→',
  geometric: '◈',
  music: '♪',
};

export default function Decorations({ onInsert }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('divider');
  const menuRef = useRef(null);

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

  const insertDecoration = decoration => {
    if (onInsert) {
      onInsert(decoration.symbol);
    }
    closeMenu();
  };

  const categories = [
    { id: 'divider', name: 'Dividers', icon: '─' },
    { id: 'border', name: 'Borders', icon: '▐' },
    { id: 'bullet', name: 'Bullets', icon: '•' },
    { id: 'flower', name: 'Flowers', icon: '🌸' },
    { id: 'star', name: 'Stars', icon: '⭐' },
    { id: 'heart', name: 'Hearts', icon: '❤️' },
    { id: 'arrow', name: 'Arrows', icon: '→' },
    { id: 'geometric', name: 'Geometric', icon: '◈' },
    { id: 'music', name: 'Music', icon: '♪' },
  ];

  const filteredDecorations = decorations.filter(d => d.category === selectedCategory);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-0.5 px-1.5 py-[7px] bg-white/5 border border-white/10 rounded-[8px] transition-all duration-200 group"
      >
        <TbGenderHermaphrodite
          size={14}
          className="text-white/80 group-hover:text-white transition-colors"
        />
        <span className="text-[12px] font-medium text-white/80">Decor</span>
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          className={`absolute top-full mt-1 right-0 w-[380px] bg-black backdrop-blur-md border-2 border-gray-200/10 rounded-[8px] shadow-2xl shadow-black/50 overflow-hidden z-50 transition-all duration-200 ease-out origin-top-right
            ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}`}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-white/10">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
              Decorations
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

          {/* Decorations Grid */}
          <div className="max-h-[320px] overflow-y-auto custom-scrollbar p-3">
            <div className="grid grid-cols-4 gap-2">
              {filteredDecorations.map((decoration, index) => (
                <button
                  key={decoration.id}
                  onClick={() => insertDecoration(decoration)}
                  className={`py-2 px-1 bg-white/5 rounded-[6px] transition-all duration-150
                    hover:bg-white/15 hover:scale-105 active:scale-95 group/decor
                    ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: isAnimating ? `${index * 20}ms` : '0ms' }}
                >
                  <div className="text-center">
                    <div className="text-[18px] mb-1 group-hover/decor:scale-110 transition-transform">
                      {decoration.symbol.length > 8
                        ? decoration.symbol.substring(0, 8) + '…'
                        : decoration.symbol}
                    </div>
                    <div className="text-[9px] text-white/40 truncate">{decoration.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 py-1.5 border-t border-white/10 flex justify-between">
            <span className="text-[9px] text-white/30 font-mono">
              {filteredDecorations.length} decorations
            </span>
            <span className="text-[9px] text-white/20">
              {categories.find(c => c.id === selectedCategory)?.name}
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
