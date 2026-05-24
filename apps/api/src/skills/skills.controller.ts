import { Controller, Get, Param } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillCategory, SkillItem } from '../common/types';

@Controller('api/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getAll(): SkillCategory[] {
    return this.skillsService.getAll();
  }

  @Get(':category')
  getByCategory(@Param('category') category: string): SkillItem[] {
    return this.skillsService.getByCategory(category);
  }

  @Get('icon/:skillName')
  getSkillIcon(@Param('skillName') skillName: string): { url: string } {
    return {
      url: this.skillsService.getSkillIconUrl(skillName),
    };
  }
}
