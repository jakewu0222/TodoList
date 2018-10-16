import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/core/service/generic.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/service/http.service';
import { TodoModel } from './model/todo.model';
import { API } from 'src/app/core/model/api-model';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    constructor(
        private _httpSvc: HttpService
    ) { }
    public getTodoList(todoFilter?: any): Observable<Array<TodoModel>> {
        return this._httpSvc.getCollection<TodoModel>(API.todo.url).pipe(map(todoList => {
            todoList.map(todo => {
                todo.createAt = GenericService.timestampToDate(todo.createAt);
                todo.modifiedAt = GenericService.timestampToDate(todo.modifiedAt);
            });
            return todoList;
        }));
    }

    public addTodo(todo: TodoModel): void {
        todo.id = GenericService.generateGUID();
        todo.createAt = new Date();
        todo.modifiedAt = new Date();
        this._httpSvc.upsertDoc(API.todo.url, todo.id, todo);
    }

    public updateTodo(todo: TodoModel): void {
        todo.modifiedAt = new Date();
        this._httpSvc.upsertDoc(API.todo.url, todo.id, todo);
    }

    public deleteTodo(id: string): any {
        return this._httpSvc.deleteDoc(API.todo.id(id).url);
    }
}
