import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardList = [];

    constructor() { }

    ngOnInit() {
        this.dashboardList = [
            {
                title: 'Todo',
                itemList: [
                    {
                        title: 'todo list',
                        progress: 50
                    },
                    {
                        title: 'todo add & edit',
                        progress: 70
                    }
                ],
                link: '/todo'
            }
        ];
    }
}
