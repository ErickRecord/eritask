import { Injectable } from '@angular/core';
import { TaskModel } from 'src/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  tasks: TaskModel[] = [
    {
      idTask: 1,
      idUser: 1,
      name: "Programación",
      description: "Asistir a la reunion",
      duration: "10:00 - 11:20",
      isDone: false
    },
    {
      idTask: 2,
      idUser: 2,
      name: "Gym",
      description: "Asistir al gimnasio",
      duration: "05:00 - 07:00",
      isDone: true
    },
  ];
  getAllTasks() {
    return this.tasks;
  }

  getAllNotDoneTasks() {
    return this.tasks.filter(task => !task.isDone);
  }
  getAllDoneTasks() {
    return this.tasks.filter(task => task.isDone);
  }

  addTask(taskModel: TaskModel) {
    this.tasks.push(taskModel);
  }
  getTask(idTask: number): TaskModel | undefined {
    return this.tasks.find(task => task.idTask === idTask);
  }

  deleteTask(idTask: number): TaskModel | undefined {
    const index = this.tasks.findIndex(task => task.idTask === idTask);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return undefined; // Retorna undefined si no se encuentra la tarea con el ID especificado
  }

}
