import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  highlightedDates = [
    {
      date: '2024-01-22',
      textColor: "#800080",
      backgroundColor: "#ffc0cb"
    },
    {
      date: '2024-01-21',
      textColor: "#800080",
      backgroundColor: "#ffc0cb",
    },
    {
      date: '2024-01-23',
      textColor: "#800080",
      backgroundColor: "#ffc0cb",
    },
  ];



  constructor() {}

}
