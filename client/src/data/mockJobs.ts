import { Job } from '../types';

const roleTitles = [
    'Frontend Engineer',
    'Backend Developer',
    'Full Stack Engineer',
    'DevOps Engineer',
    'QA Automation Engineer',
    'Product Designer',
    'Data Analyst',
    'Data Engineer',
    'Cloud Engineer',
    'Mobile App Developer',
    'SRE Engineer',
    'Technical Writer',
    'Platform Engineer',
    'Machine Learning Engineer',
    'Security Analyst',
    'Business Analyst',
    'Growth Marketer',
    'Product Manager',
    'Engineering Manager',
    'Support Engineer',
];

const companyNames = [
    'Northstar Digital',
    'BlueOrbit Labs',
    'QuantumHive',
    'NimbusWorks',
    'DeltaForge',
    'Peakline Systems',
    'NovaGrid',
    'Orbitlane Tech',
    'CrestPoint',
    'AtlasSpring',
    'FuturaSoft',
    'BoldByte',
    'Skyline Logic',
    'HexaFlow',
    'PulseBridge',
    'SonicLayer',
    'RapidMint',
    'MosaicEdge',
    'BrightTrail',
    'CodeHarbor',
];

const locations = [
    'Remote',
    'Bangalore',
    'Delhi',
    'Mumbai',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Noida',
    'Gurgaon',
    'Kolkata',
];

const salaryRanges = [
    '$60,000 - $80,000',
    '$70,000 - $95,000',
    '$80,000 - $105,000',
    '$90,000 - $120,000',
    '$100,000 - $130,000',
    '$110,000 - $145,000',
    '$120,000 - $160,000',
    '$130,000 - $175,000',
    '$140,000 - $190,000',
    '$150,000 - $210,000',
];

const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

const generatedOpenRoles: Job[] = Array.from({ length: 100 }, (_, index) => {
    const id = `${index + 5}`;
    const title = roleTitles[index % roleTitles.length];
    const company = companyNames[index % companyNames.length];
    const location = locations[index % locations.length];
    const jobType = jobTypes[index % jobTypes.length];
    const salary = salaryRanges[index % salaryRanges.length];
    const day = String((index % 28) + 1).padStart(2, '0');

    return {
        id,
        title,
        description: `Join ${company} as a ${title} to build impactful products with cross-functional teams.`,
        location,
        jobType,
        company,
        postedDate: `2026-02-${day}`,
        salary,
    };
});

export const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Frontend Developer',
        description: 'Build and maintain user interfaces with React and TypeScript.',
        location: 'Remote',
        jobType: 'full-time',
        company: 'PixelCraft Labs',
        postedDate: '2026-03-20',
        salary: '$90,000 - $110,000',
    },
    {
        id: '2',
        title: 'Backend Engineer',
        description: 'Design robust APIs and data services using Node.js.',
        location: 'Bangalore',
        jobType: 'full-time',
        company: 'CoreStack Systems',
        postedDate: '2026-03-19',
        salary: '$95,000 - $120,000',
    },
    {
        id: '3',
        title: 'UI/UX Intern',
        description: 'Assist with interface design, prototyping, and user testing.',
        location: 'Delhi',
        jobType: 'internship',
        company: 'Lumen Studio',
        postedDate: '2026-03-18',
        salary: '$15,000 - $25,000',
    },
    {
        id: '4',
        title: 'QA Automation Specialist',
        description: 'Create and maintain automated test suites for web apps.',
        location: 'Remote',
        jobType: 'contract',
        company: 'ShipFast Tech',
        postedDate: '2026-03-17',
        salary: '$70,000 - $90,000',
    },
    ...generatedOpenRoles,
];
