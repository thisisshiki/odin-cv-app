import React from 'react';
import { Award } from 'lucide-react';
import { EditableField } from '../EditableField';
import type { CertificationItem } from '../../types';

interface CertificationsProps {
  items: CertificationItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof CertificationItem, value: string) => void;
}

export function Certifications({ items, onAdd, onRemove, onUpdate }: CertificationsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Certifications</h2>
        </div>
        <button
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          Add Certification
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
                placeholder="Certification Name"
              />
              <EditableField
                value={item.issuer}
                onChange={(value) => onUpdate(item.id, 'issuer', value)}
                placeholder="Issuing Organization"
              />
              <EditableField
                value={item.link || ''}
                onChange={(value) => onUpdate(item.id, 'link', value)}
                placeholder="Certification Link (optional)"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="month"
                  value={item.date}
                  onChange={(e) => onUpdate(item.id, 'date', e.target.value)}
                  className="p-2 border rounded-md"
                  placeholder="Issue Date"
                />
                <input
                  type="month"
                  value={item.expiryDate || ''}
                  onChange={(e) => onUpdate(item.id, 'expiryDate', e.target.value)}
                  className="p-2 border rounded-md"
                  placeholder="Expiry Date (optional)"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}