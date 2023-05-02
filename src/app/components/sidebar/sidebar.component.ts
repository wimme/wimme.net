import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebsiteService } from '../../services/website.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
    private readonly _destroy = new Subject<void>();

    public isSidebarOpen = false;

    constructor(
        private _websiteService: WebsiteService,
        private _changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this._websiteService.showSidebar$.pipe(takeUntil(this._destroy)).subscribe(x => {
            this.isSidebarOpen = x;
            this._changeDetector.markForCheck();
        });
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    public closeSidebar(): void {
        this._websiteService.closeSidebar();
    }
}
