import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface EducationProps {
  items: EducationItem[];
  isEditing: boolean;
  onEdit: () => void;
  onSave: (items: EducationItem[]) => void;
}

export function Education({ items, isEditing, onEdit, onSave }: EducationProps) {
  const [educationItems, setEducationItems] = React.useState<EducationItem[]>(items);

  const handleAddItem = () => {
    setEducationItems([
      ...educationItems,
      {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setEducationItems(educationItems.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof EducationItem, value: string) => {
    setEducationItems(
      educationItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(educationItems);
  };

  if (!isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          >
            Edit
          </button>
        </div>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-800">{item.school}</h3>
              </div>
              <p className="text-gray-600 mb-2">{item.degree}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{item.startDate} - {item.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
      <div className="space-y-6">
        {educationItems.map((item) => (
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
                  School Name
                </label>
                <input
                  type="text"
                  value={item.school}
                  onChange={(e) => handleUpdateItem(item.id, 'school', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdateItem(item.id, 'degree', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          Add Education
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