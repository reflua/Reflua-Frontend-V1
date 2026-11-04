const repositoryUrl = 'https://github.com/reflua/Reflua-Frontend-V1';

export const env = {
  githubUrl: import.meta.env.VITE_GITHUB_URL || repositoryUrl,
  githubIssuesUrl: import.meta.env.VITE_GITHUB_ISSUES_URL || `${repositoryUrl}/issues`,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
} as const;
