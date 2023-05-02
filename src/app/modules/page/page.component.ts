import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { first, from, map, Observable, switchMap, tap } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { ApiService } from '../../services/api.service';
import { WebsiteService } from '../../services/website.service';
import { ContactComponent } from './elements/contact/contact.component';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
    public page$!: Observable<SafeHtml>;

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _sanitizer: DomSanitizer,
        private _websiteService: WebsiteService,
        private _apiService: ApiService,
        private _seoService: SeoService
    ) {
        const contactElement = createCustomElement(ContactComponent, { injector });
        if (!window.customElements.get('contact-element')) {
            window.customElements.define('contact-element', contactElement);
        }
    }

    public ngOnInit(): void {
        this.page$ = this._websiteService.navigation$.pipe(
            tap(() => { this._websiteService.setLoading(true); }),
            switchMap(navigation => from(navigation).pipe(
                first(nav => nav.url === this._route.snapshot.parent?.routeConfig?.path)
            )),
            switchMap(nav => {
                this._seoService.update(nav.url ? nav.name : '', 'website');
                return this._getPage(nav.id)
            }),
            tap(() => { this._websiteService.setLoading(false); })
        );
    }

    private _getPage(id: number): Observable<SafeHtml> {
        return this._apiService.get<{ d: string }>('page', 'getpage', { id }).pipe(
            map(page => this._sanitizer.bypassSecurityTrustHtml(page.d))
        );
    }
}
