// hooks/useExportPanel.js

import { useState, useRef, useEffect } from 'react';

export const useExportPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef(null);

  const openPanel = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closePanel = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closePanel();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return { isOpen, isAnimating, panelRef, openPanel, closePanel };
};
