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
        this.news = undefined;
        this.pinned = undefined;

        const contentId = this.id;
        if (contentId) {
            this._websiteService.setLoading(true);

            this._pinnedSubscription = this._newsService.getPinned(contentId, this.category, this.parent).subscribe(pinned => {
                this.pinned = pinned || [];
                this._finishLoading(contentId);
                this._changeDetector.markForCheck();
            });

            this._newsSubscription = this._newsService.getNews(contentId, this.category, this.parent, this.id === 1).subscribe(news => {
                this.news = news || [];
                this._finishLoading(contentId);
                this._changeDetector.markForCheck();
            });

            this._categoriesSubscription = this._websiteService.categories$.subscribe(categories => {
                this.categories = categories;
                this._changeDetector.markForCheck();
            });
        }
    }

    private _finishLoading(contentId: number): void {
        if (!this.news || !this.pinned)
            return;
        if ((this.news.length && this.pinned.length) || this.parent) {
            this._websiteService.setLoading(false);
            return;
        }
        // always have at least one pinned item
        if (this.news.length && !this.pinned.length && !this.parent) {
            // take a parent
            const parents = this.news.filter(news => news.has_children);
            if (parents.length === 1) {
                let setPinnedIdx = this.news.indexOf(parents[0]);
                if (setPinnedIdx >= 0) {
                    const setPinned = this.news[setPinnedIdx];
                    this.news.splice(setPinnedIdx, 1);
                    this.pinned.push(setPinned);
                    this._websiteService.setLoading(false);
                    return;
                }
            }
            // take pinned from root
            this._pinnedSubscription?.unsubscribe();
            this._pinnedSubscription = this._newsService.getPinned(contentId, undefined, this.parent).subscribe(pinned => {
                this.pinned = pinned || [];
                this._websiteService.setLoading(false);
                if(this.news?.length && !this.pinned.length && !this.parent) {
                    // take first item
                    const setPinned = this.news[0];
                    this.news.splice(0, 1);
                    this.pinned.push(setPinned);
                }
                this._changeDetector.markForCheck();
            });
        }
    }

}
