import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/models/employee.model';
import { FirebaseService } from '../common/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn: boolean = false;

  employee: EmployeeModel[] = [];
  isLoading: boolean = false;
  newUser?: EmployeeModel = {
    id: "",
    controlNumber: "",
    department: "",
    email: "",
    name: ""
  };
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

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
  ) {
  }

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

  loadUsers() {
    this.firebaseService.getCollectionChanges<EmployeeModel>('Employees').subscribe(employees => {
      console.log(employees);
      if (employees) {
        this.employee = employees;
      }
    })
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    this.loadUsers();
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(["/authentication"]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  clearForm(): void{
    this.newUser ={
      id: "",
      controlNumber: "",
      department: "",
      email: "",
      name: ""
    };
  }

  async save() {
    this.newUser!.id = this.firebaseService.createIdDoc();
    this.isLoading = true;
    await this.firebaseService.createDoc(this.newUser!, 'Employees',this.newUser!.id);
    this.isLoading = false;
    this.clearForm();
  }

}
