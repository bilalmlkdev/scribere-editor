import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ToolbarDropdown({ isOpen, onClose, trigger, children, align = 'left' }) {
  const triggerRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState(200);

  // Update dropdown position when open or scroll/resize
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const gap = 8;

      let left = rect.left;
      let top = rect.bottom + gap;

      const width = dropdownRef.current ? dropdownRef.current.offsetWidth : dropdownWidth;

      if (align === 'center') {
        left = rect.left + rect.width / 2 - width / 2;
      } else if (align === 'right') {
        left = rect.right - width;
      }

      // Viewport boundary check
      const viewportWidth = window.innerWidth;
      if (left + width > viewportWidth) left = viewportWidth - width - 8;
      if (left < 8) left = 8;

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, align, dropdownWidth]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        const dropdownEl = document.getElementById('toolbar-dropdown-portal');
        if (dropdownEl && dropdownEl.contains(event.target)) return;
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Measure dropdown width after render
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      setDropdownWidth(dropdownRef.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} className="inline-block">
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            id="toolbar-dropdown-portal"
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 99999,
            }}
            className="bg-[#121214] border border-[#27272a] rounded-xl p-1.5 shadow-2xl"
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}
