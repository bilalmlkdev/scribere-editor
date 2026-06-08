import { forwardRef } from 'react';

const Canvas = forwardRef(
  (
    {
      inputValue,
      canvasBG,
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

      // Drop cap sizes based on variant
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

    return (
      <div
        ref={combinedRef}
        className={`z-0 rounded-[18px] ${canvasBG}
        ${canvasTextColorClass} shadow-2xl shadow-black/30 flex items-center justify-start text-start
        border border-white/5 overflow-hidden relative group transition-width duration-300`}
        style={{
          fontFamily: canvasFont,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: `${canvasRadius}px`,
          color: canvasTextColor,
        }}
        id="canvas"
      >
        <div
          className="h-[85%] w-full overflow-y-auto scrollbar-none relative bottom-1"
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
