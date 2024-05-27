import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
})
export class DoneComponent implements OnInit {
  tasks: TaskModel[] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getAllDoneTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}
