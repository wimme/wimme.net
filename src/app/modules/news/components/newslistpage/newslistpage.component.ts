import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, from, Subject, switchMap, takeUntil } from 'rxjs';
import { SeoService } from '../../../../services/seo.service';
import { WebsiteService } from '../../../../services/website.service';

@Component({
    selector: 'app-news-list-page',
    templateUrl: './newslistpage.component.html',
    styleUrls: ['./newslistpage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListPageComponent implements OnInit, OnDestroy {

    public category?: number;
    public id!: number;

    private readonly _destroy = new Subject<void>();

    constructor(
        private _route: ActivatedRoute,
        private _changeDetector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _seoService: SeoService
    ) { }

    public ngOnInit(): void {
        this._websiteService.navigation$.pipe(
            switchMap(navigation => from(navigation).pipe(
                first(nav => nav.url === this._route.snapshot.parent?.routeConfig?.path)
            )),
            takeUntil(this._destroy)
        ).subscribe(nav => {
            if (this.id !== nav.id) {
                this.id = nav.id;
                this._seoService.update({
                    title: nav.url ? nav.name : '',
                    type: 'website'
                });
                this._changeDetector.markForCheck();
            }
        });

        this._route.queryParamMap.pipe(
            takeUntil(this._destroy)
        ).subscribe(params => {
            const category = params.get('category');
            const categoryInt = category ? parseInt(category, 10) : undefined;
            if (this.category !== categoryInt) {
                this.category = categoryInt;
                this._changeDetector.markForCheck();
            }
        });
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

}
