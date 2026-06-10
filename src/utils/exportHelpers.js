// utils/exportHelpers.js

export const qualityMap = {
  Standard: { scale: 2, label: '2x', size: '2160×2160' },
  High: { scale: 3, label: '3x', size: '3240×3240' },
  Ultra: { scale: 4, label: '4x', size: '4320×4320' },
};

export const downloadFile = (data, filename) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = data;
  link.click();
};
