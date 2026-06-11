export const FormatSelector = ({ format, setFormat, isAnimating }) => {
  return (
    <div
      className={`transition-all duration-300 delay-200
      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <h4 className="text-xs font-medium text-white/50 mb-2">Format</h4>
      <div className="flex gap-2">
        {['PNG', 'SVG'].map(fmt => (
          <button
            key={fmt}
            onClick={() => setFormat(fmt)}
            className={`flex-1 py-2 rounded-[5px] text-sm font-medium ${
              format === fmt
                ? 'bg-white/80 text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>
    </div>
  );
};
