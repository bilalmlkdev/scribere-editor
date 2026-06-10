// components/ExportButton.jsx

export const ExportButton = ({ format, isExporting, onExport, isAnimating }) => {
  return (
    <div
      className={`py-4 border-t w-full border-white/10 flex justify-end mt-4
      transition-all duration-300 delay-250
      ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <button
        onClick={onExport}
        disabled={isExporting}
        className="flex items-center justify-center gap-2 w-full text-center px-5 py-2 bg-white/80 rounded-[5px] hover:bg-white/90 text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isExporting ? 'Exporting...' : `Export ${format}`}</span>
      </button>
    </div>
  );
};
