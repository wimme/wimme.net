import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { first, from, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { LocationService } from '../../../../services/location.service';
import { SeoService } from '../../../../services/seo.service';
import { WebsiteService } from '../../../../services/website.service';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-news-item',
    templateUrl: './newsitem.component.html',
    styleUrls: [
        './newsitem.component.scss',
        '../../styles/news.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit, OnDestroy {

    public newsItem!: News;
    public nextItem?: News;
    public previousItem?: News;

    private _id!: number;
    private _newsId!: number;

    private _newsItemSubscription?: Subscription;
    private _nextSubscription?: Subscription;
    private readonly _destroy = new Subject<void>();

    constructor(
        public route: ActivatedRoute,
        private _changeDectector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _newsService: NewsService,
        private _seoService: SeoService,
        private _locationService: LocationService
    ) { }

    public ngOnInit(): void {
        this._websiteService.navigation$.pipe(
            switchMap(navigation => from(navigation).pipe(
                first(nav => nav.url === this.route.snapshot.parent?.routeConfig?.path)
            )),
            takeUntil(this._destroy)
        ).subscribe(nav => {
            if (this._id !== nav.id) {
                this._id = nav.id;
                this._update();
            }
        });

        this.route.paramMap.pipe(
            takeUntil(this._destroy)
        ).subscribe(params => {
            const newsId = params.get('id');
            const newsIdInt = newsId ? parseInt(newsId, 10) : 0;
            if (this._newsId !== newsIdInt) {
                this._newsId = newsIdInt;
                this._update();
            }
        });
    }

    public ngOnDestroy(): void {
        this._newsItemSubscription?.unsubscribe();
        this._nextSubscription?.unsubscribe();
        this._destroy.next();
        this._destroy.complete();
    }

    public getResponsiveImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getResponsiveImageUrl(url, responsiveMaxWidth, percentage);
    }

    public getHtml(content: string, contentType: string): SafeHtml {
        return this._newsService.getHtml(content, contentType);
    }

    private _update(): void {
        this._newsItemSubscription?.unsubscribe();
        this._nextSubscription?.unsubscribe();

        this._websiteService.setLoading(true);

        if (this._id && this._newsId) {
            this._newsItemSubscription = this._newsService.getNewsItem(this._id, this._newsId).subscribe(newsItem => {
                this.newsItem = newsItem;
                this._websiteService.setLoading(false);
                if (newsItem) {
                    if (newsItem.content_type === 'redirect' && newsItem.content) {
                        this._locationService.replace(newsItem.content);
                    }
                    this._seoService.update({
                        title: newsItem.title,
                        type: 'article',
                        description: newsItem.content_preview,
                        image: newsItem.image ? this._newsService.getImageUrl(newsItem.image) : '',
                        utcPublished: newsItem.date
                    });
                }
                this._changeDectector.markForCheck();
            });

            this._nextSubscription = this._newsService.getNext(this._id, this._newsId).subscribe(next => {
                this.nextItem = next?.next;
                this.previousItem = next?.previous;
                this._changeDectector.markForCheck();
            });
        }
    }

}
