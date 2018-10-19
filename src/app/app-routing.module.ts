import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeService } from './authorize/service/authorize.service';
import { NotFoundComponent } from './authorize/components/not-found/not-found.component';
import { LoginComponent } from './authorize/components/login/login.component';
import { RegisterComponent } from './authorize/components/register/register.component';

const routes: Routes = [
    {
        path: 'todo',
        loadChildren: './feature/todo/todo.module#TodoModule',
        canActivate: [AuthorizeService]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
