import { Injectable } from '@nestjs/common';
import { PortfolioProfile } from '../common/types';
import { PROFILE_DATA } from './profile.data';

@Injectable()
export class ProfileService {
  getProfile(): PortfolioProfile {
    return PROFILE_DATA;
  }

  updateProfile(profile: Partial<PortfolioProfile>): PortfolioProfile {
    // In production, this would update a database
    // For now, return merged data
    return {
      ...PROFILE_DATA,
      ...profile,
    };
  }
}
