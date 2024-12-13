import React from 'react';
import { FolderGit2 } from 'lucide-react';
import { EditableField } from '../EditableField';
import type { ProjectItem } from '../../types';

interface ProjectsProps {
  items: ProjectItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ProjectItem, value: string | string[]) => void;
}

export function Projects({ items, onAdd, onRemove, onUpdate }: ProjectsProps) {
  const handleTechnologiesChange = (id: string, value: string) => {
    onUpdate(id, 'technologies', value.split(',').map((t) => t.trim()));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Projects</h2>
        </div>
        <button
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          Add Project
        </button>
      </div>
      <div className="space-y-6">
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
                value={item.name}
                onChange={(value) => onUpdate(item.id, 'name', value)}
                placeholder="Project Name"
              />
              <EditableField
                value={item.description}
                onChange={(value) => onUpdate(item.id, 'description', value)}
                placeholder="Project Description"
                className="whitespace-pre-wrap"
              />
              <EditableField
                value={item.technologies.join(', ')}
                onChange={(value) => handleTechnologiesChange(id, value)}
                placeholder="Technologies Used (comma-separated)"
              />
              <EditableField
                value={item.link || ''}
                onChange={(value) => onUpdate(item.id, 'link', value)}
                placeholder="Project Link (optional)"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="month"
                  value={item.startDate}
                  onChange={(e) => onUpdate(item.id, 'startDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
                <input
                  type="month"
                  value={item.endDate}
                  onChange={(e) => onUpdate(item.id, 'endDate', e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}