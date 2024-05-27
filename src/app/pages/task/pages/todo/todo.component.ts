import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  tasks: TaskModel[] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getAllNotDoneTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
