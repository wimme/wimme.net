import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Settings } from '../../interfaces/settings';
import { WebsiteService } from '../../services/website.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

    private readonly _destroy = new Subject<void>();

    public isSidebarOpen = false;
    public settings$!: Observable<Settings>;

    constructor(
        private _websiteService: WebsiteService,
        private _changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.settings$ = this._websiteService.settings$;
        this._websiteService.showSidebar$.pipe(takeUntil(this._destroy)).subscribe(x => {
            this.isSidebarOpen = x;
            this._changeDetector.markForCheck();
        });
        this._changeDetector.markForCheck();
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    public toggleSidebar(): void {
        this._websiteService.toggleSidebar();
    }
}
