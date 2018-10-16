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
        this.userId = todo.userId || 'jake.wu';
    }
}
