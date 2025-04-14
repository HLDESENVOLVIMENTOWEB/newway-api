import {
    Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Permission } from '../permissions/permission.entity';
  
  @Entity()
  export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    name: string;
  
    @ManyToMany(() => User, (user) => user.profiles)
    users: User[];
  
    @ManyToMany(() => Permission, { eager: true })
    @JoinTable()
    permissions: Permission[];
  }
  