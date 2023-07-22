interface Social {
  resume?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  behance?: string;
  dribble?: string;
}

interface Experience {
  title: string;
  company: string;
  description: Array<string>;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  summary: string;
  socials: Array<Social>;
  experiences: Array<Experience>;
  skills: Array<string>;
  achievements: Array<string>;
  organizations: Array<string>;
  opportunities: Array<string>;
  requests: Array<string>;
  activated: boolean;
  created_at: string;
}
