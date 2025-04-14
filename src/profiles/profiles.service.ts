import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Profile } from './profile.entity';
  import { Permission } from '../permissions/permission.entity';
  
  @Injectable()
  export class ProfilesService {
    constructor(
      @InjectRepository(Profile)
      private readonly profileRepo: Repository<Profile>,
      @InjectRepository(Permission)
      private readonly permissionRepo: Repository<Permission>,
    ) {}
  
    async findAll(): Promise<Profile[]> {
      return this.profileRepo.find();
    }
  
    async findOne(id: string): Promise<Profile> {
      const profile = await this.profileRepo.findOne({
        where: { id },
        relations: ['permissions'],
      });
      if (!profile) throw new NotFoundException('Perfil não encontrado');
      return profile;
    }
  
    async create(name: string): Promise<Profile> {
      const profile = this.profileRepo.create({ name });
      return this.profileRepo.save(profile);
    }
  
    async assignPermissions(profileId: string, permissionIds: string[]) {
      const profile = await this.findOne(profileId);
      const permissions = await this.permissionRepo.findByIds(permissionIds);
      profile.permissions = permissions;
      return this.profileRepo.save(profile);
    }
  
    async remove(id: string): Promise<void> {
      const profile = await this.findOne(id);
      await this.profileRepo.remove(profile);
    }
  }
  