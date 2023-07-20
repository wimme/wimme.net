import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        @Inject(DOCUMENT) private _document: Document
    ) {}

    get hostname(): string {
        return this._document.location.hostname;
    }

    get href(): string {
        return this._document.location.href;
    }

    get origin(): string {
        return this._document.location.origin;
    }

    public redirect(url: string): void {
        this._document.location.href = url;
    }

    public replace(url: string): void {
        this._document.location.replace(url);
    }

}
