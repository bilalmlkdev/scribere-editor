// utils/textFormatter.js

export const parseFormattedText = text => {
  if (!text) return '';

  let html = text;

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(?!\*)(.*?)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/<i>(.*?)<\/i>/g, '<em>$1</em>');

  // Underline
  html = html.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');

  // Strikethrough
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
  html = html.replace(/<s>(.*?)<\/s>/g, '<del>$1</del>');
  html = html.replace(/<del>(.*?)<\/del>/g, '<del>$1</del>');

  // Custom size
  html = html.replace(/<size=(\d+)>(.*?)<\/size>/g, '<span style="font-size: $1px">$2</span>');

  // HTML headings with inline styles
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

  html = html.replace(/\n/g, '<br/>');
  return html;
};

export const getPlainText = text => {
  if (!text) return '';
  let plain = text;
  plain = plain.replace(/\*\*(.*?)\*\*/g, '$1');
  plain = plain.replace(/<[^>]*>/g, '');
  plain = plain.replace(/\*(?!\*)(.*?)\*(?!\*)/g, '$1');
  plain = plain.replace(/~~(.*?)~~/g, '$1');
  plain = plain.replace(/^#{1,3} /gm, '');
  return plain;
};
