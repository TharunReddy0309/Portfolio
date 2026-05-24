import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ProfileModule } from './profile/profile.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [ProjectsModule, ProfileModule, SkillsModule, ExperienceModule],
})
export class AppModule {}
