import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../services/website.service';
import { News, NewsContentType } from '../../interfaces/news';
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
export class NewsListComponent implements OnChanges, OnDestroy {

    public news?: News[];
    public pinned?: News[];

    @Input()
    public id?: number;
    @Input()
    public category?: number;
    @Input()
    public hide?: number | number[];

    private _newsSubscription?: Subscription;
    private _pinnedSubscription?: Subscription;

    constructor(
        public route: ActivatedRoute,
        private _changeDectector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _newsService: NewsService
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        this._update();
    }

    public ngOnDestroy(): void {
        this._newsSubscription?.unsubscribe();
        this._pinnedSubscription?.unsubscribe();
    }

    public getResponsiveImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getResponsiveImageUrl(url, responsiveMaxWidth, percentage);
    }

    public getHtml(content: string, contentType: NewsContentType): SafeHtml {
        return this._newsService.getHtml(content, contentType);
    }

    private _isHidden(item: News): boolean {
        if (this.hide instanceof Array && this.hide.includes(item.id)) {
            return false;
        }
        if (this.hide === item.id) {
            return false;
        }
        return true;
    }

    private _update(): void {
        this._newsSubscription?.unsubscribe();
        this._pinnedSubscription?.unsubscribe();

        if (this.id) {
            this._websiteService.setLoading(true);

            this._pinnedSubscription = this._newsService.getPinned(this.id, this.category).subscribe(pinned => {
                this.pinned = pinned?.filter(item => this._isHidden(item));
                this._websiteService.setLoading(false);
                this._changeDectector.markForCheck();
            });

            this._newsSubscription = this._newsService.getNews(this.id, this.category).subscribe(news => {
                this.news = news?.filter(item => this._isHidden(item));
                this._websiteService.setLoading(false);
                this._changeDectector.markForCheck();
            });
        }
    }

}
