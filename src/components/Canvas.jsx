import { forwardRef } from 'react';

const Canvas = forwardRef(
  (
    {
      inputValue,
      canvasBgColor, // inline style color (for custom colors)
      canvasBgClass, // Tailwind class (for theme colors)
      canvasTextColor,
      canvasTextColorClass,
      canvasFont,
      placeholderColor = 'text-gray-400',
      canvasWidth = 500,
      canvasHeight = 500,
      targetRef,
      canvasRadius = 18,
      canvasFontSize = 28,
      canvasTextPadding = 13,
      lineHeight = 2.0,
      dropCap = false,
      textureIntensity = 65,
      useCustomColors = false,
    },
    ref,
  ) => {
    const combinedRef = node => {
      if (ref) {
        ref.current = node;
      }
      if (targetRef) {
        targetRef.current = node;
      }
    };

    // Function to render text with drop cap
    const renderTextWithDropCap = text => {
      if (!dropCap || dropCap === 'none' || !text || text.length === 0) {
        return (
          <p
            className="text-start whitespace-pre-wrap break-words"
            style={{
              fontSize: `${canvasFontSize}px`,
              lineHeight: lineHeight,
            }}
          >
            {text}
          </p>
        );
      }

      const firstChar = text.charAt(0);
      const restOfText = text.slice(1);

      const dropCapSize = dropCap === 'standard' ? '3em' : dropCap === 'large' ? '4.5em' : '6em';
      const dropCapLineHeight = dropCap === 'standard' ? 0.8 : dropCap === 'large' ? 0.75 : 0.7;

      return (
        <p
          className="text-start whitespace-pre-wrap break-words"
          style={{
            fontSize: `${canvasFontSize}px`,
            lineHeight: lineHeight,
          }}
        >
          <span
            style={{
              fontSize: dropCapSize,
              lineHeight: dropCapLineHeight,
              fontWeight: 'bold',
              float: 'left',
              marginRight: '0.15em',
              marginTop: '0.05em',
              marginBottom: '-0.05em',
            }}
            className="text-inherit"
          >
            {firstChar}
          </span>
          {restOfText}
        </p>
      );
    };

    // Determine texture color (lighter or darker than bg)
    const getTextureColor = () => {
      if (useCustomColors && canvasBgColor) {
        // For custom colors, check if bg is dark
        const r = parseInt(canvasBgColor.slice(1, 3), 16);
        const g = parseInt(canvasBgColor.slice(3, 5), 16);
        const b = parseInt(canvasBgColor.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5 ? '#ffffff' : '#000000';
      }
      // For theme colors, use contrast
      return canvasTextColor === '#FFFFFF' ? '#000000' : '#ffffff';
    };

    const textureColor = getTextureColor();

    return (
      <div
        ref={combinedRef}
        className={`z-0 rounded-[18px] shadow-2xl shadow-black/30 flex items-center justify-start text-start
          border border-white/5 overflow-hidden relative group transition-all duration-300
          ${!useCustomColors && canvasBgClass} ${!useCustomColors && canvasTextColorClass}`}
        style={{
          fontFamily: canvasFont,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: `${canvasRadius}px`,
          backgroundColor: useCustomColors ? canvasBgColor : undefined,
          color: canvasTextColor,
        }}
        id="canvas"
      >
        {/* Paper Texture Overlay */}
        {textureIntensity > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${textureColor}15 0px, ${textureColor}15 2px, transparent 2px, transparent 8px)`,
              opacity: textureIntensity / 100,
            }}
          />
        )}

        {/* Subtle noise texture */}
        {textureIntensity > 30 && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: textureIntensity / 200,
            }}
          />
        )}

        {/* Scrollable Content */}
        <div
          className="h-[85%] w-full overflow-y-auto scrollbar-none relative bottom-1 z-20"
          style={{ paddingLeft: `${canvasTextPadding}px`, paddingRight: `${canvasTextPadding}px` }}
        >
          <div className="min-h-full w-full flex flex-col justify-center">
            {inputValue ? (
              renderTextWithDropCap(inputValue)
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
