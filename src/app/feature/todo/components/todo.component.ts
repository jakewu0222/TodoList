import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/core/service/generic.service';
import { TodoService } from '../todo.service';
import { TodoModel } from '../model/todo.model';
import { OrderBy } from 'src/app/shared/model/shared-model';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from 'src/app/shared/components/generic-dialog/generic-dialog.component';
import { AuthorizeService } from 'src/app/authorize/service/authorize.service';

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
    constructor(
        private _authorizeService: AuthorizeService,
        private _todoService: TodoService,
        private _dialog: MatDialog
    ) {
    }

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

    public doDelete(todo: TodoModel): void {
        const dialogRef = this._dialog.open(GenericDialogComponent, {
            width: '480px',
            data: {
                title: 'Confirm to delete this todo?',
                content: `todo title "${todo.title}"`,
                buttons: [
                    {
                        text: 'CANCEL',
                        click: () => dialogRef.close()
                    },
                    {
                        text: 'CONFIRM',
                        color: 'warn',
                        click: () => {
                            dialogRef.componentInstance.saving = true;
                            this._todoService.deleteTodo(todo.id).subscribe(r => {
                                dialogRef.componentInstance.saving = false;
                                dialogRef.close();
                            }, err => this.onDeleteFail(todo));
                        }
                    }
                ]
            }
        });
    }

    private onDeleteFail(todo: TodoModel): void {
        this._dialog.open(GenericDialogComponent,
            {
                width: '320px',
                data: {
                    title: 'Delete fail',
                    content: `todo title "${todo.title}"`,
                    buttons: [
                        {
                            text: 'OK',
                            color: 'warn',
                            click: () => this._dialog.closeAll()
                        }
                    ]
                }
            }
        );
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

    public logout(): void {
        this._authorizeService.logout();
    }
}
