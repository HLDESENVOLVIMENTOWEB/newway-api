import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

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
  create(@Body() body: CreatePermissionDto): Promise<Permission> {
    return this.permissionsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(id);
  }
}
