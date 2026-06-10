<div align="center">
  <img src="public/glyphicLogo.svg" alt="Glyphic Logo" width="96" height="96" />

# Glyphic

A browser based text design tool for creating typographic visuals.
<br />
Write content, customize styling, and export publication-ready images.

<p align="center">
  <img src="https://img.shields.io/badge/Status-active-amber?style=flat&color=9B72FF" />
  <img src="https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-9B72FF?style=flat" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-9B72FF?style=flat" />
  <img src="https://img.shields.io/badge/License-MIT-9B72FF?style=flat" />
  <a href="https://github.com/byllzz">
    <img src="https://img.shields.io/badge/Author-Bilal%20Malik-9B72FF?style=flat" />
  </a>
  <img src="https://img.shields.io/badge/Latest%20Release-10%20June%202026-9B72FF.svg" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-9B72FF?style=flat" />
</p>

<br />

<a href="https://useglyphic.vercel.app">
  <img
    src="https://img.shields.io/badge/%20Launch%20Glyphic-Live%20Demo-9B72FF?style=flat"
    alt="Live Demo"
  />
</a>

</div>
<br>
<p align="center">
  <img src="./public/editor.png" alt="Glyphic Editor" width="100%" />
</p>

<p align="start">
⭐ <strong>Star the repository if Glyphic saves you from fighting CSS for your next typography project.</strong>
</p>


## Overview

Glyphic is a browser-based typography design tool built for creators, developers, writers, and designers who need beautiful text compositions without opening a full design suite.

Instead of navigating dozens of menus and layers, Glyphic focuses on typography first:

- Write content
- Style selected text
- Apply curated themes
- Adjust spacing and layout
- Export publication-ready visuals

Everything runs entirely in the browser.

Your content is never uploaded to a server.

---

## Why Glyphic Exists

Most typography workflows fall into one of two categories:

### Traditional Design Tools

Powerful but often excessive for typography-focused content.

- Complex interfaces
- Large project files
- Steep learning curves

### Social Media Design Tools

Easy to use but limited.

- Account requirements
- Restricted customization
- Export limitations

Glyphic bridges that gap by providing:

- A focused typography workflow
- Real-time editing
- High-quality exports
- Local-first privacy
- Zero setup

---

## Highlights

| | |
|---|---|
|  Real-Time Editing | Every keystroke updates instantly |
|  25+ Themes | Carefully curated typography themes |
|  20+ Fonts | Serif, Sans, Mono, Handwriting & more |
|  Responsive Viewports | Social, desktop, mobile formats |
|  Theme Overrides | Fully customizable colors |
|  PNG Export | High-resolution image output |
|  SVG Export | Vector-based exports |
|  Privacy First | No uploads, no accounts |

---

# Features

## Core Editing

### Live Canvas Preview

Changes are reflected instantly while typing.

### Rich Text Toolbar

Apply formatting to selected text only.

Supported formatting:

- Bold
- Italic
- Underline
- Strikethrough
- Headings
- Lists
- Text case transformations
- Font sizing

### Smart Editing Workflow

Built to feel fast and distraction-free while maintaining flexibility.

---

## Typography Controls

### Font Library

Choose from 20+ curated Google Fonts:

- Serif
- Sans Serif
- Monospace
- Handwriting
- Decorative

### Advanced Spacing Controls

Fine tune:

- Line height
- Letter spacing
- Word spacing
- Internal padding

### Drop Caps

Create editorial-style layouts using:

- Standard
- Large
- Huge

drop cap presets.

---

## Theme System

### Preset Themes

Includes more than 25 typography-focused themes:

- Serif
- Sans
- Mono
- Terminal
- Vintage
- Modern
- Code
- Editorial

Each theme contains:

- Background color
- Text color
- Placeholder styling

### Theme Overrides

Customize:

- Background color
- Text color
- Texture intensity

without affecting preset definitions.

---

## Creative Tools

### Kaomoji Library

Insert expressive characters directly at the cursor position.

Examples:

```text
(｡◕‿◕｡)
(╯°□°）╯︵ ┻━┻
(づ｡◕‿‿◕｡)づ
```

### Decorations

Quickly insert:

- Dividers
- Bullets
- Stars
- Hearts
- Arrows
- Musical notes

### Paper Texture

Add subtle grain and noise overlays.

Range:

```text
0% → Clean
100% → Heavy texture
```

---

## Export System

### PNG Export

Export high-resolution images using:

- 2x scale
- 3x scale
- 4x scale

Supports exports up to:

```text
4320 × 4320
```

### SVG Export

Generate vector-based exports for:

- Printing
- Scaling
- Editing elsewhere

### Export Theme Override

Change export colors independently from the editor canvas.

---

## Accessibility & UX

### Responsive Layout

Desktop:

```text
Editor | Preview
```

Mobile:

```text
Editor Tab
Preview Tab
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|---------|
| Ctrl + B | Bold |
| Ctrl + I | Italic |
| Ctrl + U | Underline |

### Smart UI Behavior

- Click outside to close
- Consistent modal interactions
- Mobile-friendly controls

---

# How It Works

```text
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

---

# Architecture

## Canvas Layer

Responsible for:

- Rendering content
- Theme application
- Typography styles
- Texture overlays
- Viewport rendering

---

## Theme Layer

Handles:

- Theme presets
- Theme overrides
- Random theme generation
- Color management

---

## Export Layer

Built using:

```text
html-to-image
```

Responsible for:

- PNG generation
- SVG generation
- Export scaling
- Export color overrides

---

# Component Reference

| Component | Responsibility |
|------------|----------------|
| Canvas | Typography rendering |
| TextToolbar | Formatting actions |
| Themes | Theme gallery |
| ThemeColors | Theme customization |
| ViewPorts | Canvas dimensions |
| FontSelector | Font management |
| FontSize | Text sizing |
| LineHeight | Vertical rhythm |
| DropCap | Editorial styling |
| Padding | Layout spacing |
| KaomojiSelector | Symbol insertion |
| Decorations | Decorative elements |
| ExportOptions | Export pipeline |
| Navbar | Global actions |

---

# Project Structure

```bash
glyphic/
├── public/
├── src/
│
├── components/
├── data/
├── App.jsx
├── main.jsx
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| React | UI Architecture |
| Vite | Build Tooling |
| Tailwind CSS | Styling |
| html-to-image | Export Engine |
| React Icons | Icons |
| Vercel | Hosting |

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/glyphic.git
cd glyphic
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

---

# Development Guide

## Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Preview the production build locally.

---

## Folder Conventions

### components/

Reusable UI building blocks.

### data/

Fonts, themes, and configuration data.

### public/

Static assets and screenshots.

---

# Contributing

Contributions of all sizes are welcome.

Whether you're fixing a typo, adding a theme, improving accessibility, or introducing a new feature, your help is appreciated.

---

## Areas That Need Help

### Themes

Add new typography themes.

File:

```bash
src/data/themes.js
```

### Fonts

Expand the font library.

File:

```bash
src/data/fonts.js
```

### Accessibility

Examples:

- Better keyboard navigation
- Screen reader support
- Improved focus states

### Export Features

Ideas:

- Custom dimensions
- PDF export
- Batch exports

### Mobile Experience

- Better touch interactions
- Improved layouts
- Responsive refinements

---

## Development Workflow

### 1. Fork Repository

Create your own fork.

### 2. Create Branch

```bash
git checkout -b feat/my-feature
```

### 3. Implement Changes

Make focused changes.

### 4. Test Locally

```bash
npm run dev
```

### 5. Build Project

```bash
npm run build
```

### 6. Commit

Use conventional commits:

```bash
feat: add custom viewport preset

fix: resolve svg export issue

docs: improve contribution guide

refactor: simplify toolbar logic
```

### 7. Open Pull Request

Submit a PR with:

- Description
- Screenshots (if UI changed)
- Testing notes

---

# Pull Request Checklist

Before opening a PR:

- [ ] Builds successfully
- [ ] No console errors
- [ ] Existing features still work
- [ ] Documentation updated
- [ ] UI changes include screenshots
- [ ] Accessibility considered

---

# Roadmap

## Planned

- [ ] Custom canvas dimensions
- [ ] User-created themes
- [ ] Theme import/export
- [ ] Undo / Redo
- [ ] Text shadows
- [ ] Gradient backgrounds
- [ ] Template library
- [ ] Keyboard shortcuts guide

## Future Exploration

- [ ] PDF export
- [ ] Saved projects
- [ ] Cloud sync
- [ ] Collaboration features

---

# Privacy

Glyphic is designed with a local-first approach.

- No accounts
- No tracking
- No analytics
- No content uploads
- No server-side rendering

Your content remains on your device.

---

# Performance Notes

- Rendering happens entirely in the browser.
- Exports are generated locally.
- Large exports may require additional memory.
- No network requests are needed for editing.

---

# Acknowledgements

Built with the open-source ecosystem:

- React
- Vite
- Tailwind CSS
- html-to-image
- React Icons

Thanks to every contributor helping improve Glyphic.

---

# License

This project is licensed under the MIT License.

See [LICENSE](./LICENSE) for details.
