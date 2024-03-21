import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  highlightedDates = [
    {
      date: '2024-01-22',
      textColor: "#fff",
      backgroundColor: "#11ce11",
    },
    {
      date: '2024-01-23',
      textColor: "#fff",
      backgroundColor: "#11ce11",

    },
    {
      date: '2024-01-24',
      textColor: "#fff",
      backgroundColor: "#11ce11",

    },
    {
      date: '2024-01-29',
      textColor: "#fff",
      backgroundColor: "#008000",

    },
    {
      date: '2024-02-01',
      textColor: "#fff",
      backgroundColor: "#ff0000",

    },
    {
      date: '2024-02-02',
      textColor: "#fff",
      backgroundColor: "#ff0000",

    },
    {
      date: '2024-02-05',
      textColor: "#fff",
      backgroundColor: "#5e5d5d",

    },
    {
      date: '2024-02-09',
      textColor: "#fff",
      backgroundColor: "#880606",

    },
    {
      date: '2024-03-18',
      textColor: "#fff",
      backgroundColor: "#5e5d5d",

    },
    {
      date: '2024-03-25',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-03-26',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-03-27',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-03-28',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-03-29',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-01',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-02',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-03',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-04',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-05',
      textColor: "#fff",
      backgroundColor: "#808080",
    },
    {
      date: '2024-04-19',
      textColor: "#fff",
      backgroundColor: "#ffd700",
    },
    {
      date: '2024-05-01',
      textColor: "#fff",
      backgroundColor: "#5e5d5d",
    },
    {
      date: '2024-05-15',
      textColor: "#fff",
      backgroundColor: "#5e5d5d",
    },
    {
      date: '2024-05-31',
      textColor: "#fff",
      backgroundColor: "#b42020",
    },
    {
      date: '2024-06-24',
      textColor: "#fff",
      backgroundColor: "#ffa500",
    },
    {
      date: '2024-06-25',
      textColor: "#fff",
      backgroundColor: "#ffa500",
    },
    {
      date: '2024-06-26',
      textColor: "#fff",
      backgroundColor: "#ffa500",
    },
    {
      date: '2024-06-27',
      textColor: "#fff",
      backgroundColor: "#ffa500",
    },
    {
      date: '2024-06-28',
      textColor: "#fff",
      backgroundColor: "#ffa500",
    },
  ];
  selectedDate: string = "2024-01-01";


  onDateChange(event: any) {
    this.selectedDate = event.detail.value;

    // Compruebo si la fecha seleccionada coincide con una fecha resaltada
    const isHighlighted = this.highlightedDates.some(
      (highlightedDate) => highlightedDate.date === this.selectedDate?.toString().slice(0, 10) // Ensure date comparison in YYYY-MM-DD format
    );

    if (isHighlighted) {
      this.router.navigate(['/task/task-date'], { queryParams: { date: this.selectedDate } });
    }
  }

  constructor(
    private router: Router
  ) { }

}
