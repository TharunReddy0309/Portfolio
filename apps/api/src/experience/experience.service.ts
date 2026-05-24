import { Injectable } from '@nestjs/common';
import { ExperienceEntry } from '../common/types';
import { EXPERIENCE_DATA } from './experience.data';

@Injectable()
export class ExperienceService {
  getAll(): ExperienceEntry[] {
    return EXPERIENCE_DATA;
  }

  add(experience: ExperienceEntry): ExperienceEntry {
    // In production, save to database
    EXPERIENCE_DATA.push(experience);
    return experience;
  }

  update(index: number, experience: Partial<ExperienceEntry>): ExperienceEntry {
    // In production, update database
    const updated = { ...EXPERIENCE_DATA[index], ...experience };
    EXPERIENCE_DATA[index] = updated;
    return updated;
  }
}
