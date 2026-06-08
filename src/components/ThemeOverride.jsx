// components/ThemeOverride.jsx
import { useState } from 'react';

const themePresets = [
  {
    id: 'current',
    name: 'Current theme',
    bgColor: null, // Will use current theme's bg
    textColor: null, // Will use current theme's text
    bgValue: null,
    textValue: null,
  },
  {
    id: 'light',
    name: 'Light theme',
    bgColor: 'bg-white',
    bgValue: '#FFFFFF',
    textColor: 'text-gray-900',
    textValue: '#111827',
  },
  {
    id: 'dark',
    name: 'Dark theme',
    bgColor: 'bg-gray-900',
    bgValue: '#111827',
    textColor: 'text-gray-100',
    textValue: '#F3F4F6',
  },
  {
    id: 'sepia',
    name: 'Sepia',
    bgColor: 'bg-amber-50',
    bgValue: '#FFFBEB',
    textColor: 'text-amber-900',
    textValue: '#78350F',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    bgColor: 'bg-slate-900',
    bgValue: '#0F172A',
    textColor: 'text-slate-200',
    textValue: '#E2E8F0',
  },
  {
    id: 'forest',
    name: 'Forest',
    bgColor: 'bg-emerald-900',
    bgValue: '#064E3B',
    textColor: 'text-emerald-100',
    textValue: '#D1FAE5',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    bgColor: 'bg-orange-900',
    bgValue: '#7C2D12',
    textColor: 'text-orange-100',
    textValue: '#FFEDD5',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    bgColor: 'bg-cyan-900',
    bgValue: '#164E63',
    textColor: 'text-cyan-100',
    textValue: '#CFFAFE',
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    bgColor: 'bg-rose-50',
    bgValue: '#FFF1F2',
    textColor: 'text-rose-800',
    textValue: '#9F1239',
  },
  {
    id: 'purple',
    name: 'Purple Haze',
    bgColor: 'bg-purple-950',
    bgValue: '#3B0764',
    textColor: 'text-purple-200',
    textValue: '#E9D5FF',
  },
];

export default function ThemeOverride({ onThemeOverride, currentTheme }) {
  const [selectedPreset, setSelectedPreset] = useState('current');

  const handleChange = e => {
    const presetId = e.target.value;
    setSelectedPreset(presetId);

    const preset = themePresets.find(p => p.id === presetId);

    if (preset && preset.id !== 'current') {
      // Apply preset colors
      onThemeOverride({
        bgColor: preset.bgColor,
        bgValue: preset.bgValue,
        textColor: preset.textColor,
        textValue: preset.textValue,
      });
    } else if (preset?.id === 'current') {
      // Reset to current theme
      onThemeOverride({
        bgColor: currentTheme?.bgColor,
        bgValue: currentTheme?.bgValue,
        textColor: currentTheme?.textColor,
        textValue: currentTheme?.textValue,
      });
    }
  };

  return (
    <div className="relative">
      <select
        value={selectedPreset}
        onChange={handleChange}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-white/30 appearance-none cursor-pointer"
      >
        {themePresets.map(preset => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-3 h-3 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
