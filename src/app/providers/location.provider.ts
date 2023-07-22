import { inject, InjectionToken, FactoryProvider } from '@angular/core';
import { WINDOW } from './window.provider';

export const LOCATION = new InjectionToken<Location>('LocationToken');

const locationProvider: FactoryProvider = {
    provide: LOCATION,
    useFactory: () => inject(WINDOW).location
};

export const LOCATION_PROVIDERS = [
    locationProvider
];
