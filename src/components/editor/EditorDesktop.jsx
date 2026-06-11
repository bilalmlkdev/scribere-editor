import CanvasControls from '../controls/CanvasControls';
import InputArea from '../InputArea';
import Canvas from '../canvas/Canvas';

export const EditorDesktop = ({
  canvasProps,
  controlProps,
  inputValue,
  setInputValue,
  textareaRef,
  toolbarFontSize,
}) => {
  return (
    <div className="grid grid-cols-2 flex-1 min-h-0">
      <div className="flex flex-col gap-3 h-full min-h-0">
        <div className="flex-shrink-0">
          <CanvasControls {...controlProps} />
        </div>
        <div className="flex-1 min-h-0">
          <InputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            ref={textareaRef}
            fontSize={toolbarFontSize}
          />
        </div>
      </div>

      <div className="flex flex-col h-full min-h-0 items-center justify-center border-l border-zinc-800/60 p-6">
        <Canvas {...canvasProps} />
      </div>
    </div>
  );
};
