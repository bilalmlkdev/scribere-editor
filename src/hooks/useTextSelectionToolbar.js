// hooks/useTextSelectionToolbar.js

import { useState, useEffect, useRef } from 'react';

export const useTextSelectionToolbar = (textareaRef, isMobile) => {
  const [toolbarState, setToolbarState] = useState({
    visible: false,
    top: 0,
    left: 0,
  });
  const toolbarRef = useRef(null);

  useEffect(() => {
    const editor = textareaRef.current;
    if (!editor) return;

    const evaluateSelection = () => {
      if (isMobile) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      if (!editor.contains(selection.anchorNode) && !editor.contains(selection.focusNode)) {
        setToolbarState(prev => ({ ...prev, visible: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const spaceOffset = 40;
      let targetTop = rect.top - spaceOffset;
      let targetLeft = rect.left + rect.width / 2;

      const toolbarWidth = toolbarRef.current?.offsetWidth ?? 440;
      const halfToolbar = toolbarWidth / 2;
      const screenMargin = 12;

      targetLeft = Math.max(
        halfToolbar + screenMargin,
        Math.min(window.innerWidth - halfToolbar - screenMargin, targetLeft),
      );

      if (targetTop < screenMargin) {
        targetTop = rect.bottom + 12;
      }

      setToolbarState({ visible: true, top: targetTop, left: targetLeft });
    };

    const handleGlobalMouseUp = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setTimeout(evaluateSelection, 10);
    };
    const handleGlobalKeyUp = () => setTimeout(evaluateSelection, 10);
    const handleGlobalMouseDown = e => {
      if (e.target.closest('[data-context-toolbar="true"]')) return;
      setToolbarState(prev => ({ ...prev, visible: false }));
    };
    const handleSelectionChange = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setToolbarState(prev => ({ ...prev, visible: false }));
        }
      }, 10);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('keyup', handleGlobalKeyUp);
    document.addEventListener('mousedown', handleGlobalMouseDown);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('keyup', handleGlobalKeyUp);
      document.removeEventListener('mousedown', handleGlobalMouseDown);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isMobile, textareaRef]);

  return { toolbarState, toolbarRef };
};
