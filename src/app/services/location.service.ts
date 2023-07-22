import { Injectable, Inject } from '@angular/core';
import { LOCATION } from '../providers/location.provider';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        @Inject(LOCATION) private _location: Location
    ) {}

    get hostname(): string {
        return this._location.hostname;
    }

    get href(): string {
        return this._location.href;
    }

    get origin(): string {
        return this._location.origin;
    }

    public redirect(url: string): void {
        this._location.href = url;
    }

    public replace(url: string): void {
        this._location.replace(url);
    }

}
