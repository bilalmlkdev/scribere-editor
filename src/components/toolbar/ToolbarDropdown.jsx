import { useEffect, useRef } from 'react';

export default function ToolbarDropdown({ isOpen, onClose, trigger, children, align = 'left' }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const alignClass =
    align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {trigger}
      {isOpen && (
        <div
          className={`absolute top-10 ${alignClass} bg-[#121214] border border-[#27272a] rounded-xl p-1.5 shadow-2xl z-[9999] animate-in fade-in slide-in-from-top-1 duration-100`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
