import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceEntry } from '../common/types';

@Controller('api/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  getAll(): ExperienceEntry[] {
    return this.experienceService.getAll();
  }

  @Post()
  add(@Body() experience: ExperienceEntry): ExperienceEntry {
    return this.experienceService.add(experience);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() experience: Partial<ExperienceEntry>,
  ): ExperienceEntry {
    return this.experienceService.update(parseInt(id), experience);
  }
}
