import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { Task } from 'src/tasks/task.entity';

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

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Profile, (profile) => profile.users, { eager: true })
  @JoinTable()
  profiles: Profile[];
}
