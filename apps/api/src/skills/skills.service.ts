import { Injectable } from '@nestjs/common';
import { SkillCategory, SkillItem } from '../common/types';
import { SKILLS_DATA, SKILL_NAME_MAPPING } from './skills.data';

@Injectable()
export class SkillsService {
  private readonly skillIconsBaseUrl = 'https://skillicons.dev/icons?i=';

  getAll(): SkillCategory[] {
    return this.enrichSkillsWithLogos(SKILLS_DATA);
  }

  getByCategory(category: string): SkillItem[] {
    const skillCategory = SKILLS_DATA.find((s) => s.category === category);
    if (!skillCategory) {
      return [];
    }
    return this.enrichSkills(skillCategory.items);
  }

  private enrichSkillsWithLogos(categories: SkillCategory[]): SkillCategory[] {
    return categories.map((category) => ({
      ...category,
      items: this.enrichSkills(category.items),
    }));
  }

  private enrichSkills(skills: SkillItem[]): SkillItem[] {
    return skills.map((skill) => {
      const skillName = SKILL_NAME_MAPPING[skill.name] || skill.name.toLowerCase().replace(/\s+/g, '-');
      return {
        ...skill,
        logo: skillName,
        logoUrl: this.getSkillIconUrl(skillName),
      };
    });
  }

  getSkillIconUrl(skillName: string): string {
    return `${this.skillIconsBaseUrl}${skillName}`;
  }
}
