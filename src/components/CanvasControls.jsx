import FontSelector from './FontSelector';
import LineHeight from './LineHeight';
import DropCap from './DropCap';
import Padding from './Padding';
import KaomojiSelector from './KaomojiSelector';
import Decorations from './Decorations';

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
}) {
  return (
    <div className="px-4 border-b border-white/20 w-full pt-4.5 pb-4.5 flex items-center gap-3 flex-wrap">
      <FontSelector onFontChange={onFontChange} currentFont={{ fontFamily: canvasFont }} />
      <LineHeight onLineHeightChange={onLineHeightChange} currentLineHeight={currentLineHeight} />
      <DropCap onDropCapChange={onDropCapChange} currentDropCap={currentDropCap} />
      <Padding onPaddingChange={onPaddingChange} currentPadding={currentPadding} />
      <KaomojiSelector onInsert={onKaomojiInsert} />
      <Decorations onInsert={onDecorationInsert} />
    </div>
  );
}
