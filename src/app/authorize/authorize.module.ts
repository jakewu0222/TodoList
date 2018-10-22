import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
    ]
})
export class AuthorizeModule { }
