import { forwardRef } from 'react';

// Parse formatted text to HTML
const parseFormattedText = text => {
  if (!text) return '';

  let html = text;

  // Handle existing HTML tags first - preserve them
  // Bold: **text** or <b>text</b>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>');

  // Italic: *text* or <i>text</i>
  html = html.replace(/\*(?!\*)(.*?)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/<i>(.*?)<\/i>/g, '<em>$1</em>');

  // Underline: <u>text</u>
  html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');

  // Strikethrough: ~~text~~ or <s>text</s> or <del>text</del>
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
  html = html.replace(/<s>(.*?)<\/s>/g, '<del>$1</del>');
  html = html.replace(/<del>(.*?)<\/del>/g, '<del>$1</del>');

  // Font size: <size=24>text</size>
  html = html.replace(/<size=(\d+)>(.*?)<\/size>/g, '<span style="font-size: $1px">$2</span>');

  // Headings: <h1>text</h1>
  html = html.replace(
    /<h1>(.*?)<\/h1>/g,
    '<h1 style="font-size: 2em; font-weight: bold; margin: 0.5em 0;">$1</h1>',
  );
  html = html.replace(
    /<h2>(.*?)<\/h2>/g,
    '<h2 style="font-size: 1.5em; font-weight: bold; margin: 0.5em 0;">$1</h2>',
  );
  html = html.replace(
    /<h3>(.*?)<\/h3>/g,
    '<h3 style="font-size: 1.2em; font-weight: bold; margin: 0.5em 0;">$1</h3>',
  );

  // Markdown headings
  html = html.replace(
    /^# (.*?)$/gm,
    '<h1 style="font-size: 2em; font-weight: bold; margin: 0.5em 0;">$1</h1>',
  );
  html = html.replace(
    /^## (.*?)$/gm,
    '<h2 style="font-size: 1.5em; font-weight: bold; margin: 0.5em 0;">$1</h2>',
  );
  html = html.replace(
    /^### (.*?)$/gm,
    '<h3 style="font-size: 1.2em; font-weight: bold; margin: 0.5em 0;">$1</h3>',
  );

  // Line breaks
  html = html.replace(/\n/g, '<br/>');

  return html;
};

// Get plain text without formatting
const getPlainText = text => {
  if (!text) return '';
  let plain = text;
  plain = plain.replace(/\*\*(.*?)\*\*/g, '$1');
  plain = plain.replace(/<[^>]*>/g, '');
  plain = plain.replace(/\*(?!\*)(.*?)\*(?!\*)/g, '$1');
  plain = plain.replace(/~~(.*?)~~/g, '$1');
  plain = plain.replace(/^#{1,3} /gm, '');
  return plain;
};

const Canvas = forwardRef(
  (
    {
      inputValue,
      canvasBgColor,
      canvasBgClass,
      canvasTextColor,
      canvasTextColorClass,
      canvasFont,
      placeholderColor = 'text-gray-400',
      canvasWidth = 530,
      canvasHeight = 530,
      targetRef,
      canvasRadius,
      canvasFontSize,
      canvasTextPadding = 52,
      lineHeight,
      dropCap = false,
      textureIntensity,
      useCustomColors = false,
    },
    ref,
  ) => {
    const combinedRef = node => {
      if (ref) {
        ref.current = node;
      }
      if (targetRef) {
        targetRef.current = node;
      }
    };

    // Get plain text for drop cap
    const plainText = getPlainText(inputValue);
    const firstChar = plainText.charAt(0);
    const hasDropCap = dropCap && dropCap !== 'none' && firstChar && firstChar !== '';

    const dropCapSize = dropCap === 'standard' ? '3em' : dropCap === 'large' ? '4.5em' : '6em';

    // Parse formatted text
    const formattedHtml = parseFormattedText(inputValue);

    // Determine texture color based on background
    const getTextureColor = () => {
      if (useCustomColors && canvasBgColor) {
        const r = parseInt(canvasBgColor.slice(1, 3), 16);
        const g = parseInt(canvasBgColor.slice(3, 5), 16);
        const b = parseInt(canvasBgColor.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5 ? '#ffffff' : '#000000';
      }
      return canvasTextColor === '#FFFFFF' ? '#000000' : '#ffffff';
    };

    const textureColor = getTextureColor();

    // Render content with or without drop cap
    const renderContent = () => {
      if (hasDropCap) {
        const remainingHtml = formattedHtml.replace(firstChar, '');
        return (
          <div
            className="text-start whitespace-pre-wrap break-words"
            style={{
              fontSize: `${canvasFontSize}px`,
              lineHeight: lineHeight,
            }}
          >
            <span
              style={{
                fontSize: dropCapSize,
                lineHeight: 0.8,
                fontWeight: 'bold',
                float: 'left',
                marginRight: '0.15em',
                marginTop: '0.05em',
              }}
              className="text-inherit"
            >
              {firstChar}
            </span>
            <span dangerouslySetInnerHTML={{ __html: remainingHtml }} />
          </div>
        );
      }

      return (
        <div
          className="text-start whitespace-pre-wrap break-words"
          style={{
            fontSize: `${canvasFontSize}px`,
            lineHeight: lineHeight,
          }}
          dangerouslySetInnerHTML={{ __html: formattedHtml }}
        />
      );
    };

    return (
      <div
        ref={combinedRef}
        className={`z-0 rounded-[18px] shadow-2xl shadow-black/30 flex items-center justify-center text-start
           overflow-hidden relative group transition-all duration-300
          ${!useCustomColors && canvasBgClass} ${!useCustomColors && canvasTextColorClass}`}
        style={{
          fontFamily: canvasFont,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: `${canvasRadius}px`,
          backgroundColor: useCustomColors ? canvasBgColor : undefined,
          color: canvasTextColor,
        }}
        id="canvas"
      >
        {/* Paper Texture Overlay */}
        {textureIntensity > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${textureColor}15 0px, ${textureColor}15 2px, transparent 2px, transparent 8px)`,
              opacity: textureIntensity / 100,
            }}
          />
        )}

        {/* Subtle noise texture */}
        {textureIntensity > 30 && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: textureIntensity / 200,
            }}
          />
        )}

        {/* Scrollable Content */}
        <div
          className="h-full w-full overflow-y-auto scrollbar-none relative z-20"
          style={{
            paddingLeft: `${canvasTextPadding}px`,
            paddingRight: `${canvasTextPadding}px`,
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
        >
          <div className="min-h-full w-full flex flex-col justify-center ">
            {inputValue ? (
              renderContent()
            ) : (
              <div className="flex flex-col items-center gap-3 opacity-50 text-center">
                <span className={`${placeholderColor} text-[25px]`}>Start typing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Canvas.displayName = 'Canvas';

export default Canvas;
