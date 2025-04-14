import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto): Promise<Profile> {
    return this.profilesService.update(id, dto);
  }

  @Post(':id/permissions')
  assignPermissions(
    @Param('id') profileId: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.profilesService.assignPermissions(profileId, dto.permissionIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.profilesService.remove(id);
  }
}
