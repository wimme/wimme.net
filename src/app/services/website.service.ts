import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable, shareReplay } from 'rxjs';
import { CategoryItem } from '../interfaces/categoryitem';
import { NavigationItem } from '../interfaces/navigationitem';
import { Settings } from '../interfaces/settings';
import { ApiService } from './api.service';
import { SeoService } from './seo.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteService {

    public readonly showSidebar$ = new BehaviorSubject<boolean>(false);
    public readonly isLoading$ = new BehaviorSubject<boolean>(false);
    public readonly navigation$: Observable<NavigationItem[]>;
    public readonly categories$: Observable<CategoryItem[]>;
    public readonly settings$: Observable<Settings>;

    constructor(
        private _router: Router,
        private _apiService: ApiService,
        private _seoService: SeoService
    ) {
        this._router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            this.setLoading(true);
            this._seoService.clear();
        });
        this.navigation$ = this._apiService.get<NavigationItem[]>('core', 'getnav').pipe(shareReplay(1));
        this.categories$ = this._apiService.get<CategoryItem[]>('news', 'getcategories').pipe(shareReplay(1));
        this.settings$ = this._apiService.get<Settings>('core', 'getsettings').pipe(shareReplay(1));
        this.settings$.subscribe({
            next: settings => {
                this._seoService.setSiteName(settings.name);
                this._seoService.setLanguage(settings.language);
                this._seoService.setSiteDescription(settings.description);
                this._seoService.setSiteKeywords(settings.keywords);
                this._seoService.setSiteSameAs(settings.socials?.map(s => s.url));
            },
            error: () => {}
        });
    }

    public toggleSidebar(): void {
        this.showSidebar$.next(!this.showSidebar$.getValue());
    }

    public closeSidebar(): void {
        if (this.showSidebar$.getValue()) {
            this.showSidebar$.next(false);
        }
    }

    public showSidebar(): void {
        if (!this.showSidebar$.getValue()) {
            this.showSidebar$.next(true);
        }
    }

    public setLoading(isLoading: boolean): void {
        if (this.isLoading$.getValue() !== isLoading) {
            this.isLoading$.next(isLoading);
        }
    }

}
