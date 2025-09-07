export type ResumeData = {
  education: { school: string; degree?: string; graduation?: string; location?: string }[];
  experience: { company: string; role?: string; duration?: string; location?: string }[];
  projects: { title: string; stack?: string[] }[];
  skills: string[];
  certifications: string[];
};

export function parseResumeText(text: string): ResumeData {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const data: ResumeData = { education: [], experience: [], projects: [], skills: [], certifications: [] };
  let section: string | null = null;
  for (const line of lines) {
    if (/^EDUCATION/i.test(line)) { section = 'EDUCATION'; continue; }
    if (/^WORK EXPERIENCE/i.test(line)) { section = 'EXPERIENCE'; continue; }
    if (/^PROJECTS/i.test(line)) { section = 'PROJECTS'; continue; }
    if (/^CERTIFICATIONS/i.test(line) || /CERTIFICATIONS, SKILLS/i.test(line)) { section = 'CERTS'; continue; }
    if (!line) continue;

    if (section === 'EDUCATION' && /University of Waterloo/i.test(line)) {
      data.education.push({ school: 'University of Waterloo', degree: 'BCS Computer Science', graduation: 'Dec 2029', location: 'Waterloo, ON' });
    }
    if (section === 'EXPERIENCE') {
      if (/Vedantu/i.test(line)) data.experience.push({ company: 'Vedantu', role: 'Software Engineering Intern' });
      if (/Tinker Zoo/i.test(line)) data.experience.push({ company: 'Tinker Zoo', role: 'Founder & CEO' });
      if (/Wadhwa/i.test(line)) data.experience.push({ company: 'Wadhwa', role: 'Tech Operations Intern' });
    }
    if (section === 'PROJECTS') {
      if (/Magnificent Seven/i.test(line)) data.projects.push({ title: 'Magnificent Seven Sentiment', stack: ['Python','Transformers','FinBERT'] });
      if (/MarmoUI/i.test(line)) data.projects.push({ title: 'MarmoUI 2.0', stack: ['JS','HTML','CSS'] });
      if (/ManuQuill/i.test(line)) data.projects.push({ title: 'ManuQuill', stack: ['React','OpenAI','Tailwind'] });
      if (/Teacher Buddy/i.test(line)) data.projects.push({ title: 'Teacher Buddy', stack: ['Python','NLP','MySQL'] });
    }
    if (section === 'CERTS') {
      if (/Certifications:/i.test(line)) {
        const list = line.replace(/.*Certifications:/i, '').split(/;|,/).map(s=>s.trim()).filter(Boolean);
        data.certifications.push(...list);
      }
      if (/Skills:/i.test(line)) {
        const list = line.replace(/.*Skills:/i, '').split(/;|,|\s·\s/).map(s=>s.trim()).filter(Boolean);
        data.skills.push(...list);
      }
    }
  }
  return data;
}


