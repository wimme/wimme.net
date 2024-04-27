import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryItem } from '../../../../interfaces/categoryitem';
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
    public categories?: CategoryItem[];

    @Input()
    public id?: number;
    @Input()
    public category?: number;
    @Input()
    public parent?: number;

    private _newsSubscription?: Subscription;
    private _pinnedSubscription?: Subscription;
    private _categoriesSubscription?: Subscription;

    constructor(
        public route: ActivatedRoute,
        private _changeDetector: ChangeDetectorRef,
        private _websiteService: WebsiteService,
        private _newsService: NewsService
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        this._update();
    }

    public ngOnDestroy(): void {
        this._unsubscribe();
    }

    public getResponsiveImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getResponsiveImageUrl(url, responsiveMaxWidth, percentage);
    }

    public getHtml(content: string, contentType: NewsContentType): SafeHtml {
        return this._newsService.getHtml(content, contentType);
    }

    public getCategory(categoryId: number): CategoryItem | undefined {
        return this.categories?.find(one => one.id === categoryId);
    }

    private _unsubscribe(): void {
        this._newsSubscription?.unsubscribe();
        this._pinnedSubscription?.unsubscribe();
        this._categoriesSubscription?.unsubscribe();
    }

    private _update(): void {
        this._unsubscribe();

        if (this.id) {
            this._websiteService.setLoading(true);

            this._pinnedSubscription = this._newsService.getPinned(this.id, undefined, this.parent).subscribe(pinned => {
                this.pinned = pinned || [];
                if (this.news) this._websiteService.setLoading(false);
                this._changeDetector.markForCheck();
            });

            this._newsSubscription = this._newsService.getNews(this.id, this.category, this.parent, this.id === 1).subscribe(news => {
                this.news = news || [];
                if (this.pinned) this._websiteService.setLoading(false);
                this._changeDetector.markForCheck();
            });

            this._categoriesSubscription = this._websiteService.categories$.subscribe(categories => {
                this.categories = categories;
                this._changeDetector.markForCheck();
            });
        }
    }

}
