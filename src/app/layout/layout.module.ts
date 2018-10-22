import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        NavBarComponent
    ],
    exports: [
        NavBarComponent
    ]
})
export class LayoutModule { }
