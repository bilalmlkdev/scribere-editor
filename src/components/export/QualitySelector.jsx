// components/Export/QualitySelector.jsx

import { qualityMap } from '../../utils/exportHelpers';

export const QualitySelector = ({ quality, setQuality, isAnimating }) => {
  return (
    <div
      className={`mb-5 transition-all duration-300 delay-100
      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <h4 className="text-xs font-medium text-white/50 mb-2">Quality</h4>
      <div className="space-y-1 sm:space-x-1.5 flex flex-col sm:flex-row items-center justify-between">
        {Object.entries(qualityMap).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setQuality(key)}
            className={`w-full flex flex-col items-center justify-between gap-2 px-3 py-2.5 rounded-[5px] ${
              quality === key
                ? 'bg-white/80 text-black border border-white/20'
                : 'bg-transparent border border-gray-200/20 hover:bg-white/5'
            }`}
          >
            <span className="text-sm font-medium">{key}</span>
            <span className="text-xs">
              {val.label} - {val.size}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
