import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LocationService } from './location.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private _httpClient: HttpClient,
        private _locationService: LocationService,
        @Inject(PLATFORM_ID) private _platformId: string
    ) { }

    private readonly _httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true
    };

    public get<T>(module: string, action: string, params?: { [key: string]: unknown }): Observable<T> {
        const host = this._locationService.hostname;
        const api = (isDevMode() && isPlatformBrowser(this._platformId)) ? '/system/json/' : `https://${host}/system/json/`;
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
