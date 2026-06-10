import FontSelector from './FontSelector';
import LineHeight from './LineHeight';
import DropCap from './DropCap';
import Padding from './Padding';
import KaomojiSelector from './KaomojiSelector';
import Decorations from './Decorations';
import CanvasThemeColors from './CanvasThemeColors';

export default function CanvasControls({
  onFontChange,
  canvasFont,
  onLineHeightChange,
  currentLineHeight,
  onDropCapChange,
  currentDropCap,
  onPaddingChange,
  currentPadding,
  onKaomojiInsert,
  onDecorationInsert,
  onThemeColorsChange,
  currentBg,
  currentText,
  onTextureChange,
  currentTexture,
}) {
  return (
    <div className="px-4 border-b border-white/20 w-full pt-3.5 pb-3.5 flex items-center gap-2 flex-wrap">
      <FontSelector onFontChange={onFontChange} currentFont={{ fontFamily: canvasFont }} />

      <LineHeight onLineHeightChange={onLineHeightChange} currentLineHeight={currentLineHeight} />
      <DropCap onDropCapChange={onDropCapChange} currentDropCap={currentDropCap} />
      <CanvasThemeColors
        onThemeChange={onThemeColorsChange}
        currentBg={currentBg}
        currentText={currentText}
        onTextureChange={onTextureChange}
        currentTexture={currentTexture}
      />
      <Padding onPaddingChange={onPaddingChange} currentPadding={currentPadding} />
      <span className="h-8 w-[1px] bg-white/10 hidden md:flex"></span>
      <KaomojiSelector onInsert={onKaomojiInsert} />
      <Decorations onInsert={onDecorationInsert} />
    </div>
  );
}
