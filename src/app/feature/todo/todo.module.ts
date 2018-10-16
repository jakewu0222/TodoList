import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TodoRoutingModule

    ],
    declarations: [
        TodoComponent
    ]
})
export class TodoModule { }
