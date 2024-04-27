import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { first, from, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { LocationService } from '../../../../services/location.service';
import { SeoService } from '../../../../services/seo.service';
import { WebsiteService } from '../../../../services/website.service';
import { News, NewsContentType } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-news-item-page',
    templateUrl: './newsitempage.component.html',
    styleUrls: [
        './newsitempage.component.scss',
        '../../styles/news.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemPageComponent implements OnInit, OnDestroy {

    public newsItem?: News;
    public newsItemHtml?: SafeHtml;
    public id?: number;
    public newsId?: number;

    private _newsItemSubscription?: Subscription;
    private readonly _destroy = new Subject<void>();

    constructor(
        private _route: ActivatedRoute,
        private _changeDectector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _newsService: NewsService,
        private _seoService: SeoService,
        private _locationService: LocationService
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
                this._update();
            }
        });

        this._route.paramMap.pipe(
            takeUntil(this._destroy)
        ).subscribe(params => {
            const newsId = params.get('id');
            const newsIdInt = newsId ? parseInt(newsId, 10) : 0;
            if (this.newsId !== newsIdInt) {
                this.newsId = newsIdInt;
                this._update();
            }
        });
    }

    public ngOnDestroy(): void {
        this._newsItemSubscription?.unsubscribe();
        this._destroy.next();
        this._destroy.complete();
    }

    public getResponsiveImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getResponsiveImageUrl(url, responsiveMaxWidth, percentage);
    }

    public getImageUrl(url: string): string {
        if (url) {
            // for image proxy: cached image could be a smaller size
            // refetch the image by adding an url parameter
            return url + (url.includes('?') ? '&' : '?') + 'full';
        }
        return '';
    }

    private _update(): void {
        this._newsItemSubscription?.unsubscribe();

        this._websiteService.setLoading(true);

        if (this.id && this.newsId) {
            this._newsItemSubscription = this._newsService.getNewsItem(this.id, this.newsId).subscribe(newsItem => {
                this.newsItem = newsItem;
                this._websiteService.setLoading(false);
                if (newsItem) {
                    let keywords = '';
                    if (newsItem.content_type === NewsContentType.Redirect && newsItem.content) {
                        this._locationService.replace(newsItem.content);
                    }
                    else {
                        this.newsItemHtml = this._newsService.getHtml(newsItem.content, newsItem.content_type);
                        if (newsItem.content_type === NewsContentType.Markdown) {
                            const metadata = this._newsService.getMetadata();
                            if (metadata) {
                                keywords = metadata['keywords'];
                            }
                        }
                    }
                    this._seoService.update({
                        title: newsItem.title,
                        type: 'article',
                        description: newsItem.content_preview,
                        keywords,
                        image: newsItem.image ? this._newsService.getImageUrl(newsItem.image) : '',
                        utcPublished: newsItem.date,
                        utcModified: newsItem.date_lastupdated
                    });
                }
                this._changeDectector.markForCheck();
            });
        }
    }

}
