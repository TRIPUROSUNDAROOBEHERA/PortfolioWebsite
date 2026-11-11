import { assetUrl } from '../utils/assetUrl';

/**
 * Canonical serial ordering of core portfolio certifications (1 through 5).
 */
export const CORE_CERTIFICATES = [
  {
    id: 1,
    title: 'Python Full Stack Developer Virtual Internship',
    issuer: 'EduSkills Academy & AICTE',
    issue_date: 'Dec 2025',
    credential_id: 'c85f1f38b6e67487a6e5e2667c7179b8',
    image: assetUrl('cert-python-fullstack.jpg'),
    pdf: assetUrl('certificates/Python_Full_Stack_Developer_Certificate.pdf'),
    desc: 'Completed 10-week intensive Python full-stack engineering virtual internship supported by AICTE, Ministry of Education, and EduSkills with Grade O (Outstanding).',
    badge: 'Internship',
  },
  {
    id: 2,
    title: 'Programming with Python 3.X',
    issuer: 'Simplilearn SkillUp',
    issue_date: 'Dec 2025',
    credential_id: '9609807',
    image: assetUrl('cert-simplilearn-python.jpg'),
    pdf: assetUrl('certificates/Programming_with_Python_3.x.pdf'),
    desc: 'Validated core proficiency in Python 3.x programming, data structures, object-oriented design, exception handling, and backend automation scripting.',
    badge: 'Python',
  },
  {
    id: 3,
    title: 'Introduction to Prompt Engineering',
    issuer: 'Simplilearn SkillUp',
    issue_date: 'Dec 2025',
    credential_id: '9610480',
    image: assetUrl('cert-prompt-engineering.jpg'),
    pdf: assetUrl('certificates/Introduction_to_Prompt_Engineering.pdf'),
    desc: 'Mastered generative AI prompt architecture, LLM context structuring, few-shot prompting patterns, and efficient AI-driven developer productivity workflows.',
    badge: 'AI / Prompt',
  },
  {
    id: 4,
    title: 'Fortinet Certified Associate in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issue_date: 'Sept 2025',
    credential_id: '3451334320TB',
    image: assetUrl('cert-fortinet-associate.jpg'),
    pdf: assetUrl('certificates/Fortinet_Certified_Associate_in_Cybersecurity.pdf'),
    desc: 'Certified technical cybersecurity competence validating real-world operations in network security architecture, threat intelligence, and enterprise defense workflows.',
    badge: 'Cybersecurity',
  },
  {
    id: 5,
    title: 'Fortinet Certified Fundamentals in Cybersecurity',
    issuer: 'Fortinet Training Institute',
    issue_date: 'Sept 2025',
    credential_id: '5435469190TB',
    image: assetUrl('cert-fortinet-fundamentals.jpg'),
    pdf: assetUrl('certificates/Fortinet_Certified_Fundamentals_in_Cybersecurity.pdf'),
    desc: 'Comprehensive mastery of the foundational cybersecurity threat landscape, core security principles, attack vectors, and enterprise data protection strategies.',
    badge: 'Fortinet',
  },
];

const TITLE_MATCH_KEYWORDS = [
  'associate',
  'fundamentals',
  'virtual internship',
  'python 3',
  'prompt',
];

/**
 * Merges API certificates with canonical CORE_CERTIFICATES while preserving serial order and verified assets.
 */
export function mergeWithCoreCertificates(apiCertificates = []) {
  const list = Array.isArray(apiCertificates) ? apiCertificates : [];
  return CORE_CERTIFICATES.map((core) => {
    const coreTitle = core.title.toLowerCase().trim();
    const match = list.find((c) => {
      if (!c?.title) return false;
      const cTitle = c.title.toLowerCase().trim();
      if (cTitle === coreTitle) return true;
      return TITLE_MATCH_KEYWORDS.some(
        (kw) => coreTitle.includes(kw) && cTitle.includes(kw)
      );
    });
    return {
      ...core,
      ...(match || {}),
      id: core.id,
      title: core.title,
      issuer: core.issuer,
      issue_date: core.issue_date,
      credential_id: core.credential_id,
      image: core.image,
      pdf: core.pdf,
      desc: core.desc,
      badge: core.badge,
    };
  });
}
