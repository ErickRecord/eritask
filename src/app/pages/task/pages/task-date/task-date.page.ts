import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-task-date',
  templateUrl: './task-date.page.html',
  styleUrls: ['./task-date.page.scss'],
})
export class TaskDatePage implements OnInit {

  date: string = "";
  tasks: TaskModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.date = params["date"];

      this.taskService.getAllTasksByDate(this.date).subscribe(tasks => {
        if (tasks) {
          this.tasks = tasks;
        }
      })
    });
  }


  details(idTask: string) {
    this.router.navigate(["task/add-task/", idTask]);

  }

}
