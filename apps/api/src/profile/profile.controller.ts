import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PortfolioProfile } from '../common/types';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): PortfolioProfile {
    return this.profileService.getProfile();
  }
}
