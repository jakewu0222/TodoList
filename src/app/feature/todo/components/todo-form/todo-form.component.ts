import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TodoModel, TODO_STATUS_CONST } from '../../model/todo.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
    @Input() todo: TodoModel;
    @Output() doAction: EventEmitter<{ action: string, data: any }> = new EventEmitter();
    todoForm: FormGroup;
    statusConst = TODO_STATUS_CONST;
    constructor() { }

    ngOnInit(): void {
        if (!this.todoForm) {
            this.todoForm = new FormGroup({
                title: new FormControl(null),
                category: new FormControl(null),
                progress: new FormControl(0),
                status: new FormControl(0),
                content: new FormControl(null)
            });
        }
    }

    ngOnChanges(change: SimpleChanges): void {
        if (change.todo.currentValue) {
            this.todoForm.setValue({
                title: change.todo.currentValue.title,
                category: change.todo.currentValue.category,
                progress: change.todo.currentValue.progress,
                status: change.todo.currentValue.status,
                content: change.todo.currentValue.content
            });
        }
    }

    public doCancel(): void {
        this.doAction.emit({ action: 'cancel', data: null });
    }

    public doSave(): void {
        switch (this.todoForm.value.status) {
            case 0:
                this.todoForm.controls.progress.setValue(0);
                break;
            case 2:
                this.todoForm.controls.progress.setValue(100);
                break;
            default:
                break;
        }
        Object.keys(this.todoForm.value).map(k => this.todo[k] = this.todoForm.value[k]);
        this.doAction.emit({ action: 'save', data: this.todo });
    }
}
