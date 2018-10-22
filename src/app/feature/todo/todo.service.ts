import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/core/service/generic.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/service/http.service';
import { TodoModel } from './model/todo.model';
import { API } from 'src/app/core/model/api-model';
import { AuthorizeService } from 'src/app/authorize/service/authorize.service';
import { CollectionReference } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    user: any;
    constructor(
        private _httpService: HttpService,
        private _authorizeService: AuthorizeService,
        private _router: Router
    ) {
        this._authorizeService.onUserChanged.subscribe(user => {
            this.user = user;
        });
    }
    public getTodoList(): Observable<Array<TodoModel>> {
        const filterFunc = (collection: CollectionReference) => {
            return collection.where('userId', '==', (this.user.uid || ''));
        };
        return this._httpService.getCollection<TodoModel>(API.todo.url, filterFunc).pipe(map(todoList => {
            todoList.map(todo => {
                todo.createAt = GenericService.timestampToDate(todo.createAt);
                todo.modifiedAt = GenericService.timestampToDate(todo.modifiedAt);
            });
            return todoList;
        }));
    }

    public addTodo(todo: TodoModel): void {
        todo.createAt = new Date();
        todo.modifiedAt = new Date();
        if (this.user) {
            todo.userId = this.user.uid;
            this._httpService.upsertDoc(API.todo.url, todo);
        } else {
            this._router.navigateByUrl('login');
        }
    }

    public updateTodo(todo: TodoModel): void {
        todo.modifiedAt = new Date();
        if (this.user && todo.userId === this.user.uid) {
            this._httpService.upsertDoc(API.todo.url, todo);
        } else {
            this._router.navigateByUrl('login');
        }
    }

    public deleteTodo(todo: TodoModel): any {
        if (this.user && todo.userId === this.user.uid) {
            return this._httpService.deleteDoc(API.todo.url, todo.id);
        } else {
            this._router.navigateByUrl('login');
        }
    }
}
