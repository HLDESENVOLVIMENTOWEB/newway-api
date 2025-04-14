import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>
  ) {}

  async create(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepo.create({ ...dto, user });
    return this.taskRepo.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    if (user.profiles.some(p => p.name === 'admin')) {
      return this.taskRepo.find();
    }
    return this.taskRepo.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    if (task.user.id !== user.id && !user.profiles.some(p => p.name === 'admin')) {
      throw new ForbiddenException('Você não pode acessar esta tarefa');
    }
    return task;
  }

  async update(id: string, dto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.taskRepo.remove(task);
  }
}
