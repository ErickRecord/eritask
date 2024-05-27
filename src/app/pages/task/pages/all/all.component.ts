import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  tasks: TaskModel[] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

}
