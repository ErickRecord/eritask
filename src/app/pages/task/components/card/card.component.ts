import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() task!: TaskModel;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  
  details() {
    this.router.navigate(["task/add-task/", this.task.idTask]);

  }

}
