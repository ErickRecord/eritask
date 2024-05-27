import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  task?: TaskModel;

  taskForm: FormGroup;
  initialDate: string = "";

  isDone: boolean = false; // Propiedad para almacenar el estado del checkbox

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController, // Cierra la pagina actual
    private toastController: ToastController,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {

    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      initialDate: ['', Validators.required],
      initialTime: ['', Validators.required],
      selectedColor: ['', Validators.required],
      isDone: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.taskService.getTask(params['id']).subscribe(task => {
          // Si existe la tarea le asigno la tarea a los inputs
          if (task) {
            this.task = task;
            this.initialDate = this.task.initialDate;
            this.taskForm.patchValue({
              name: this.task.name,
              description: this.task.description,
              initialDate: this.task.initialDate,
              initialTime: this.task.initialTime,
              isDone: this.task.isDone,
              selectedColor: this.task.color
            });
          }
        });

      }

    });
  }

  async onSubmit() {
    const user = await firstValueFrom(this.firebaseService.getUserInfo());

    let name = this.taskForm.controls["name"].value;
    let description = this.taskForm.controls["description"].value;
    let initialDate = this.taskForm.controls["initialDate"].value;
    let initialTime = this.taskForm.controls["initialTime"].value;
    let selectedColor = this.taskForm.controls["selectedColor"].value;
    // Si la tarea es nula se crea la tarea
    if (this.task == null) {
      const idTask = this.firebaseService.createIdDoc();
      let task: TaskModel = {
        idTask: idTask,
        idUser: user?.uid!,
        name: name,
        description: description,
        initialDate: initialDate,
        initialTime: initialTime,
        isDone: this.isDone,
        color: selectedColor
      };
      this.taskService.addTask(task);
      this.snackBar("Tarea Agregada");
      // Caso contrario se edita
    } else {
      this.task.name = name
      this.task.description = description
      this.task.initialDate = initialDate
      this.task.initialTime = initialDate

      this.task.isDone = this.isDone;
      this.taskService.updateTask(this.task.idTask, this.task);
      this.snackBar("Tarea Actualizada");
    }
    this.navCtrl.back();

  }

  async snackBar(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  toggleIsDone(event: CustomEvent) {
    this.isDone = event.detail.checked;
  }

  deleteTasks() {
    this.navCtrl.back();
    try {
      this.taskService.deleteTask(this.task?.idTask!)
    } catch (_) { }
    this.snackBar("Tarea eliminada");
  }

  changeColor(event: any) {
    const selectedColor = event.target.value;
    this.taskForm.get('selectedColor')!.setValue(selectedColor);
  }
}
