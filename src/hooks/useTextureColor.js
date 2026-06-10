// hooks/useTextureColor.js

export const useTextureColor = (useCustomColors, canvasBgColor) => {
  if (!useCustomColors || !canvasBgColor) return '#ffffff';

  const r = parseInt(canvasBgColor.slice(1, 3), 16);
  const g = parseInt(canvasBgColor.slice(3, 5), 16);
  const b = parseInt(canvasBgColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? '#ffffff' : '#000000';
};
