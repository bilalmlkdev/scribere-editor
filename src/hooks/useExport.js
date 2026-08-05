// hooks/useExport.js

import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { qualityMap, downloadFile } from '../utils/exportHelpers';

export const useExport = (targetRef, format, quality) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPNG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    const scale = qualityMap[quality].scale;

    try {
      const originalWidth = targetRef.current.offsetWidth;
      const originalHeight = targetRef.current.offsetHeight;

      const options = {
        quality: 1,
        pixelRatio: scale,
        width: originalWidth * scale,
        height: originalHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${originalWidth}px`,
          height: `${originalHeight}px`,
        },
      };

      const dataUrl = await htmlToImage.toPng(targetRef.current, options);
      const filename = `Scribere-export-${Date.now()}.png`;
      downloadFile(dataUrl, filename);
    } catch (error) {
      console.error('PNG export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsSVG = async () => {
    if (!targetRef?.current) {
      console.error('Target element not found');
      return;
    }

    setIsExporting(true);
    try {
      const svgElement = targetRef.current.querySelector('svg');
      if (svgElement) {
        const clonedSvg = svgElement.cloneNode(true);
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(clonedSvg);
        svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
        const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        const filename = `Scribere-export-${Date.now()}.svg`;
        downloadFile(dataUrl, filename);
      } else {
        const dataUrl = await htmlToImage.toSvg(targetRef.current, { quality: 1 });
        downloadFile(dataUrl, `Scribere-export-${Date.now()}.svg`);
      }
    } catch (error) {
      console.error('SVG export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (format === 'PNG') {
      exportAsPNG();
    } else {
      exportAsSVG();
    }
  };

  return { isExporting, handleExport };
};
