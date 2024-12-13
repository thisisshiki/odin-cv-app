import React from 'react';
import { Wrench } from 'lucide-react';
import { EditableField } from '../EditableField';
import type { SkillItem } from '../../types';

interface SkillsProps {
  items: SkillItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof SkillItem, value: string | string[]) => void;
}

export function Skills({ items, onAdd, onRemove, onUpdate }: SkillsProps) {
  const handleSkillsChange = (id: string, value: string) => {
    onUpdate(id, 'skills', value.split(',').map((s) => s.trim()));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Skills</h2>
        </div>
        <button
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          Add Skill Category
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
            <div className="space-y-4">
              <EditableField
                value={item.category}
                onChange={(value) => onUpdate(item.id, 'category', value)}
                placeholder="Category (e.g., Programming Languages)"
              />
              <EditableField
                value={item.skills.join(', ')}
                onChange={(value) => handleSkillsChange(item.id, value)}
                placeholder="Skills (comma-separated)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}