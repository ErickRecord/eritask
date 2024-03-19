import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  task?: TaskModel;
  taskForm: FormGroup;
  initialDate: string =  "";

  isDone: boolean = false; // Propiedad para almacenar el estado del checkbox

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController, // Cierra la pagina actual
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {

    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      datetimeControl: [null],
      isDone: [false]
    });
  }

  dateTimeChanged(event: CustomEvent) {
    const selectedDate: string = event.detail.value;
    this.taskForm.controls["datetimeControl"].setValue(selectedDate);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.task = this.taskService.getTask(+params['id'])

      if (this.task) {
        const datepipe: DatePipe = new DatePipe('en-ES');
        this.initialDate = this.task.datetime;
        // const datetime = datepipe.transform(this.task.datetime, 'dd-MMM-YYYY h:mm a');
        // this.taskForm.controls["datetimeControl"].setValue(datetime!.toISOString());
        // Asignar los valores al formulario solo si la tarea existe
        
        this.taskForm.patchValue({
          name: this.task.name,
          description: this.task.description,
          datetimeControl: this.task.datetime,
          isDone: this.task.isDone
        });
        // if (this.task.datetime) {
        //   this.taskForm.patchValue({
        //     datetimeControl: this.task.datetime
        //   });
        // }
      
      }
    });
  }

  onSubmit() {
    let name = this.taskForm.controls["name"];
    let descripcion = this.taskForm.controls["description"];
    let datetime = this.taskForm.controls["datetimeControl"];
    if (datetime.value == null) {
      datetime.setValue(new Date().toISOString());
    }

    if (this.task == null) {

      let task: TaskModel = {
        idTask: 0,
        idUser: 0,
        name: name.value,
        description: descripcion.value,
        datetime: datetime.value,
        isDone: this.isDone
      };
      this.taskService.addTask(task);
      this.snackBar("Tarea Agregada");
    } else {
      // this.task.isDone = true;
      this.task.name = name.value
      this.task.description = descripcion.value
      this.task.datetime = datetime.value
      this.task.isDone = this.isDone;
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
    this.snackBar("Tarea eliminada");
    this.taskService.deleteTask(this.task?.idTask!)
    this.navCtrl.back();
  }

}
