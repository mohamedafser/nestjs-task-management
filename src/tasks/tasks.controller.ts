import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskfilterDto } from './dto/filter-task.dto';
import { TaskValidationStatusPipe } from './pipes/task-status-validation.pipes';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enim';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filter: filterDto): Task[] {
  //     if(Object.keys(filter).length) {
  //         return this.tasksService.getTasksWithFilter(filter)
  //     } else {
  //         return this.tasksService.getAllTasks();
  //     }
  // }
  // // DECERATOR @POST @GET @BODY
  @Get()
  getTasks(
    @Query(ValidationPipe) filter: TaskfilterDto,
  ): Promise<TaskEntity[]> {
    console.log('filter', filter);
    return this.tasksService.getTasks(filter);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskValidationStatusPipe) status: TaskStatus,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTask(id, status);
  }
  // @Post()
  // // createTask(@Body() body) {
  // //     console.log("body", body)
  // // }
  // // ANOTHER METHOD
  // // createTask(@Body('title') title, @Body('description') description): Task {
  // //    return this.tasksService.createTask(title, description);
  // // }
  // // Data Transfer Objects (DTO) METHOD
  // @UsePipes(ValidationPipe)
  // createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
  //    return this.tasksService.createTask(CreateTaskDto);
  // }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string) {
  //     this.tasksService.deleteTask(id);
  // }
  // @Patch('/:id/status')
  // updateTask(@Param('id') id: string, @Body('status', TaskValidationStatusPipe) status: TaskStatus): Task {
  //     return this.tasksService.updateTask(id, status);
  // }
}
