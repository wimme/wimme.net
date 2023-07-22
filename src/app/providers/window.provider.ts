import { inject, InjectionToken, FactoryProvider } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const WINDOW = new InjectionToken<Window>('WindowToken');

const windowProvider: FactoryProvider = {
    provide: WINDOW,
    useFactory: () => inject(DOCUMENT).defaultView!
};

export const WINDOW_PROVIDERS = [
    windowProvider
];
