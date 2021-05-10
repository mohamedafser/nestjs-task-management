import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskfilterDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enim';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }
  // getTasksWithFilter(filter: filterDto) : Task[] {
  //     const {search, status} = filter;
  //     let tasks = this.getAllTasks();
  //     if(search) {
  //         tasks = tasks.filter(task => (
  //             task.title.includes(search) || task.description.includes(search)
  //         ))
  //     }
  //     if(status) {
  //         tasks = tasks.filter(task => task.status === status)
  //     }
  //     return tasks;
  // }
  async getTasks(filterDto: TaskfilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} id not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const response = await this.taskRepository.delete(id);

    if (!response.affected) {
      throw new NotFoundException(`Task with id ${id} does not exists`);
    }
  }

  async updateTask(id: number, status: TaskStatus): Promise<TaskEntity> {
    const currentTask = await this.getTaskById(id);
    currentTask.status = status;
    await currentTask.save();
    return currentTask;
  }

  // getTaskById(id: string): Task {
  //     const found = this.tasks.find(task => task.id === id);
  //     if(!found) {
  //         throw new NotFoundException(`Task with id ${id} is not found`)
  //     }
  //     return found;
  // }
  // createTask(CreateTaskDto: CreateTaskDto): Task {
  //     const { title, description} = CreateTaskDto;
  //     const task: Task = {
  //         id: uuidv4(),
  //         title,
  //         description,
  //         status: TaskStatus.DONE
  //     }
  //     this.tasks.push(task)
  //     return task
  // }
  // deleteTask(id: string): void {
  //     const found = this.getTaskById(id)
  //     this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
  // updateTask(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status
  //     return task;
  // }
}
