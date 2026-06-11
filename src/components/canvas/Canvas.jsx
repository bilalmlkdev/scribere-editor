import { forwardRef } from 'react';
import { parseFormattedText } from '../../utils/textFormatter';
import { useTextureColor } from '../../hooks/useTextureColor';
import { TextureOverlay } from './TextureOverlay';
import { CanvasContent } from './CanvasContent';

const Canvas = forwardRef(
  (
    {
      inputValue,
      canvasBgColor,
      canvasBgClass,
      canvasTextColor,
      canvasTextColorClass,
      canvasFont,
      placeholderColor = 'text-gray-400',
      canvasWidth = 530,
      canvasHeight = 530,
      targetRef,
      canvasRadius,
      canvasFontSize,
      canvasTextPadding = 52,
      lineHeight,
      dropCap = false,
      textureIntensity,
      useCustomColors = false,
    },
    ref,
  ) => {
    const combinedRef = node => {
      if (ref) ref.current = node;
      if (targetRef) targetRef.current = node;
    };

    const textureColor = useTextureColor(useCustomColors, canvasBgColor);
    const formattedHtml = parseFormattedText(inputValue);

    return (
      <div
        ref={combinedRef}
        className={`z-0 shadow-2xl shadow-black/30 flex items-center justify-center text-start
          overflow-hidden relative group transition-all duration-300 w-full h-full
          ${canvasBgClass} ${canvasTextColorClass}`}
        style={{
          fontFamily: canvasFont,
          maxWidth: `${canvasWidth}px`,
          maxHeight: `${canvasHeight}px`,
          aspectRatio: `${canvasWidth} / ${canvasHeight}`,
          borderRadius: `${canvasRadius}px`,
          ...(useCustomColors && canvasBgColor ? { backgroundColor: canvasBgColor } : {}),
          ...(useCustomColors && canvasTextColor ? { color: canvasTextColor } : {}),
        }}
        id="canvas"
      >
        <TextureOverlay intensity={textureIntensity} color={textureColor} />

        <div
          className="h-full w-full overflow-y-auto scrollbar-none relative z-20"
          style={{
            paddingLeft: `${canvasTextPadding}px`,
            paddingRight: `${canvasTextPadding}px`,
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
        >
          <div className="min-h-full w-full flex flex-col justify-center">
            {inputValue ? (
              <CanvasContent
                htmlContent={formattedHtml}
                dropCap={dropCap}
                fontSize={canvasFontSize}
                lineHeight={lineHeight}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 opacity-50 text-center">
                <span className={`${placeholderColor} text-[25px]`}>Start typing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';

export default Canvas;
