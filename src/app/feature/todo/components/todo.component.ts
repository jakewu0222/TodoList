import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GenericService } from 'src/app/core/service/generic.service';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { TodoModel } from '../model/todo.model';
import { OrderBy } from 'src/app/shared/model/shared-model';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    cols: number;
    todoList: Array<TodoModel>;
    selectedTodo: TodoModel;
    isFormShow: boolean;
    sortBy: { name: string, order: OrderBy };
    constructor(private _todoService: TodoService) { }

    ngOnInit(): void {
        this.cols = GenericService.getColsByWindowWidth(window.innerWidth);
        this.todoList = [];
        this.isFormShow = false;
        this.sortBy = { name: 'modifiedAt', order: OrderBy.desc };
        this._todoService.getTodoList().subscribe(res => {
            this.todoList = this.sortTodoList(res);
        });
    }

    public onResize(event: any): void {
        this.cols = GenericService.getColsByWindowWidth(window.innerWidth);
    }

    public changeSort(name: string): void {
        if (this.sortBy.name === name) {
            this.sortBy.order = this.sortBy.order === OrderBy.desc ? OrderBy.asc : OrderBy.desc;
        } else {
            this.sortBy.name = name;
            this.sortBy.order = OrderBy.desc;
        }
        this.sortTodoList(this.todoList);
    }

    private sortTodoList(todoList: Array<TodoModel>): Array<TodoModel> {
        if (this.sortBy.order === OrderBy.desc) {
            todoList.sort((a, b) => +b[this.sortBy.name] - +a[this.sortBy.name]);
        } else if (this.sortBy.order === OrderBy.asc) {
            todoList.sort((a, b) => +a[this.sortBy.name] - +b[this.sortBy.name]);
        }
        return todoList;
    }

    public showForm(todo?: TodoModel): void {
        this.selectedTodo = todo ? todo : new TodoModel();
        this.isFormShow = true;
    }

    public doDelete(id: string): void {
        this._todoService.deleteTodo(id).subscribe(r => { });
    }

    public onAction(event: { action: string, data: TodoModel }): void {
        switch (event.action) {
            case 'cancel':
                this.isFormShow = false;
                break;
            case 'save':
                if (event.data.id) {
                    this._todoService.updateTodo(event.data);
                } else {
                    this._todoService.addTodo(event.data);
                }
                this.isFormShow = false;
                break;
            default:
                break;
        }
    }
}
