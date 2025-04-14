import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'inativo' })
  status: string;

  @ManyToMany(() => Profile, (profile) => profile.users, { eager: true })
  @JoinTable()
  profiles: Profile[];
}
