import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/models/employee.model';
import { FirebaseService } from '../common/services/firebase.service';
import { UserService } from '../services/user.service';
import { TaskModel } from 'src/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn: boolean = false;

  employee: EmployeeModel[] = [];
  newUser?: EmployeeModel = {
    id: "",
    controlNumber: "",
    department: "",
    email: "",
    name: ""
  };
  highlightedDates: any = [];
  // highlightedDates = [
  //   {
  //     date: '2024-01-22',
  //     textColor: "#fff",
  //     backgroundColor: "#11ce11",
  //   },
  //   {
  //     date: '2024-01-23',
  //     textColor: "#fff",
  //     backgroundColor: "#11ce11",

  //   },
  //   {
  //     date: '2024-01-24',
  //     textColor: "#fff",
  //     backgroundColor: "#11ce11",

  //   },
  //   {
  //     date: '2024-01-29',
  //     textColor: "#fff",
  //     backgroundColor: "#008000",

  //   },
  //   {
  //     date: '2024-02-01',
  //     textColor: "#fff",
  //     backgroundColor: "#ff0000",

  //   },
  //   {
  //     date: '2024-02-02',
  //     textColor: "#fff",
  //     backgroundColor: "#ff0000",

  //   },
  //   {
  //     date: '2024-02-05',
  //     textColor: "#fff",
  //     backgroundColor: "#5e5d5d",

  //   },
  //   {
  //     date: '2024-02-09',
  //     textColor: "#fff",
  //     backgroundColor: "#880606",

  //   },
  //   {
  //     date: '2024-03-18',
  //     textColor: "#fff",
  //     backgroundColor: "#5e5d5d",

  //   },
  //   {
  //     date: '2024-03-25',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-03-26',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-03-27',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-03-28',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-03-29',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-01',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-02',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-03',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-04',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-05',
  //     textColor: "#fff",
  //     backgroundColor: "#808080",
  //   },
  //   {
  //     date: '2024-04-19',
  //     textColor: "#fff",
  //     backgroundColor: "#ffd700",
  //   },
  //   {
  //     date: '2024-05-01',
  //     textColor: "#fff",
  //     backgroundColor: "#5e5d5d",
  //   },
  //   {
  //     date: '2024-05-15',
  //     textColor: "#fff",
  //     backgroundColor: "#5e5d5d",
  //   },
  //   {
  //     date: '2024-05-31',
  //     textColor: "#fff",
  //     backgroundColor: "#b42020",
  //   },
  //   {
  //     date: '2024-06-24',
  //     textColor: "#fff",
  //     backgroundColor: "#ffa500",
  //   },
  //   {
  //     date: '2024-06-25',
  //     textColor: "#fff",
  //     backgroundColor: "#ffa500",
  //   },
  //   {
  //     date: '2024-06-26',
  //     textColor: "#fff",
  //     backgroundColor: "#ffa500",
  //   },
  //   {
  //     date: '2024-06-27',
  //     textColor: "#fff",
  //     backgroundColor: "#ffa500",
  //   },
  //   {
  //     date: '2024-06-28',
  //     textColor: "#fff",
  //     backgroundColor: "#ffa500",
  //   },
  // ];
  selectedDate: string = "2024-01-01";

  constructor(
    private router: Router,
    private userService: UserService,
    private firebaseService: FirebaseService
  ) {

  }

  async loadHighlightedDates(): Promise<void> {
    // Obtener fechas resaltadas desde Firebase Firestore
    this.firebaseService.getCollectionChanges<TaskModel>("tasks").subscribe(tasks => {
      // Filtrar las tareas que tienen un campo "datetime" definido y convertirlas al formato deseado

      this.highlightedDates = tasks
        .filter(task => task.initialDate) // Filtrar tareas con datetime definido
        .map(task => ({
          // Convertir la fecha al formato deseado (YYYY-MM-DD)
          date: task.initialDate,
          textColor: "#fff",
          backgroundColor: task.color // Usar color de la tarea como color de fondo, o un color por defecto si no está definido
        }));
    });
  }
  // async loadHighlightedDates(): Promise<void> {
  //   // Obtener fechas resaltadas desde Firebase Firestore
  //   this.firebaseService.getCollectionChanges<TaskModel>("tasks").subscribe(tasks => {
  //     // Filtrar las tareas que tienen un campo "datetime" definido y convertirlas al formato deseado
  //     this.highlightedDates = tasks
  //       .filter(task => task.datetime) // Filtrar tareas con datetime definido
  //       .map(task => ({
  //         // Convertir la fecha al formato deseado (YYYY-MM-DD)
  //         date: new Date(task.datetime).toLocaleDateString('en-CA').toString(),
  //         textColor: "#fff",
  //         backgroundColor: task.color // Usar color de la tarea como color de fondo, o un color por defecto si no está definido
  //       }));
  //   });
  // }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;

    // Compruebo si la fecha seleccionada coincide con una fecha resaltada
    const isHighlighted = this.highlightedDates.some(
      (highlightedDate: { date: string; }) => highlightedDate.date === this.selectedDate?.toString().slice(0, 10) // Ensure date comparison in YYYY-MM-DD format
    );
    if (isHighlighted) {
      this.router.navigate(['/task/task-date'], { queryParams: { date: this.selectedDate } });
    }
  }

  async ngOnInit(): Promise<void> {
    // Llama a isLogin() al inicializar la página de inicio
    this.isLoggedIn = await this.userService.isLogin() !== undefined; // Actualiza isLoggedIn basado en el estado de autenticación
    this.loadHighlightedDates();

  }


  async logout() {
    await this.userService.logout();
  }

}
