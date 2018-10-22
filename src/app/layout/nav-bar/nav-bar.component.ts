import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/authorize/service/authorize.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    user: any;
    displayName = 'anonymous';
    constructor(private _authorizeService: AuthorizeService) { }

    ngOnInit() {
        this._authorizeService.onUserChanged.subscribe(user => {
            this.user = user;
            if (user) {
                this.displayName = this.user.displayName;
            }
        });
    }

    public logout(): void {
        this._authorizeService.logout();
    }

}
