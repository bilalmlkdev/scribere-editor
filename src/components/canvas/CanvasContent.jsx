export const CanvasContent = ({ htmlContent, dropCap, fontSize, lineHeight }) => {
  // Determine drop-cap class based on size
  const getDropCapClass = () => {
    if (!dropCap || dropCap === 'none') return '';
    if (dropCap === 'standard') return 'drop-cap-standard';
    if (dropCap === 'large') return 'drop-cap-large';
    if (dropCap === 'huge') return 'drop-cap-huge';
    return '';
  };

  const dropCapClass = getDropCapClass();

  return (
    <div
      className={`text-start whitespace-pre-wrap break-words ${dropCapClass}`}
      style={{ fontSize: `${fontSize}px`, lineHeight }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
