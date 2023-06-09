import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Subject, takeUntil } from 'rxjs';
import { ImageComponent } from './elements/image/image.component';
import { WebsiteService } from './services/website.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

    private readonly _destroy = new Subject<void>();

    public isSidebarOpen = false;

    constructor(
        injector: Injector,
        private _websiteService: WebsiteService,
        private _changeDetector: ChangeDetectorRef
    ) {
        const imageElement = createCustomElement(ImageComponent, { injector });
        if (!window.customElements.get('image-element')) {
            window.customElements.define('image-element', imageElement);
        }
    }

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

    public toggleSidebar(): void {
        this._websiteService.toggleSidebar();
    }
}
