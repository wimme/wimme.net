import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { first, from, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { SeoService } from '../../../../services/seo.service';
import { WebsiteService } from '../../../../services/website.service';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './newslist.component.html',
    styleUrls: [
        './newslist.component.scss',
        '../../styles/news.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {

    public news!: News[];
    public pinned!: News[];

    private _category?: number;
    private _id!: number;

    private _newsSubscription?: Subscription;
    private _pinnedSubscription?: Subscription;
    private readonly _destroy = new Subject<void>();

    constructor(
        private _route: ActivatedRoute,
        private _changeDectector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _newsService: NewsService,
        private _seoService: SeoService
    ) { }

    public ngOnInit(): void {
        this._websiteService.navigation$.pipe(
            switchMap(navigation => from(navigation).pipe(
                first(nav => nav.url === this._route.snapshot.parent?.routeConfig?.path)
            )),
            takeUntil(this._destroy)
        ).subscribe(nav => {
            if (this._id !== nav.id) {
                this._id = nav.id;
                this._update();
                this._seoService.update(nav.url ? nav.name : '', 'website');
            }
        });

        this._route.queryParamMap.pipe(
            takeUntil(this._destroy)
        ).subscribe(params => {
            const category = params.get('category');
            const categoryInt = category ? parseInt(category, 10) : undefined;
            if (this._category !== categoryInt) {
                this._category = categoryInt;
                this._update();
            }
        });
    }

    public ngOnDestroy(): void {
        this._newsSubscription?.unsubscribe();
        this._pinnedSubscription?.unsubscribe();
        this._destroy.next();
        this._destroy.complete();
    }

    public getImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getImageUrl(url, responsiveMaxWidth, percentage);
    }

    public getHtml(content: string, contentType: string): SafeHtml {
        return this._newsService.getHtml(content, contentType);
    }

    public getSlug(title: string): string {
        return this._newsService.getSlug(title);
    }

    private _update(): void {
        this._newsSubscription?.unsubscribe();
        this._pinnedSubscription?.unsubscribe();

        this._websiteService.setLoading(true);

        this._pinnedSubscription = this._newsService.getPinned(this._id, this._category).subscribe(pinned => {
            this.pinned = pinned;
            this._websiteService.setLoading(false);
            this._changeDectector.markForCheck();
        });

        this._newsSubscription = this._newsService.getNews(this._id, this._category).subscribe(news => {
            this.news = news;
            this._websiteService.setLoading(false);
            this._changeDectector.markForCheck();
        });
    }

}
