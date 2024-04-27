import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { News } from '../../interfaces/news';
import { NewsService } from '../../services/news.service';

@Component({
    selector: 'app-news-next',
    templateUrl: './newsnext.component.html',
    styleUrls: ['./newsnext.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsNextComponent implements OnChanges, OnDestroy {

    public nextItem?: News;
    public previousItem?: News;
    public parentItem?: News;

    @Input()
    public id?: number;
    @Input()
    public newsId?: number;

    private _nextSubscription?: Subscription;

    constructor(
        public route: ActivatedRoute,
        private _changeDetector: ChangeDetectorRef,
        private _newsService: NewsService
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        this._update();
    }

    public ngOnDestroy(): void {
        this._nextSubscription?.unsubscribe();
    }

    public getResponsiveImageUrl(url: string, responsiveMaxWidth?: number, percentage?: number): string {
        return this._newsService.getResponsiveImageUrl(url, responsiveMaxWidth, percentage);
    }

    private _update(): void {
        this._nextSubscription?.unsubscribe();

        if (this.id && this.newsId) {
            this._nextSubscription = this._newsService.getNext(this.id, this.newsId).subscribe(next => {
                this.nextItem = next?.next;
                this.previousItem = next?.previous;
                this.parentItem = next?.parent;
                this._changeDetector.markForCheck();
            });
        }
    }

}
