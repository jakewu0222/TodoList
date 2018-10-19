import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthorizeModule } from './authorize/authorize.module';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule.forRoot(),
        AuthorizeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
