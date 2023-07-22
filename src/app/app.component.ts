import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Subject, takeUntil } from 'rxjs';
import { ImageComponent } from './elements/image/image.component';
import { WebsiteService } from './services/website.service';
import { WindowRefService } from './services/windowref.service';

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
        private _windowRefService: WindowRefService,
        private _changeDetector: ChangeDetectorRef,
        @Inject(PLATFORM_ID) platformId: string
    ) {
        if (isPlatformBrowser(platformId)
            && !this._windowRefService.nativeWindow.customElements.get('image-element')) {
            const imageElement = createCustomElement(ImageComponent, { injector });
            this._windowRefService.nativeWindow.customElements.define('image-element', imageElement);
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
