// src/hooks/useLocalStorage.js

import { useState, useCallback, useRef, useEffect } from 'react';

export const STORAGE_KEYS = {
  EDITOR_STATE: 'glyphic_editor_state',
  THEME: 'glyphic_theme',
  CUSTOM_COLORS: 'glyphic_custom_colors',
  FONT: 'glyphic_font',
  TYPOGRAPHY: 'glyphic_typography',
  VIEWPORT: 'glyphic_viewport',
  TEXTURE: 'glyphic_texture',
};

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep a ref to the latest storedValue to avoid recreating setValue
  const storedValueRef = useRef(storedValue);
  useEffect(() => {
    storedValueRef.current = storedValue;
  }, [storedValue]);

  // Stable setter that does not depend on storedValue
  const setValue = useCallback(
    value => {
      try {
        const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  ); // No dependency on storedValue

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
