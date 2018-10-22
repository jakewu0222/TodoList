export class TodoModel {
    id?: string;
    title: string;
    content: string;
    createAt?: Date;
    modifiedAt?: Date;
    category: string;
    status: number;
    progress: number;
    userId: string;
    constructor(todo?) {
        todo = todo || {};
        this.title = todo.title || null;
        this.content = todo.content || null;
        this.category = todo.category || null;
        this.status = todo.status || 0;
        this.progress = todo.progress || 0;
        this.userId = 'anonymous';
    }
}

export const TODO_STATUS_CONST = [
    {
        code: 0,
        display: 'Ready'
    },
    {
        code: 1,
        display: 'Progressing'
    },
    {
        code: 2,
        display: 'Done'
    }
];
