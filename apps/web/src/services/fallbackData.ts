import { PortfolioProfile, SkillCategory, ExperienceEntry, ProjectsResponse } from '../types';

export const FALLBACK_PROFILE: PortfolioProfile = {
  name: 'Bhumireddy Tharun Reddy',
  shortName: 'Tharun Reddy',
  tagline: 'Aspiring Software Development Engineer | Passionate in Backend, Scalable Systems, and AI/ML',
  title: ' ',
  location: 'Visakhapatnam, India',
  email: 'tharunreddy.b24@iiits.in',
  availability: 'Open for internship and freelance roles',
  responseTime: 'Usually within 12 hours',
  education: 'B.Tech CSE - IIIT Sri City (CGPA 9.3/10)',
  githubUsername: 'TharunReddy0309',
  links: {
    github: 'https://github.com/TharunReddy0309',
    linkedin: 'https://www.linkedin.com/in/bhumireddy-tharun-reddy-531363324/',
    leetcode: 'https://leetcode.com/u/TharunReddy_09/',
    resume: 'Resume.pdf',
  },
  bio: [
    'Delivering scalable full-stack platforms and intelligent AI-driven systems engineered for high performance, with a strong foundation in Data Structures and Algorithms shaped through consistent LeetCode practice.',
    'Passionate about <strong>backend engineering</strong>, <strong>scalable system design</strong>, and <strong>database architecture</strong> - focused on building reliable, high-performance systems under real-world constraints.',
    'Deeply interested in distributed systems, API architecture, Gen AI integrations, and writing clean production-grade code. Constantly learning to balance efficiency, maintainability, and user impact.',
  ],
  roles: [
    { title: 'Full Stack Dev', icon: 'code' },
    { title: 'System Engineer', icon: 'server' },
    { title: 'AI / ML Engineer', icon: 'brain' },
    { title: 'Problem Solver', icon: 'puzzle' },
  ],
};

const skillIconsBaseUrl = 'https://skillicons.dev/icons?i=';

const SKILL_NAME_MAPPING: Record<string, string> = {
  'HTML 5': 'html',
  'CSS 3': 'css',
  'JavaScript': 'js',
  'TypeScript': 'ts',
  'React JS': 'react',
  'Node.js': 'nodejs',
  'NestJS': 'nestjs',
  'Express.js': 'express',
  'Flask': 'flask',
  'FastAPI': 'fastapi',
  'MongoDB': 'mongodb',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgres',
  'REST APIs': 'postman',
  'Python': 'py',
  'PyTorch': 'pytorch',
  'HuggingFace': 'huggingface',
  'Scikit-Learn': 'sklearn',
  'Pandas': 'pandas',
  'NumPy': 'numpy',
  'OpenAI API': 'openai',
  'LangChain': 'langchain',
  'Git': 'git',
  'Docker': 'docker',
  'Postman': 'postman',
  'Supabase': 'supabase',
  'Figma': 'figma',
  'Jira' : 'jira',
};

const enrichSkills = (categories: any[]): SkillCategory[] => {
  return categories.map((category) => ({
    ...category,
    items: category.items.map((skill: any) => {
      const skillName = SKILL_NAME_MAPPING[skill.name] || skill.name.toLowerCase().replace(/\s+/g, '-');
      return {
        name: skill.name,
        logo: skillName,
        logoUrl: `${skillIconsBaseUrl}${skillName}`,
      };
    }),
  }));
};

const rawSkills = [
  {
    category: 'Frontend',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,.1)',
    items: [
      { name: 'HTML 5' },
      { name: 'CSS 3' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React JS' },
      { name: 'Figma' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    category: 'Backend',
    color: '#34d399',
    bg: 'rgba(52,211,153,.1)',
    items: [
      { name: 'Node.js' },
      { name: 'NestJS' },
      { name: 'Express.js' },
      { name: 'Flask' },
      { name: 'FastAPI' },
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'AI / ML',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,.1)',
    items: [
      { name: 'Python' },
      { name: 'PyTorch' },
      { name: 'HuggingFace' },
      { name: 'Scikit-Learn' },
      { name: 'Pandas' },
      { name: 'tensorflow' },
      { name: 'NumPy' },
      { name: 'OpenAI API' },
      { name: 'LangChain' },
    ],
  },
  {
    category: 'Tools and DevOps',
    color: '#fb923c',
    bg: 'rgba(251,146,60,.1)',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Linux' },
      { name: 'Docker' },
      { name : 'Jira'},
      { name: 'Postman' },
      { name: 'Supabase' },
    ],
  },
];

export const FALLBACK_SKILLS: SkillCategory[] = enrichSkills(rawSkills);

export const FALLBACK_EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Teaching Assistant',
    company: 'Indian Institute of Information Technology Sri City',
    type: 'Full-time',
    period: 'Jan 2026 - May 2026 - 5 mos',
    location: 'India - On-site',
    url: 'https://www.linkedin.com/in/bhumireddy-tharun-reddy-531363324/',
    description:
      'Mentored students in Data Structures and Algorithms and Signals and Systems laboratory sessions by providing clear explanations of core concepts, guiding them through algorithm design and problem-solving techniques, and assisting with practical implementation using MATLAB. Supported students in debugging code, understanding computational logic, and strengthening their analytical and programming skills.',
    skills: ['DSA', 'MATLAB', 'Mentoring', 'Algorithms'],
  },
];

const projectOverrides: Record<string, {
  displayName?: string;
  description?: string;
  tags?: string[];
  category?: string;
  wip?: boolean;
  featured?: boolean;
}> = {
  '21_DineTime-Devs': {
    displayName: 'Restaurant Reservation and Capacity Management',
    description:
      'Full-stack platform with live table availability tracking, automated reservation lifecycle management, and role-based dashboards for customers, staff, and administrators.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    category: 'Full Stack',
  },
  'Brain-Computer-Interface': {
    displayName: 'Cognitive Stress Detection and Intent Classification',
    description:
      'BCI system detecting cognitive stress and intent from EEG signals using SAM40 and BCI Competition IV 2a with EEGNet and ShallowConvNet pipelines.',
    tags: ['PyTorch', 'EEGNet', 'MNE', 'Deep Learning'],
    category: 'AI / ML',
  },
  ERP_GatePass: {
    displayName: 'Hostel Gatepass Management System',
    tags: ['Node.js', 'MongoDB', 'React', 'Express'],
    description:
      'A digital platform automating the granting, approving, and tracking of student movement with a structured digital workflow. It features role-based access, a multi-step approval chain, cryptographic QR codes, audit trails, and automated violation flagging.',
    category: 'Full Stack',
    wip: true,
  },
  INTELLIGRADER: {
    displayName: 'IntelliGrader - AI Education Platform',
    description:
      'Syrotech Hackathon 2025 winner with PDF summarization, chatbot doubt resolution, AI answer evaluation, and personalized recommendations.',
    tags: ['OpenAI API', 'LangChain', 'Streamlit', 'PostgreSQL'],
    category: 'AI / ML',
    featured: true,
  },
};

export const getFallbackProjects = (username: string): ProjectsResponse => {
  const cleanUsername = username.trim();
  const allProjects = Object.entries(projectOverrides).map(([name, override]) => {
    return {
      id: name,
      name,
      displayName: override.displayName || name,
      description: override.description || '',
      category: override.category || 'Projects',
      tags: override.tags || [],
      url: `https://github.com/${cleanUsername}/${name}`,
      liveUrl: undefined,
      image: `https://opengraph.githubassets.com/portfolio/${cleanUsername}/${name}`,
      language: override.tags?.[0],
      stars: 0,
      forks: 0,
      dynamicSource: 'manual' as const,
      featured: override.featured,
      wip: override.wip,
    };
  });

  return {
    username: cleanUsername,
    source: 'manual',
    count: allProjects.length,
    projects: allProjects,
  };
};
