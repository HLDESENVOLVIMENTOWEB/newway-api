import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ProfilesService } from './profiles.service';
  import { Profile } from './profile.entity';
  
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
    create(@Body() body: { name: string }): Promise<Profile> {
      return this.profilesService.create(body.name);
    }
  
    @Post(':id/permissions')
    assignPermissions(
      @Param('id') profileId: string,
      @Body() body: { permissionIds: string[] },
    ) {
      return this.profilesService.assignPermissions(profileId, body.permissionIds);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.profilesService.remove(id);
    }
  }
  