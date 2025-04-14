import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepo.findOne({ where: { id } });
    if (!permission) throw new NotFoundException('Permissão não encontrada');
    return permission;
  }

  async create(data: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepo.create(data);
    return this.permissionRepo.save(permission);
  }

  async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    Object.assign(permission, data);
    return this.permissionRepo.save(permission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepo.remove(permission);
  }
}
