// Sumber data halaman CV. Edit file ini saja untuk memperbarui isi website.

export interface ExperienceItem {
  role: string
  company: string
  type: string
  period: string
  location: string
  highlights: string[]
  current?: boolean
}

export interface EducationItem {
  degree: string
  school: string
  period: string
  gpa?: string
}

export const profile = {
  name: 'Muhammad Rizky Ibrahim',
  headline: 'IT Application Support | Web Developer',
  location: 'Bekasi, West Java, Indonesia',
  email: 'rizky66ibrahim@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rizky66ibrahim',
  about: [
    'With a bachelor\'s degree in Informatics Engineering, I work as an IT Application Support Specialist, focusing on seamless EOD processes, resolving technical issues, and supporting SIT/UAT testing while implementing new technologies and enhancing operational efficiency.',
    'Previously, I worked as a Web Developer, building RESTful APIs and developing websites with frameworks like VueJS and Laravel. Proficient in PHP, JavaScript, CSS, and SQL, I excel at delivering impactful solutions and thrive in both individual and team-oriented environments.'
  ],
  summary: 'Web Developer with 1 year of work experience, with deep knowledge of PHP, CSS, JavaScript, TypeScript, and frameworks such as React, Angular, VueJS, Laravel, and NestJS. Able to work independently or in a team, and ready to learn new things to continuously develop skills.'
}

export const experience: ExperienceItem[] = [
  {
    role: 'Information Technology Application Support',
    company: 'PT Midas Daya Teknologi',
    type: 'Full-time',
    period: 'Mar 2024 - Present',
    location: 'Matraman, Jakarta · Hybrid',
    current: true,
    highlights: [
      'Supporting EOD processes and resolving technical issues.',
      'Supporting SIT and UAT testing.',
      'Implementing new technologies and improving operational efficiency.'
    ]
  },
  {
    role: 'Web Developer',
    company: 'OpenCloud',
    type: 'Contract',
    period: 'May 2022 - Jun 2023',
    location: 'Tangerang, Banten',
    highlights: [
      'Built RESTful APIs as the communication protocol for web applications.',
      'Built and maintained websites using predefined frameworks.',
      'Collaborated with analysts and designers to deliver effective web solutions.',
      'Delivered websites that met the agreed specifications and deadlines.'
    ]
  },
  {
    role: 'Customer Service Representative',
    company: 'Bumame Farmasi',
    type: 'Part-time',
    period: 'Jan 2022 - Mar 2022',
    location: 'Jakarta',
    highlights: [
      'Built good relationships with customers and handled their complaints.',
      'Coordinated with seniors and other teams to resolve customer complaints.',
      'Advised customers on purchasing products or services.'
    ]
  },
  {
    role: 'IT Support',
    company: 'PT Mega Finance',
    type: 'Apprenticeship',
    period: 'Oct 2019 - Mar 2020',
    location: 'Jakarta',
    highlights: [
      'Checked computers and servers regularly.',
      'Ensured software ran properly.',
      'Ensured stable internet connectivity.'
    ]
  }
]

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Informatics Engineering',
    school: 'Nusa Mandiri University, Jakarta',
    period: 'January 2022',
    gpa: 'GPA 2.88'
  }
]

export const skills = {
  technical: ['PHP', 'JavaScript', 'TypeScript', 'CSS', 'SQL', 'MySQL', 'PostgreSQL', 'React', 'Angular', 'VueJS', 'Laravel', 'NestJS'],
  nonTechnical: ['Creativity', 'Problem Solving', 'Working independently and in a team', 'Quick learning ability']
}

export const certificates = ['CCNA Security', 'WordPress E-commerce']

export const languages = [
  { name: 'English', level: 'Intermediate' },
  { name: 'Indonesian', level: 'Current' }
]
