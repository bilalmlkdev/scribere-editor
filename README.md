# <a href="https://useglyphic.vercel.app" target="_blank">Glyphic - A browser-based text design tool.</a>

<p align="left">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-9B72FF.svg?style=flat" />
  </a>
  <img src="https://img.shields.io/badge/Repository%20Status-Maintained-9B72FF.svg?style=flat" />
  <img src="https://img.shields.io/badge/Website%20Status-Online-9B72FF.svg?style=flat" />
  <a href="https://github.com/byllzz">
    <img src="https://img.shields.io/badge/Author-Bilal%20Malik-9B72FF.svg?style=flat" />
  </a>
  <a href="https://github.com/byllzz/glyphic/releases">
    <img src="https://img.shields.io/badge/Latest%20Release-10%20June%202026-9B72FF.svg" alt="Latest Release Badge" />
  </a>
</p>

[![Visit Glyphic](https://img.shields.io/badge/View-Glyphic-9B72FF?style=flat)](https://useglyphic.vercel.app)

<p align="start">
  <img src="./public/editor.png" alt="Editor preview" width="100%" />
</p>

---

## Overview

Glyphic is a typography-first design workspace that runs entirely in your browser. Write content, style selected text, apply curated themes, adjust spacing, and export high-resolution images - no accounts, no uploads, no setup required. Everything stays on your device.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Architecture](#architecture)
- [Component Reference](#component-reference)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Export Options](#export-options)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Privacy](#privacy)
- [License](#license)

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/byllzz/glyphic.git
cd glyphic
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Build & Preview

```bash
npm run build      # Create production build
npm run preview    # Preview production build locally
```

---

## Features

### Core Editing

Glyphic uses a live canvas preview that updates in real time as you type and format. The rich text toolbar applies formatting **only to the selected text**, giving you precise control over individual words, lines, or paragraphs.

Supported formatting actions:

- Bold, Italic, Underline, Strikethrough
- Headings
- Ordered and unordered lists
- Case transforms (uppercase, lowercase, title case)
- Per-selection font sizing

### Typography Controls

Fine-tune how your text sits on the canvas:

- 20+ Google Fonts (serif, sans-serif, monospace, handwriting)
- Line height
- Letter spacing
- Word spacing
- Internal padding
- Drop caps - Standard, Large, and Huge variants

### Theme System

Glyphic ships with 25+ curated themes spanning a range of styles: serif editorial, sans-serif minimal, monospace terminal, vintage, code block, and more.

Every theme supports full color overrides:

- Background color
- Text color
- Texture intensity

Themes can be applied, previewed, and overridden non-destructively. Export-time overrides are independent from the editor canvas.

### Creative Tools

**Kaomoji Library** - Insert expressive text emoticons at cursor position, e.g. `(｡◕‿◕｡)`.

**Decorative Elements** - Add inline decorative characters including:

- Dividers
- Bullets
- Stars
- Hearts
- Arrows
- Notes

**Paper Texture** - A slider from 0% (clean) to 100% (heavy grain and noise) adds a physical feel to the canvas without affecting export quality.

### Viewports

Switch between preset canvas dimensions to design for different contexts:

- Social media
- Desktop
- Mobile

---

## Export Options

Glyphic supports PNG and SVG export directly from the browser. Export-time color overrides allow you to customize the output independently from the editor.

### PNG Export

| Scale | Max Resolution |
|-------|---------------|
| 2×    | Up to 2880 × 2880 |
| 3×    | Up to 4320 × 4320 |
| 4×    | Up to 4320 × 4320 |

### SVG Export

Vector output that is print-ready and editable in design software (Figma, Illustrator, Inkscape, etc.).

---

## Keyboard Shortcuts

| Shortcut     | Action     |
|-------------|------------|
| `Ctrl + B`  | Bold       |
| `Ctrl + I`  | Italic     |
| `Ctrl + U`  | Underline  |

---

## Architecture

Glyphic is structured around three primary layers:

```
User Input
    │
    ▼
Text Toolbar
    │
    ▼
Formatting Engine
    │
    ▼
Canvas Renderer
    │
    ▼
Theme System
    │
    ▼
Export Module
    │
    ▼
PNG / SVG Output
```

### Canvas Layer

Handles rendering, typography, textures, themes, and viewport dimensions.

### Theme Layer

Manages theme presets, color overrides, random theme generation, and color state.

### Export Layer

Powered by `html-to-image`. Handles PNG scaling, SVG generation, and export-time color overrides.

---

## Component Reference

| Component           | Responsibility                        |
|---------------------|---------------------------------------|
| `Canvas`            | Typography rendering                  |
| `TextToolbar`       | Formatting actions                    |
| `Themes`            | Theme gallery                         |
| `ThemeColors`       | Custom color picker                   |
| `ViewPorts`         | Canvas dimensions                     |
| `FontSelector`      | Font selection                        |
| `FontSize`          | Font sizing                           |
| `LineHeight`        | Line spacing                          |
| `Padding`           | Internal spacing                      |
| `DropCap`           | Editorial drop cap styling            |
| `KaomojiSelector`   | Kaomoji insertion                     |
| `Decorations`       | Decorative elements                   |
| `ExportOptions`     | Export pipeline                       |
| `Navbar`            | Global actions                        |

---

## Contributing

Contributions are welcome. See the areas below for where help is most useful.

### Themes

Add or modify theme presets in:

```
src/data/themes.js
```

### Fonts

Add or modify available fonts in:

```
src/data/fonts.js
```

### Other Areas

- **Accessibility** - Keyboard navigation, screen reader support, focus management
- **Export** - Custom dimensions, PDF support, batch exports
- **Mobile** - Touch interactions, layout refinements

### Workflow

1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Develop and test: `npm run dev` / `npm run build`
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`
5. Open a pull request with a description, screenshots (if UI changed), and testing notes

### Pull Request Checklist

- [ ] No console errors
- [ ] Existing functionality remains intact
- [ ] Documentation updated
- [ ] Screenshots included for UI changes

---

## Roadmap

The following features are planned for future releases:

- Custom canvas dimensions
- User-created themes
- Theme import / export
- Undo / Redo
- Text shadows
- Gradient backgrounds
- Template library
- Keyboard shortcuts guide

---

## Privacy

Glyphic is designed to be fully local-first:

- No accounts required
- No tracking or analytics
- No content uploads
- Exports generated entirely in your browser
- Nothing leaves your device

---

## License

MIT © Bilal Malik

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.
