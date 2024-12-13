import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

interface ExperienceProps {
  items: ExperienceItem[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: (items: ExperienceItem[]) => void;
}

export function Experience({ items, isEditing, onEdit, onSave }: ExperienceProps) {
  const [experienceItems, setExperienceItems] = React.useState<ExperienceItem[]>(items);

  const handleAddItem = () => {
    setExperienceItems([
      ...experienceItems,
      {
        id: crypto.randomUUID(),
        company: '',
        position: '',
        responsibilities: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setExperienceItems(experienceItems.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof ExperienceItem, value: string) => {
    setExperienceItems(
      experienceItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(experienceItems);
  };

  if (!isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            Edit
          </button>
        </div>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">{item.position}</h3>
              </div>
              <p className="text-gray-700 mb-2">{item.company}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span>{item.startDate} - {item.endDate}</span>
              </div>
              <p className="text-gray-600 whitespace-pre-line">{item.responsibilities}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
      <div className="space-y-6">
        {experienceItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => handleUpdateItem(item.id, 'company', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => handleUpdateItem(item.id, 'position', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Responsibilities
                </label>
                <textarea
                  value={item.responsibilities}
                  onChange={(e) => handleUpdateItem(item.id, 'responsibilities', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={item.startDate}
                    onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={item.endDate}
                    onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="w-full px-4 py-2 text-sm border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 text-gray-600 hover:text-gray-700"
        >
          Add Experience
        </button>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}