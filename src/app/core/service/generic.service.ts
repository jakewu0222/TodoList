import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericService {

    constructor() { }

    public static generateGUID(): string {
        return this.S4GUID() + this.S4GUID() + this.S4GUID()
            + this.S4GUID() + this.S4GUID() + this.S4GUID();
    }

    private static S4GUID(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16).substring(1);
    }

    public static timestampToDate(timeStamp: any): Date {
        return new Date(timeStamp.seconds * 1000);
    }

    public static getColsByWindowWidth(width: number): number {
        let cols = 3;
        if (width < 830) {
            cols = 1;
        } else if (width >= 830 && width < 1255) {
            cols = 2;
        } else if (width >= 1255 && width < 1585) {
            cols = 3;
        } else if (width >= 1585 && width < 1995) {
            cols = 4;
        } else if (width >= 1995) {
            cols = 5;
        }
        return cols;
    }
}
