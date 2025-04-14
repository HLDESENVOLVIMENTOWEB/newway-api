import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
  } from '@nestjs/common';
  import { PermissionsService } from './permissions.service';
  import { Permission } from './permission.entity';
  
  @Controller('permissions')
  export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}
  
    @Get()
    findAll(): Promise<Permission[]> {
      return this.permissionsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Permission> {
      return this.permissionsService.findOne(id);
    }
  
    @Post()
    create(@Body() body: Partial<Permission>): Promise<Permission> {
      return this.permissionsService.create(body);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.permissionsService.remove(id);
    }
  }
  