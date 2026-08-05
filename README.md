<p align="center">
  <a href="https://scribere.vercel.app/">
    <img src="./public/editor.png" alt="Scribere-Editor Preview">
  </a>
</p>

<h1 align="center">Scribere-Editor</h1>

<p align="center">
  A browser-based typography workspace for creating beautiful text graphics. Write, style, theme, and export high-resolution images without accounts, uploads, or complex design software.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Status-Maintained-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Website-Online-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/React-Vite-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Latest%20Release-10%20June%202026-9B26FF?style=flat"/>
</p>

<p align="center">
  <a href="https://scribere.vercel.app/">Live Demo</a> •
  <a href="https://github.com/byllzz/scribere-editor/issues/new">Report Bug</a> •
  <a href="https://github.com/byllzz/scribere-editor/issues/new">Request Feature</a>
</p>



# About

**Scribere-Editor** is a typography-first design workspace built for creators who want to turn text into polished visuals directly in the browser.

Instead of switching between multiple design tools, Scribere-Editor combines rich text editing, theme customization, typography controls, and high-quality exports into a single workflow. Everything runs locally, keeping your content private while delivering professional-quality results.

Whether you're creating social media posts, editorial quotes, documentation graphics, presentations, or typography experiments, Scribere-Editor provides a fast and distraction-free editing experience.

---

# Features

- Rich text editor with real-time canvas preview.
- 25+ professionally designed themes.
- Advanced typography controls for spacing and layout.
- Full color customization with live preview.
- Per-selection formatting including headings, lists, bold, italic, underline, and case conversion.
- Built-in Kaomoji library and decorative symbols.
- Adjustable paper texture effects.
- Export as high-resolution PNG or scalable SVG.
- Runs entirely in your browser with no accounts or uploads.
- Local-first workflow for complete privacy.

---

# How It Works

Creating typography graphics with Scribere-Editor is simple:

1. Write your content on the live canvas.
2. Format selected text using the editing toolbar.
3. Choose a theme or customize colors and texture.
4. Export your design as PNG or SVG.

Everything is processed locally, so your content never leaves your device.

---

# Theme System

Themes define the overall appearance of your design while remaining completely customizable.

### Included Features

- 25+ handcrafted themes
- Serif, sans-serif, monospace, editorial, vintage, and minimal styles
- Live theme previews
- Background and text color overrides
- Adjustable texture intensity
- Random theme generation
- Non-destructive editing

Themes only affect the editor until you export, allowing independent export customization.

---

# Creative Tools

Scribere-Editor includes several creative utilities to speed up your workflow.

### Typography Controls

- Font family
- Font size
- Line height
- Letter spacing
- Word spacing
- Padding
- Drop caps

### Kaomoji Library

Insert expressive text emoticons directly at the cursor.

Examples:

```text
(｡◕‿◕｡)
(♥‿♥)
(╯°□°）╯︵ ┻━┻
```

### Decorative Elements

Quickly insert:

- Stars
- Hearts
- Bullets
- Dividers
- Arrows
- Notes
- Symbols

### Paper Texture

Adjust texture intensity from a perfectly clean background to a realistic paper grain without affecting export quality.

---

# Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS v4
- JavaScript (ES6+)
- html-to-image

### Export

- PNG Renderer
- SVG Generator

### Deployment

- Vercel

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,vercel" />
</p>

---
# Getting Started

Run scribere-editor locally in just a few minutes.

## Prerequisites

- Node.js v18+
- npm

## Installation

```bash
git clone https://github.com/byllzz/scribere-editor.git
cd scribere-editor
npm install
npm run dev
```

The development server will be available at:

```text
http://localhost:5173
```

---

# Build & Preview

Create an optimized production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

---

# Export Options

Scribere-Editor supports two export formats designed for different workflows.

### PNG Export

Perfect for:

- Social media
- Blog posts
- Presentations
- Websites
- Documentation

Features:

- 2×, 3×, and 4× scaling
- Up to **4320 × 4320** resolution
- High-quality raster output

### SVG Export

Ideal for:

- Figma
- Illustrator
- Printing
- Vector editing
- Infinite scaling

Both export modes support independent color overrides without modifying the editor canvas.

---

# Keyboard Shortcuts

Improve editing speed with built-in shortcuts.

- `Ctrl + B` → Bold
- `Ctrl + I` → Italic
- `Ctrl + U` → Underline

---

# Project Structure

```text
Scribere-Editor/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

# Architecture

Scribere-Editor follows a modular rendering pipeline.

```text
User Input
      │
      ▼
Formatting Toolbar
      │
      ▼
Typography Engine
      │
      ▼
Canvas Renderer
      │
      ▼
Theme System
      │
      ▼
PNG / SVG Export
```

Each module is isolated, making the application easier to maintain, extend, and test.

---

# Component Overview

The application is built from reusable feature-focused components.

### Editing

- Canvas
- TextToolbar
- FontSelector
- FontSize
- LineHeight
- Padding
- DropCap

### Themes

- Themes
- ThemeColors
- ViewPorts

### Creative Tools

- KaomojiSelector
- Decorations

### Export

- ExportOptions

### Layout

- Navbar

---

# Privacy

Scribere-Editor follows a **local-first** philosophy.

- No user accounts
- No cloud storage
- No analytics
- No tracking
- No content uploads
- Everything runs entirely inside your browser

Your designs remain private from start to finish.

---

# Roadmap

The following improvements are planned for future releases.

- Custom canvas dimensions
- Import and export custom themes
- Undo and Redo history
- Gradient backgrounds
- Text shadows and advanced effects
- Template gallery
- Expanded keyboard shortcuts
- PDF export
- Improved mobile editing experience
- Accessibility enhancements

---

# Contributing

Contributions of all sizes are welcome, from bug fixes and documentation improvements to new themes and editor features.

## Development Workflow

```bash
# Fork the repository

git checkout -b feat/your-feature

# Make your changes

npm run dev
npm run build

git commit -m "feat: add amazing feature"

git push origin feat/your-feature
```

Open a Pull Request with a clear description of your changes and include screenshots if the UI has been modified.

### Areas to Contribute

####  Themes

- Add new theme presets
- Improve existing color palettes
- Create typography-focused themes

####  Fonts

- Add new font families
- Improve font loading
- Expand typography options

#### Editor

- Rich text features
- Keyboard shortcuts
- Accessibility improvements
- Mobile experience
- Performance optimizations

#### Export

- Custom export dimensions
- Additional image formats
- Better SVG generation
- Batch exports

### Contribution Guidelines

- Follow the existing project structure.
- Keep components reusable.
- Test new features before submitting.
- Update documentation when necessary.
- Use descriptive commit messages.

---

# Author

<img src="https://github.com/byllzz.png" width="90" alt="Bilal Malik"/>

## Bilal Malik

[![GitHub](https://img.shields.io/badge/GitHub-byllzz-9B26FF?style=flat&logo=github&logoColor=white)](https://github.com/byllzz)
[![X](https://img.shields.io/badge/Twitter-@bilalmlkdev-9B26FF?style=flat&logo=x&logoColor=white)](https://x.com/bilalmlkdev)
[![Portfolio](https://img.shields.io/badge/Portfolio-bilalmlkdev.vercel.app-9B26FF?style=flat&logo=vercel&logoColor=white)](https://bilalmlkdev.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bilal%20Malik-9B26FF?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bilalmlkdev/)
[![Email](https://img.shields.io/badge/Email-bilalmlkdev@gmail.com-9B26FF?style=flat&logo=gmail&logoColor=white)](mailto:bilalmlkdev@gmail.com)

If you enjoyed this project, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future improvements.

<p align="right">
  <a href="#scribere-editor">⬆ Back to Top</a>
</p>

# License (MIT)

This project is licensed under the **MIT License**.

```text

MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software.The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
© 2026 texturae. Licensed under the MIT License.
