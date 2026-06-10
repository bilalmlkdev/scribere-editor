// utils/editorHelpers.js

export const DEFAULT_FONT_SIZE = 16;
export const DEFAULT_CANVAS_RADIUS = 18;
export const DEFAULT_LINE_HEIGHT = 2.0;
export const DEFAULT_PADDING = 52;
export const DEFAULT_BG_COLOR = '#FFFFFF'; // placeholder, actual from themes
export const DEFAULT_TEXT_COLOR = '#000000';

export const getCanvasSize = viewportSize => ({
  width: viewportSize.width,
  height: viewportSize.height,
});
