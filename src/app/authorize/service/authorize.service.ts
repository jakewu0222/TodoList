import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    public user: any;
    constructor(private _router: Router, private _auth: AngularFireAuth) {
        this._auth.auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(this.user, this._auth.authState);
        if (this.user) {
            return true;
        } else {
            return Observable.create(observer => {
                this._auth.authState.pipe(map(user => !isNullOrUndefined(user))).subscribe(isLogin => {
                    if (!isLogin) {
                        this._router.navigateByUrl('/login');
                    }
                    observer.next(isLogin);
                });
            });
        }
    }

    public isLogin(): boolean {
        return !isNullOrUndefined(this.user);
    }

    public registerUser(email: string, password: string): void {
        this._auth.auth.createUserWithEmailAndPassword(email, password).then(r => {
            console.log(r);
        });
    }

    public login(email = '', password = ''): Observable<any> {
        return from(this._auth.auth.signInWithEmailAndPassword(email, password));
    }

    public logout(): void {
        console.log('logout');
        this._auth.auth.signOut().then(r => {
            this._router.navigateByUrl('login');
        });
    }
}
