import React from 'react';
import { User, Mail, Phone, Briefcase, Link as LinkIcon } from 'lucide-react';
import { EditableField } from '../EditableField';
import type { GeneralInfo as GeneralInfoType } from '../../types';

interface GeneralInfoProps {
  info: GeneralInfoType;
  onUpdate: (field: keyof GeneralInfoType | 'links', value: any) => void;
}

export function GeneralInfo({ info, onUpdate }: GeneralInfoProps) {
  const handleLinkUpdate = (key: keyof GeneralInfoType['links'], value: string) => {
    onUpdate('links', { ...info.links, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-400" />
          <EditableField
            value={info.name}
            onChange={(value) => onUpdate('name', value)}
            placeholder="Full Name"
          />
        </div>
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <EditableField
            value={info.title}
            onChange={(value) => onUpdate('title', value)}
            placeholder="Professional Title"
          />
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <EditableField
            value={info.email}
            onChange={(value) => onUpdate('email', value)}
            placeholder="Email"
          />
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <EditableField
            value={info.phone}
            onChange={(value) => onUpdate('phone', value)}
            placeholder="Phone"
          />
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Professional Links</span>
          </div>
          <div className="space-y-3 pl-6">
            <EditableField
              value={info.links.linkedin || ''}
              onChange={(value) => handleLinkUpdate('linkedin', value)}
              placeholder="LinkedIn URL"
            />
            <EditableField
              value={info.links.github || ''}
              onChange={(value) => handleLinkUpdate('github', value)}
              placeholder="GitHub URL"
            />
            <EditableField
              value={info.links.portfolio || ''}
              onChange={(value) => handleLinkUpdate('portfolio', value)}
              placeholder="Portfolio URL"
            />
            <EditableField
              value={info.links.other || ''}
              onChange={(value) => handleLinkUpdate('other', value)}
              placeholder="Other URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
}