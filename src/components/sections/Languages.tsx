import React from 'react';
import { Globe } from 'lucide-react';
import { EditableField } from '../EditableField';
import type { LanguageItem } from '../../types';

interface LanguagesProps {
  items: LanguageItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof LanguageItem, value: string) => void;
}

export function Languages({ items, onAdd, onRemove, onUpdate }: LanguagesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Languages</h2>
        </div>
        <button
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          Add Language
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="relative p-4 border border-gray-200 rounded-lg">
            <button
              onClick={() => onRemove(item.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <div className="grid grid-cols-2 gap-4">
              <EditableField
                value={item.language}
                onChange={(value) => onUpdate(item.id, 'language', value)}
                placeholder="Language"
              />
              <EditableField
                value={item.proficiency}
                onChange={(value) => onUpdate(item.id, 'proficiency', value)}
                placeholder="Proficiency Level"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}