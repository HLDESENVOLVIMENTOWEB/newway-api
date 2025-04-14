import {
    Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiBearerAuth } from '@nestjs/swagger';
  
  @ApiBearerAuth('jwt-auth')
  @UseGuards(JwtAuthGuard)
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    create(@Body() dto: CreateTaskDto, @Request() req) {
      return this.tasksService.create(dto, req.user);
    }
  
    @Get()
    findAll(@Request() req) {
      return this.tasksService.findAll(req.user);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
      return this.tasksService.findOne(id, req.user);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Request() req) {
      return this.tasksService.update(id, dto, req.user);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
      return this.tasksService.remove(id, req.user);
    }
  }
  