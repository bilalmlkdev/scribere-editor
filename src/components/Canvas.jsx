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
      height = '525px',
      targetRef,
      canvasRadius = 18,
      canvasFontSize = 28,
      canvasTextPadding = 13,
    },
    ref,
  ) => {
    // Use the ref passed from parent, or fallback to targetRef
    const combinedRef = node => {
      if (ref) {
        ref.current = node;
      }
      if (targetRef) {
        targetRef.current = node;
      }
    };

    return (
      <div
        ref={combinedRef}
        className={`z-0 w-full max-w-[96%] mx-auto rounded-[18px] ${canvasBG}
        ${canvasTextColorClass} shadow-2xl shadow-black/30 flex items-center justify-start text-start
        border border-white/5 overflow-hidden relative group`}
        style={{
          fontFamily: canvasFont,
          height: height,
          maxHeight: '100%',
          borderRadius: `${canvasRadius}px`,
          color: canvasTextColor,
        }}
        id="canvas"
      >
        {/* Scrollable Content */}
        <div
          className="h-[85%] w-full overflow-y-auto scrollbar-none relative bottom-1"
          style={{ paddingLeft: `${canvasTextPadding}px`, paddingRight: `${canvasTextPadding}px` }}
        >
          <div className="min-h-full w-full flex flex-col justify-center">
            {inputValue ? (
              <p
                className="leading-relaxed text-start whitespace-pre-wrap break-words"
                style={{ fontSize: `${canvasFontSize}px` }}
              >
                {inputValue}
              </p>
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
