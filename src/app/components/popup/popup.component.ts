import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { WindowRefService } from '../../services/windowref.service';
import { ImageItem } from '../../interfaces/imageitem';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent {
    @Input()
    public caption = '';

    @Input()
    public image = '';

    @Input()
    public images: ImageItem[] = [];

    @Output()
    public closed = new EventEmitter<void>();

    constructor(
        private _windowRefService: WindowRefService,
        private _changeDetector: ChangeDetectorRef
    ) { }

    @HostListener('click', ['$event'])
    public close(event: Event): void {
        this.closed.next();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        this._changeDetector.markForCheck();
    }

    public get maxHeight(): string {
        return `${this._windowRefService.nativeWindow.innerHeight - 100}px`;
    }

    @HostListener('window:keyup.arrowleft', ['$event'])
    public showPrevious(event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.images.length > 1) {
            const idx = this.images.findIndex(image => image.src === this.image);
            if (idx >= 0) {
                let nextIdx = idx - 1;
                if (nextIdx < 0) {
                    nextIdx = this.images.length - 1;
                }
                const nextImage = this.images[nextIdx];
                if (this.image !== nextImage.src) {
                    this.image = nextImage.src;
                    this.caption = nextImage.caption;
                    this._changeDetector.markForCheck();
                }
            }
        }
    }

    @HostListener('window:keyup.arrowright', ['$event'])
    public showNext(event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (this.images.length > 1) {
            const idx = this.images.findIndex(image => image.src === this.image);
            if (idx >= 0) {
                let nextIdx = idx + 1;
                if (nextIdx >= this.images.length) {
                    nextIdx = 0;
                }
                const nextImage = this.images[nextIdx];
                if (this.image !== nextImage.src) {
                    this.image = nextImage.src;
                    this.caption = nextImage.caption;
                    this._changeDetector.markForCheck();
                }
            }
        }
    }

}
