import {
    Injectable, NotFoundException
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from './user.entity';
  import { Repository } from 'typeorm';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { Profile } from '../profiles/profile.entity';
  import * as bcrypt from 'bcryptjs';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    ) {}
  
    async findAll(): Promise<User[]> {
      return this.userRepo.find();
    }
  
    async findOne(id: string): Promise<User> {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Usuário não encontrado');
      return user;
    }
  
    async create(dto: CreateUserDto): Promise<User> {
      const profiles = await this.profileRepo.findByIds(dto.profileIds);
      const hashed = await bcrypt.hash(dto.password, 10);
  
      const user = this.userRepo.create({
        email: dto.email,
        password: hashed,
        profiles,
      });
  
      return this.userRepo.save(user);
    }
  
    async update(id: string, dto: UpdateUserDto): Promise<User> {
      const user = await this.findOne(id);
  
      if (dto.email) user.email = dto.email;
      if (dto.password) {
        user.password = await bcrypt.hash(dto.password, 10);
      }
      if (dto.profileIds) {
        user.profiles = await this.profileRepo.findByIds(dto.profileIds);
      }
  
      return this.userRepo.save(user);
    }
  
    async remove(id: string): Promise<void> {
      const user = await this.findOne(id);
      await this.userRepo.remove(user);
    }
  }
  