import { useState } from 'react';
import Navbar from './components/Navbar';
import InputArea from './components/InputArea';
import ExtraOptions from './components/ExtraOptions';

export default function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full max-w-[1150px] mx-auto h-full flex flex-col">
        <Navbar />

        <div className="grid grid-cols-2 flex-1 min-h-0">
          {/* Left Column */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            <div className="flex-shrink-0">
              <ExtraOptions />
            </div>

            {/* Input Area */}
            <div className="flex-1 min-h-0">
              <InputArea />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            {/* Canvas will go here */}
            <div className="flex-1 min-h-0 border-l border-gray-200/20 flex items-center justify-center">
              <div
                className="w-full max-w-[92%] mx-auto rounded-[18px] bg-white min-h-[525px] flex items-center justify-center text-black"
                id="canvas"
              >
                1 ||
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
