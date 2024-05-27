import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { EmployeeModel } from 'src/models/employee.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  isLoggedIn: boolean = false;

  employees: EmployeeModel[] = [];
  isLoading: boolean = false;
  employee?: EmployeeModel = {
    id: "",
    controlNumber: "",
    department: "",
    email: "",
    name: ""
  };
  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
  ) {
  }
  loadUsers() {
    this.firebaseService.getCollectionChanges<EmployeeModel>('Employees').subscribe(employees => {
      if (employees) {
        this.employees = employees;
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

  clearForm(): void {
    this.employee = {
      id: "",
      controlNumber: "",
      department: "",
      email: "",
      name: ""
    };
  }

  async save() {
    this.employee!.id = this.firebaseService.createIdDoc();
    this.isLoading = true;
    await this.firebaseService.createDoc(this.employee!, 'Employees', this.employee!.id);
    this.isLoading = false;
    this.clearForm();
  }
}
