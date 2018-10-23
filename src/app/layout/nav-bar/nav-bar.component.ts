import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/authorize/service/authorize.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    user: any;
    displayName = 'anonymous';
    blockUrlList: Array<String>;
    isBlock: boolean;
    constructor(
        private _authorizeService: AuthorizeService,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this.blockUrlList = ['/register', '/login'];
        this._router.events.pipe(filter(event => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
            this.isBlock = this.blockUrlList.includes(event.url);
        });
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
