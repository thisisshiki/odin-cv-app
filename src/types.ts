export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface SkillItem {
  id: string;
  category: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  location: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  location: string;
  date: string;
  expiryDate?: string;
  link?: string;
}

export interface GeneralInfo {
  name: string;
  email: string;
  phone: string;
  title: string;
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    other?: string;
  };
}

export interface CVData {
  generalInfo: GeneralInfo;
  languages: LanguageItem[];
  skills: SkillItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}