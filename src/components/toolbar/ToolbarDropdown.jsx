// components/toolbar/ToolbarDropdown.jsx

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ToolbarDropdown({ isOpen, onClose, trigger, children, align = 'left' }) {
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [ready, setReady] = useState(false);

  // Force a synchronous position update after the dropdown is in the DOM
  useLayoutEffect(() => {
    if (!isOpen) {
      setReady(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (triggerRef.current && dropdownRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const gap = 8;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = triggerRect.left;
        if (align === 'center') {
          left = triggerRect.left + triggerRect.width / 2 - dropdownRect.width / 2;
        } else if (align === 'right') {
          left = triggerRect.right - dropdownRect.width;
        }
        left = Math.max(gap, Math.min(left, viewportWidth - dropdownRect.width - gap));

        let top = triggerRect.bottom + gap;
        if (top + dropdownRect.height > viewportHeight - gap) {
          top = triggerRect.top - dropdownRect.height - gap;
        }
        top = Math.max(gap, Math.min(top, viewportHeight - dropdownRect.height - gap));

        setPosition({ top, left });
        setReady(true);
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [isOpen, align, children]);

  // Re-position on scroll/resize
  useEffect(() => {
    if (!isOpen || !ready) return;

    const updatePosition = () => {
      if (!triggerRef.current || !dropdownRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const gap = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = triggerRect.left;
      if (align === 'center') {
        left = triggerRect.left + triggerRect.width / 2 - dropdownRect.width / 2;
      } else if (align === 'right') {
        left = triggerRect.right - dropdownRect.width;
      }
      left = Math.max(gap, Math.min(left, viewportWidth - dropdownRect.width - gap));

      let top = triggerRect.bottom + gap;
      if (top + dropdownRect.height > viewportHeight - gap) {
        top = triggerRect.top - dropdownRect.height - gap;
      }
      top = Math.max(gap, Math.min(top, viewportHeight - dropdownRect.height - gap));

      setPosition({ top, left });
    };

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, ready, align]);

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = event => {
      const isInsideTrigger = triggerRef.current?.contains(event.target);
      const isInsideDropdown = dropdownRef.current?.contains(event.target);
      if (!isInsideTrigger && !isInsideDropdown) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [isOpen, onClose]);

  /* REMOVED: if (!isOpen) return null; */

  return (
    <>
      {/* The trigger wrapper is ALWAYS rendered so the buttons show up in your toolbar */}
      <div ref={triggerRef} className="inline-block">
        {trigger}
      </div>

      {/* The dropdown portal is only rendered when isOpen is true */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 99999,
              visibility: ready ? 'visible' : 'hidden',
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
