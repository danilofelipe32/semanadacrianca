
import React from 'react';
import type { PartyTheme } from '../types';

interface ThemeCardProps {
  theme: PartyTheme;
}

const icons = [
  '🎨', '🚀', '🦸', '🧜‍♀️', '🦖', '🦄', '🔬', '🌍', '🤖', '🏰'
];

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{randomIcon}</span>
        <h3 className="text-xl font-bold text-gray-800">{theme.themeName}</h3>
      </div>
      <p className="text-gray-600 flex-grow">{theme.description}</p>
    </div>
  );
};
