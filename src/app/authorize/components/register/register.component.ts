import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../service/authorize.service';
import { FormControl, Validators } from '@angular/forms';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    displayName: FormControl;
    email: FormControl;
    password: FormControl;
    errorMessage: string;
    constructor(private _router: Router, private _authorizeService: AuthorizeService) { }

    ngOnInit(): void {
        this.displayName = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
        this.errorMessage = '';
    }

    register(): void {
        this._authorizeService.registerUser(this.email.value, this.password.value);
    }

    toLogin(): void {
        this._router.navigateByUrl('login');
    }

}
