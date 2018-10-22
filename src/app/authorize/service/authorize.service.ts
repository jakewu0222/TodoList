import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {
    private user: any;
    public onUserChanged: BehaviorSubject<any>;
    constructor(private _router: Router, private _auth: AngularFireAuth) {
        this.onUserChanged = new BehaviorSubject(null);
        this._auth.auth.onAuthStateChanged(user => {
            this.user = user;
            this.onUserChanged.next(user);
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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

    public registerUser(email: string, password: string, displayName?: string): Observable<any> {
        return Observable.create(observer => {
            this._auth.auth.createUserWithEmailAndPassword(email, password).then(r => {
                if (displayName) {
                    const profile = {
                        displayName: displayName,
                        photoURL: ''
                    };
                    this._auth.auth.currentUser.updateProfile(profile).then(res => {
                        observer.next(res);
                        observer.complete();
                    }, error => {
                        observer.error(error);
                        observer.complete();
                    });
                } else {
                    observer.next(r);
                    observer.complete();
                }
            }, error => {
                observer.error(error);
                observer.complete();
            });
        });
    }

    public login(email = '', password = ''): Observable<any> {
        return from(this._auth.auth.signInWithEmailAndPassword(email, password));
    }

    public logout(): void {
        this._auth.auth.signOut().then(r => {
            this._router.navigateByUrl('login');
        });
    }
}
