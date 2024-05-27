import { Injectable } from '@angular/core';
import { TaskModel } from 'src/models/task.model';
import { FirebaseService } from '../common/services/firebase.service';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private firebaseService: FirebaseService,
    private user: UserService
  ) { }

  tasks: TaskModel[] = []; // Inicializa la lista de tareas como un arreglo vacío

  // Obtiene todas las tareas del usuario actual.
  getAllTasks(): Observable<TaskModel[]> {
    return this.firebaseService.getCollectionFilterChanges<TaskModel>('tasks', ref => // Devuelve un Observable que obtiene todos los cambios en la colección de tareas filtrados por el ID del usuario actual
      ref.where('idUser', '==', this.user.user?.idUser) // Filtra las tareas por el ID del usuario actual
    );
  }

  // Obtiene todas las tareas no completadas del usuario actual.
  getAllNotDoneTasks(): Observable<TaskModel[]> {
    return this.firebaseService.getCollectionFilterChanges<TaskModel>('tasks', ref => // Devuelve un Observable que obtiene todos los cambios en la colección de tareas no completadas filtrados por el ID del usuario actual
      ref.where('idUser', '==', this.user.user?.idUser) // Filtra las tareas por el ID del usuario actual
        .where('isDone', '==', false) // Filtra las tareas no completadas
    );
  }

  // Obtiene todas las tareas completadas del usuario actual.
  getAllDoneTasks(): Observable<TaskModel[]> {
    return this.firebaseService.getCollectionFilterChanges<TaskModel>('tasks', ref => // Devuelve un Observable que obtiene todos los cambios en la colección de tareas completadas filtrados por el ID del usuario actual
      ref.where('idUser', '==', this.user.user?.idUser) // Filtra las tareas por el ID del usuario actual
        .where('isDone', '==', true) // Filtra las tareas completadas
    );
  }

  // Obtiene una tarea por su ID.
  getTask(id: string): Observable<TaskModel> {
    return this.firebaseService.getCollectionFilterChanges<TaskModel>('tasks', ref => // Devuelve un Observable que obtiene todos los cambios en la colección de tareas filtrados por el ID de la tarea
      ref.where('idTask', '==', id).limit(1) // Filtra las tareas por el ID proporcionado y limita a 1 resultado
    ).pipe( // Utiliza operadores de tubería para manipular el flujo de datos
      map(tasks => { // Mapea las tareas obtenidas
        if (tasks.length > 0) { // Si se encontró al menos una tarea
          return tasks[0]; // Devuelve la primera tarea encontrada
        } else { // Si no se encontró ninguna tarea
          throw new Error(`No se encontró ninguna tarea con el ID ${id}`); // Lanza un error indicando que no se encontró ninguna tarea con el ID proporcionado
        }
      })
    );
  }

  // Agrega una nueva tarea.
  addTask(taskModel: TaskModel) { // Declara el método addTask
    console.log(taskModel);
    
    this.firebaseService.createDoc(taskModel, "tasks", taskModel.idTask); // Crea un documento en la colección de tareas
  }

  // Actualiza una tarea existente.
  updateTask(id: string, updatedTask: Partial<TaskModel>): void {
    this.firebaseService.updateTask(id, updatedTask);
  }

  // Elimina una tarea por su ID.
  deleteTask(idTask: string) {
    this.firebaseService.deleteTask(idTask);
  }

  // Obtiene todas las tareas del usuario actual para una fecha específica.
  getAllTasksByDate(date: string): Observable<TaskModel[]> {
    return this.firebaseService.getCollectionFilterChanges<TaskModel>('tasks', ref => // Devuelve un Observable que obtiene todos los cambios en la colección de tareas filtrados por el ID del usuario actual y la fecha proporcionada
      // ref.where('idUser', '==', this.user.user?.idUser) // Filtra las tareas por el ID del usuario actual
        ref.where('initialDate', '==', date) // Filtra las tareas por la fecha proporcionada
    );
  }

}
