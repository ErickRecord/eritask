import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-date',
  templateUrl: './task-date.page.html',
  styleUrls: ['./task-date.page.scss'],
})
export class TaskDatePage implements OnInit {

  date: string = "";

  constructor(
    private route: ActivatedRoute

  ) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params=>{
    this.date = params["date"];
  });
  }

}
