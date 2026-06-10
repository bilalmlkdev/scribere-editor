// components/PreviewBox.jsx

import Canvas from '../canvas/Canvas';

export const PreviewBox = ({
  displayProps,
  inputValue,
  canvasFont,
  placeholderColor,
  canvasTextPadding,
  lineHeight,
  dropCap,
  textureIntensity,
  canvasFontSize,
  isAnimating,
}) => {
  return (
    <div
      className={`relative transition-all duration-300 delay-100 flex flex-col items-center hidden md:flex
      ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className="w-full flex items-center mb-2 justify-start pl-4">
        <span className="text-[12px] font-medium text-white/80">Preview</span>
      </div>

      <div className="relative w-full overflow-x-auto md:w-[320px] md:h-[320px] md:overflow-hidden flex justify-center">
        <div className="inline-block max-w-full">
          <Canvas
            inputValue={inputValue}
            canvasBgColor={displayProps.isCustom ? displayProps.bgColorValue : null}
            canvasBgClass={!displayProps.isCustom ? displayProps.bgClass : ''}
            canvasTextColor={displayProps.textColorValue}
            canvasTextColorClass={!displayProps.isCustom ? displayProps.textColorClass : ''}
            canvasFont={canvasFont}
            placeholderColor={placeholderColor}
            canvasWidth={530}
            canvasHeight={530}
            canvasRadius={0}
            canvasFontSize={canvasFontSize}
            canvasTextPadding={canvasTextPadding}
            lineHeight={lineHeight}
            dropCap={dropCap}
            textureIntensity={textureIntensity}
            useCustomColors={displayProps.isCustom}
          />
        </div>
      </div>
    </div>
  );
};
