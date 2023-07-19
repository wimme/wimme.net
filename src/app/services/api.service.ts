import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    private readonly _httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
    };

    public get<T>(module: string, action: string, params?: { [key: string]: unknown }): Observable<T> {
        const host = window.location.hostname;
        const api = isDevMode() ? '/system/json/' : `https://cms.${host}/system/json/`;
        const data = { module, action, params };
        return this._httpClient.post<T>(api, data, this._httpOptions).pipe(
            catchError(this._handleError<T>())
        );
    }

    private _handleError<T>() {
        return (error: any): Observable<T> => {
            if(!error) error = {};
            if(!error.displayerror || !error.displayerror.length) error.displayerror = 'An unexpected error occured.';
            if(!error.fields) error.fields = [];
            return throwError(() => error);
        };
    }

}
