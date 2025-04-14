import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { Permission } from '../permissions/permission.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepo.create(dto);
    return this.profileRepo.save(profile);
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async assignPermissions(profileId: string, permissionIds: string[]) {
    const profile = await this.findOne(profileId);
    const permissions = await this.permissionRepo.find({
      where: { id: In(permissionIds) },
    });
    profile.permissions = permissions;
    return this.profileRepo.save(profile);
  }
  

  async remove(id: string): Promise<void> {
    const profile = await this.findOne(id);
    await this.profileRepo.remove(profile);
  }
}
