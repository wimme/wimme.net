import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../providers/window.provider';

@Injectable({
    providedIn: 'root'
})
export class WindowRefService {

    constructor(
        @Inject(WINDOW) private _window: Window
    ) {}

    get nativeWindow(): Window {
        return this._window;
    }

}
