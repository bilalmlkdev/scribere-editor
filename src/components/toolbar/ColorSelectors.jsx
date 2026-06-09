import { FiEdit2, FiDroplet, FiCheck } from 'react-icons/fi';
import ToolbarDropdown from './ToolbarDropdown';

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

export function TextColorSelector({ isOpen, setIsOpen, activeColor, onSelect }) {
  return (
    <ToolbarDropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      align="center"
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <FiEdit2
            size={14}
            style={{ color: activeColor !== 'default' ? activeColor : undefined }}
          />
        </button>
      }
    >
      <div className="w-48 p-1">
        <div className="text-[10px] font-bold tracking-wider text-zinc-500 mb-2 px-1">
          TEXT COLOR
        </div>
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => {
              onSelect('default', '#ffffff');
              setIsOpen(false);
            }}
            className="w-6 h-6 rounded-full border border-zinc-700 relative flex items-center justify-center bg-zinc-900"
          >
            <div className="w-7 h-0.5 bg-red-500 absolute rotate-45" />
          </button>
          {textColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(color, color);
                setIsOpen(false);
              }}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-full border border-black/40 hover:scale-110 transition-transform flex items-center justify-center"
            >
              {activeColor === color && (
                <FiCheck className="w-3 h-3 text-black mix-blend-difference" />
              )}
            </button>
          ))}
        </div>
      </div>
    </ToolbarDropdown>
  );
}

export function HighlightSelector({ isOpen, setIsOpen, activeColor, onSelect }) {
  return (
    <ToolbarDropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      align="center"
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <FiDroplet
            size={14}
            style={{ color: activeColor !== 'none' ? activeColor : undefined }}
          />
        </button>
      }
    >
      <div className="w-52 p-1">
        <div className="text-[10px] font-bold tracking-wider text-zinc-500 mb-2 px-1">
          HIGHLIGHT
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          <button
            onClick={() => {
              onSelect('none', 'transparent');
              setIsOpen(false);
            }}
            className="w-6 h-6 rounded-full border border-zinc-700 relative flex items-center justify-center bg-zinc-900"
          >
            <div className="w-7 h-0.5 bg-red-500 absolute rotate-45" />
          </button>
          {highlightColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelect(color, color);
                setIsOpen(false);
              }}
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-md hover:scale-105 transition-transform flex items-center justify-center"
            >
              {activeColor === color && <FiCheck className="w-3 h-3 text-black" />}
            </button>
          ))}
        </div>
      </div>
    </ToolbarDropdown>
  );
}
