import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoStatusPipe } from './pipe/todo-status.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TodoRoutingModule

    ],
    declarations: [
        TodoComponent,
        TodoFormComponent,
        TodoStatusPipe
    ]
})
export class TodoModule { }
