import type { ProjectOverride } from '../projects/project.types';

export const projectOverrides: Record<string, ProjectOverride> = {
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
