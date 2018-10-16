import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private _db: AngularFirestore, private _http: HttpClient) { }
    /**
     * http
     * @param url
     */
    public getRequest(url: string): Observable<any> {
        return this._http.get(url).pipe(map(u => JSON.stringify(u)));
    }

    /**
     * firestore
     * @param url
     */
    public getCollection<T>(url: string): Observable<Array<T>> {
        return this._db.collection<T>(url).valueChanges();
    }

    public getDoc<T>(url: string): Observable<T> {
        return this._db.doc<T>(url).valueChanges();
    }

    public upsertDoc<T>(url: string, id: string, data: T): Observable<any> {
        const obj = this.convertToObject(data);
        return from(this._db.collection(url).doc(id).set(obj));
    }

    public deleteDoc<T>(url: string): Observable<void> {
        return from(this._db.doc(url).delete());
    }

    private convertToObject(data: any): Object {
        const obj = new Object();
        Object.keys(data).map(k => obj[k] = data[k]);
        return obj;
    }
}
