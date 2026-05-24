import { Controller, Get, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('api')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('health')
  health() {
    return { ok: true };
  }

  @Get('projects')
  getProjects(@Query('username') username = process.env.GITHUB_USERNAME ?? 'TharunReddy0309') {
    return this.projectsService.getProjects(username);
  }
}
