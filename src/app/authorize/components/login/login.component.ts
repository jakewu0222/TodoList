import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../../service/authorize.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: FormControl;
    password: FormControl;
    isLogining: boolean;
    errorMessage: string;
    constructor(private _router: Router, private _authorizeService: AuthorizeService) { }

    ngOnInit(): void {
        const email = (localStorage.getItem('lastLoginEmail') || '');
        this.email = new FormControl(email, [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
        this.isLogining = false;
        this.errorMessage = '';
    }

    login(): void {
        this.isLogining = true;
        this.errorMessage = '';
        if (this.email.valid && this.password.valid) {
            this._authorizeService.login(this.email.value, this.password.value).subscribe(res => {
                localStorage.setItem('lastLoginEmail', this.email.value);
                this._router.navigateByUrl('');
            }, error => {
                this.isLogining = false;
                this.password.reset();
                this.errorMessage = error.message;
            });
        }
    }

    toRegister(): void {
        this._router.navigateByUrl('/register');
    }
}
