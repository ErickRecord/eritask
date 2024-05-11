import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmployeeModel } from 'src/models/employee.model';
const { v4: uuidv4 } = require('uuid');

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getCollectionChanges<T>(path: string): Observable<T[]> {
    const refCollection: AngularFirestoreCollection<T> = this.firestore.collection<T>(path);
    return refCollection.valueChanges();
  }

  createDocument(user: EmployeeModel, link: string): Promise<void> {
    const document: AngularFirestoreDocument<EmployeeModel> = this.firestore.doc<EmployeeModel>(`${link}/${user.id}`);
    return document.set(user);
  }

  createDoc(data:any, path:string, id:string){
    const collectiona = this.firestore.collection(path);
    return collectiona.doc(id).set(data);
  }

  createIdDoc(): string {
    return uuidv4();
  }

}
