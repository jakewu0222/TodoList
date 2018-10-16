import { Pipe, PipeTransform } from '@angular/core';
import { TODO_STATUS_CONST } from '../model/todo.model';

@Pipe({
    name: 'todoStatus'
})
export class TodoStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return { display: 'Unknown', ...TODO_STATUS_CONST.find(s => s.code === value) }.display;
    }
}
