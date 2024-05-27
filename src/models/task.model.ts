export interface TaskModel {
    idTask: string,
    idUser: string;
    name: string;
    description: string;
    initialDate: string;
    initialTime: string;
    isDone: boolean;
    color: string
}