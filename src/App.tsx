import React from 'react';
import { FileText, ArrowUp } from 'lucide-react';
import { EditableField } from './components/EditableField';
import { CVPreview } from './components/CVPreview';
import { Languages } from './components/sections/Languages';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certifications } from './components/sections/Certifications';
import type { CVData, LanguageItem, SkillItem, ProjectItem, CertificationItem, EducationItem, ExperienceItem } from './types';

const defaultData: CVData = {
  generalInfo: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    links: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev',
    }
  },
  languages: [
    {
      id: '1',
      language: 'English',
      proficiency: 'Native',
    },
    {
      id: '2',
      language: 'Spanish',
      proficiency: 'Professional Working',
    }
  ],
  skills: [
    {
      id: '1',
      category: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    },
    {
      id: '2',
      category: 'Frameworks & Libraries',
      skills: ['React', 'Node.js', 'Express', 'Django'],
    }
  ],
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      location: 'Stanford, CA',
      startDate: '2018-09',
      endDate: '2020-06',
    },
    {
      id: '2',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Berkeley, CA',
      startDate: '2014-09',
      endDate: '2018-05',
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      responsibilities: 'Led a team of 5 engineers developing cloud infrastructure solutions\nImplemented scalable microservices architecture\nReduced system latency by 40%',
      startDate: '2020-07',
      endDate: '2024-03',
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Software Engineer',
      location: 'Redmond, WA',
      responsibilities: 'Developed and maintained core Azure services\nCollaborated with cross-functional teams\nImplemented CI/CD pipelines',
      startDate: '2018-06',
      endDate: '2020-06',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Cloud Infrastructure Platform',
      description: 'Developed a scalable cloud infrastructure platform serving 1M+ users\nImplemented auto-scaling and load balancing features\nReduced operational costs by 30%',
      location: 'Remote',
      technologies: ['AWS', 'Kubernetes', 'Docker', 'Node.js'],
      startDate: '2023-01',
      endDate: '2023-12',
      link: 'https://github.com/johndoe/cloud-platform'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      location: 'Online',
      date: '2023-06',
      expiryDate: '2026-06',
      link: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/'
    }
  ]
};

function App() {
  const [data, setData] = React.useState<CVData>(defaultData);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateGeneralInfo = (field: keyof typeof data.generalInfo, value: any) => {
    setData((prev) => ({
      ...prev,
      generalInfo: {
        ...prev.generalInfo,
        [field]: value,
      },
    }));
  };

  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: crypto.randomUUID(),
      language: '',
      proficiency: '',
    };
    setData((prev) => ({
      ...prev,
      languages: [...prev.languages, newItem],
    }));
  };

  const addSkill = () => {
    const newItem: SkillItem = {
      id: crypto.randomUUID(),
      category: '',
      skills: [],
    };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newItem],
    }));
  };

  const addProject = () => {
    const newItem: ProjectItem = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      location: '',
      technologies: [],
      startDate: '',
      endDate: '',
    };
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newItem],
    }));
  };

  const addCertification = () => {
    const newItem: CertificationItem = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      location: '',
    };
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newItem],
    }));
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
    };
    setData((prev) => ({
      ...prev,
      education: [...prev.education, newItem],
    }));
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      responsibilities: '',
      startDate: '',
      endDate: '',
    };
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newItem],
    }));
  };

  const removeItem = (section: keyof CVData, id: string) => {
    setData((prev) => {
      const sectionData = prev[section];
      if (Array.isArray(sectionData)) {
        return {
          ...prev,
          [section]: sectionData.filter((item: any) => item.id !== id),
        };
      }
      return prev;
    });
  };

  const updateItem = (section: keyof CVData, id: string, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Editor Panel */}
        <div className="w-1/2 min-h-screen p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
            </div>

            <div className="space-y-8">
              {/* General Information */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <EditableField
                    value={data.generalInfo.name}
                    onChange={(value) => updateGeneralInfo('name', value)}
                    placeholder="Full Name"
                  />
                  <EditableField
                    value={data.generalInfo.title}
                    onChange={(value) => updateGeneralInfo('title', value)}
                    placeholder="Professional Title"
                  />
                  <EditableField
                    value={data.generalInfo.email}
                    onChange={(value) => updateGeneralInfo('email', value)}
                    placeholder="Email"
                  />
                  <EditableField
                    value={data.generalInfo.phone}
                    onChange={(value) => updateGeneralInfo('phone', value)}
                    placeholder="Phone"
                  />
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Professional Links</h3>
                    <EditableField
                      value={data.generalInfo.links.linkedin || ''}
                      onChange={(value) => updateGeneralInfo('links', { ...data.generalInfo.links, linkedin: value })}
                      placeholder="LinkedIn URL"
                    />
                    <EditableField
                      value={data.generalInfo.links.github || ''}
                      onChange={(value) => updateGeneralInfo('links', { ...data.generalInfo.links, github: value })}
                      placeholder="GitHub URL"
                    />
                    <EditableField
                      value={data.generalInfo.links.portfolio || ''}
                      onChange={(value) => updateGeneralInfo('links', { ...data.generalInfo.links, portfolio: value })}
                      placeholder="Portfolio URL"
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <Languages
                items={data.languages}
                onAdd={addLanguage}
                onRemove={(id) => removeItem('languages', id)}
                onUpdate={(id, field, value) => updateItem('languages', id, field, value)}
              />

              {/* Skills */}
              <Skills
                items={data.skills}
                onAdd={addSkill}
                onRemove={(id) => removeItem('skills', id)}
                onUpdate={(id, field, value) => updateItem('skills', id, field, value)}
              />

              {/* Education */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    Add Education
                  </button>
                </div>
                <div className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="relative p-4 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => removeItem('education', edu.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                      <div className="space-y-4">
                        <EditableField
                          value={edu.school}
                          onChange={(value) => updateItem('education', edu.id, 'school', value)}
                          placeholder="School Name"
                        />
                        <EditableField
                          value={edu.degree}
                          onChange={(value) => updateItem('education', edu.id, 'degree', value)}
                          placeholder="Degree"
                        />
                        <EditableField
                          value={edu.location}
                          onChange={(value) => updateItem('education', edu.id, 'location', value)}
                          placeholder="Location"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateItem('education', edu.id, 'startDate', e.target.value)}
                            className="p-2 border rounded-md"
                          />
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateItem('education', edu.id, 'endDate', e.target.value)}
                            className="p-2 border rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Experience</h2>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    Add Experience
                  </button>
                </div>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="relative p-4 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => removeItem('experience', exp.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                      <div className="space-y-4">
                        <EditableField
                          value={exp.company}
                          onChange={(value) => updateItem('experience', exp.id, 'company', value)}
                          placeholder="Company Name"
                        />
                        <EditableField
                          value={exp.position}
                          onChange={(value) => updateItem('experience', exp.id, 'position', value)}
                          placeholder="Position"
                        />
                        <EditableField
                          value={exp.location}
                          onChange={(value) => updateItem('experience', exp.id, 'location', value)}
                          placeholder="Location"
                        />
                        <EditableField
                          value={exp.responsibilities}
                          onChange={(value) => updateItem('experience', exp.id, 'responsibilities', value)}
                          placeholder="Responsibilities (separate with new lines)"
                          className="whitespace-pre-wrap"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)}
                            className="p-2 border rounded-md"
                          />
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)}
                            className="p-2 border rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <Projects
                items={data.projects}
                onAdd={addProject}
                onRemove={(id) => removeItem('projects', id)}
                onUpdate={(id, field, value) => updateItem('projects', id, field, value)}
              />

              {/* Certifications */}
              <Certifications
                items={data.certifications}
                onAdd={addCertification}
                onRemove={(id) => removeItem('certifications', id)}
                onUpdate={(id, field, value) => updateItem('certifications', id, field, value)}
              />
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 min-h-screen bg-gray-200 p-8 overflow-y-auto relative">
          <CVPreview data={data} />
          <div className="text-center text-gray-500 mt-8 mb-16">
            © {new Date().getFullYear()} CV Builder. All rights reserved.
          </div>
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;