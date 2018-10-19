import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../service/authorize.service';
import { FormControl, Validators } from '@angular/forms';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from 'src/app/shared/components/generic-dialog/generic-dialog.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    displayName: FormControl;
    email: FormControl;
    password: FormControl;
    isRegistering: boolean;
    errorMessage: string;
    constructor(
        private _authorizeService: AuthorizeService,
        private _dialog: MatDialog,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.displayName = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
        this.isRegistering = false;
        this.errorMessage = '';
    }

    register(): void {
        this.isRegistering = true;
        this.errorMessage = '';
        this._authorizeService.registerUser(this.email.value, this.password.value, this.displayName.value).subscribe(res => {
            localStorage.setItem('lastLoginEmail', this.email.value);
            const dialogRef = this._dialog.open(GenericDialogComponent, {
                width: '480px',
                data: {
                    title: 'Login with new account',
                    content: 'press OK to redirect to login page',
                    buttons: [
                        {
                            text: 'OK',
                            color: 'primary',
                            click: () => {
                                dialogRef.close();
                                this.isRegistering = false;
                                this.toLogin();
                            }
                        }
                    ]
                }
            });
        }, error => {
            this.isRegistering = false;
            this.errorMessage = error.message;
        });
    }

    toLogin(): void {
        this._router.navigateByUrl('login');
    }

}
