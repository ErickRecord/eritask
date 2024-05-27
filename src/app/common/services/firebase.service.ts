import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { EmployeeModel } from 'src/models/employee.model';
import { TaskModel } from 'src/models/task.model'; 
const { v4: uuidv4 } = require('uuid');

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore, 
    private afAuth: AngularFireAuth,
  ) { } 

  // Obtiene los cambios en una colección de Firestore.
  getCollectionChanges<T>(path: string): Observable<T[]> {
    const refCollection: AngularFirestoreCollection<T> = this.firestore.collection<T>(path); // Obtiene la colección de Firestore
    return refCollection.valueChanges(); // Devuelve los cambios en la colección
  }

  // Obtiene los cambios en una colección de Firestore aplicando una consulta (si se proporciona).
  getCollectionFilterChanges<T>(path: string, queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(path, queryFn).valueChanges(); // Devuelve los cambios en la colección filtrados según la consulta
  }

  // Crea un documento en Firestore.
  createDocument(user: EmployeeModel, link: string): Promise<void> {
    const document: AngularFirestoreDocument<EmployeeModel> = this.firestore.doc<EmployeeModel>(`${link}/${user.id}`); // Obtiene el documento en Firestore
    return document.set(user); // Establece los datos del documento
  }

  // Crea un documento en una colección de Firestore.
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path); // Obtiene la colección de Firestore
    return collection.doc(id).set(data); // Establece los datos del documento en la colección
  }

  // Crea un ID único para un documento de Firestore.
  createIdDoc(): string { // Declara el método createIdDoc
    return uuidv4(); // Genera y devuelve un ID único
  }

  // Actualiza un documento de Firestore.
  updateTask(taskId: string, updatedData: Partial<EmployeeModel>): Promise<void> { // Declara el método updateTask
    const document: AngularFirestoreDocument<EmployeeModel> = this.firestore.doc<EmployeeModel>(`tasks/${taskId}`); // Obtiene el documento en Firestore
    return document.update(updatedData); // Actualiza los datos del documento
  }

  // Obtiene la información del usuario autenticado.
  getUserInfo() {
    return this.afAuth.authState.pipe( // Devuelve un Observable del estado de autenticación del usuario
      take(1), // Toma solo el primer valor del Observable
      map(user => { // Mapea el usuario autenticado
        if (user) { // Si hay un usuario autenticado
          return user; // Devuelve el usuario
        } else { // Si no hay un usuario autenticado
          return null; // Devuelve null
        }
      })
    );
  }

  // Elimina un documento de Firestore.
  deleteTask(taskId: string): Promise<void> { 
    const document: AngularFirestoreDocument<TaskModel> = this.firestore.doc<TaskModel>(`tasks/${taskId}`); // Obtiene el documento en Firestore
    return document.delete(); // Elimina el documento
  }
}
