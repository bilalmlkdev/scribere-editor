// components/EditorMobile.jsx

import { useState } from 'react';
import { RiEdit2Line } from 'react-icons/ri';
import { LuImage } from 'react-icons/lu';
import { FiGithub } from 'react-icons/fi';
import CanvasControls from '../controls/CanvasControls';
import InputArea from '../InputArea';
import TextToolbar from '../toolbar/TextToolbar';
import Canvas from '../canvas/Canvas';

export const EditorMobile = ({
  canvasProps,
  controlProps,
  inputValue,
  setInputValue,
  textareaRef,
  toolbarFontSize,
  onToolbarFontSizeChange,
  defaultFontSize,
}) => {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-3 mt-1 pb-4">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex-shrink-0 px-0.5 sm:px-0">
          <CanvasControls {...controlProps} />
        </div>

        <div className={`flex-shrink-0 ${activeTab === 'preview' ? 'hidden sm:block' : ''}`}>
          <TextToolbar
            textareaRef={textareaRef}
            onFontSizeChange={onToolbarFontSizeChange}
            currentFontSize={toolbarFontSize}
            defaultFontSize={defaultFontSize}
          />
        </div>

        <div className="flex-1 min-h-0 bg-black/10">
          {activeTab === 'editor' ? (
            <InputArea
              inputValue={inputValue}
              setInputValue={setInputValue}
              ref={textareaRef}
              fontSize={toolbarFontSize}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
                <Canvas {...canvasProps} />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-1 p-0.5 px-3.5 sm:px-4 border-b border-gray-100/10 pb-2.5">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-1.5! rounded-[10px] text-[14px] font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === 'editor'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <RiEdit2Line size={17} />
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5! rounded-[10px] text-[14px] font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === 'preview'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LuImage size={17} />
            Preview
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 px-3.5 sm:px-4">
          <button className="px-3 flex items-center justify-center gap-1 py-2 text-xs bg-white/80 text-black rounded-[8px] font-medium transition-colors">
            <FiGithub size={16} />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};
