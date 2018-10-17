import { NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        GenericDialogComponent
    ],
    entryComponents: [
        GenericDialogComponent
    ]
})
export class SharedModule { }
