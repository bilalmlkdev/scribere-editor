import { FiChevronDown } from 'react-icons/fi';
import ToolbarDropdown from './ToolbarDropdown';

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

export default function FontSizeSelector({ isOpen, setIsOpen, label, onSelect }) {
  return (
    <ToolbarDropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 px-2 flex items-center gap-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
        >
          <span className="text-xs font-medium whitespace-nowrap">{label}</span>
          <FiChevronDown className="w-3 h-3 opacity-60" />
        </button>
      }
    >
      <div className="w-44 max-h-64 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold tracking-wider text-zinc-500 px-2 py-1">
          FONT SIZE
        </div>
        {fontSizes.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              onSelect(item.label, item.size);
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg text-left"
          >
            <span className={item.label === 'Default' ? 'text-zinc-400' : 'font-semibold'}>
              {item.label}
            </span>
            <span className="text-zinc-500 text-[10px]">{item.size}</span>
          </button>
        ))}
      </div>
    </ToolbarDropdown>
  );
}
