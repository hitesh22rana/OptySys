import { getCSVData } from "@/src/app/(actions)/common";

import { IOption } from "@/src/types/common";

export function normalizeAccessToken(token: string): string {
  return token.replace(/"/g, "");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getSkillsList(): Promise<Array<IOption>> {
  const data: Array<string> = await getCSVData(
    "src/lib/constants/technologies.csv"
  );

  const skills: Array<IOption> = data.map((skill: string) => {
    return { value: skill, label: capitalize(skill) };
  });

  return skills;
}

export function defaultSkills(skills: Array<string>): Array<IOption> {
  return skills?.map((skill: string) => {
    return { value: skill, label: capitalize(skill) };
  });
}
