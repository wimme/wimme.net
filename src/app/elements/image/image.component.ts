import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
    @Input()
    public caption = '';

    @Input()
    public src = '';

    @Input()
    public columns = '1';

    constructor(
        private _popupService: PopupService
    ) { }

    public onClick(event: Event) {
        if (event) {
            event.preventDefault();
        }
        this._popupService.show(this.caption, this.src);
    }

    public getSizes(columns: string): string {
        switch (parseInt(columns, 10)) {
            case 2:
                return this._getImageSizes([100, 50, 50, 50, 50]);
            case 3:
                return this._getImageSizes([100, 100, 33.3, 33.3, 33.3]);
            case 4:
                return this._getImageSizes([100, 50, 25, 25, 25]);
            case 5:
                return this._getImageSizes([100, 100, 20, 20, 20]);
            case 6:
                return this._getImageSizes([100, 50, 16.6, 16.6, 16.6]);
            case 7:
                return this._getImageSizes([100, 100, 14.28, 14.28, 14.28]);
            case 8:
                return this._getImageSizes([100, 50, 12.5, 12.5, 12.5]);
            case 9:
                return this._getImageSizes([100, 100, 11.1, 11.1, 11.1]);
        }
        return this._getImageSizes([100, 100, 100, 100, 100]);
    }

    private readonly _widths: { vw: number, container: number }[] = [
        { vw: 479, container: 275 },
        { vw: 767, container: 385 },
        { vw: 980, container: 703 },
        { vw: 1130, container: 885 },
        { vw: Number.POSITIVE_INFINITY, container: 1035 }
    ];

    private _getImageSizes(percentages: number[]): string {
        const sizes: string[] = [];
        for (let i = 0; i < this._widths.length; i++) {
            const width = this._widths[i];
            const percentage = percentages[i];
            const imageWidth = Math.ceil(width.container * percentage * 0.01);
            if (width.vw === Number.POSITIVE_INFINITY) {
                sizes.push(`${imageWidth}px`);
            } else {
                sizes.push(`(max-width: ${width.vw}px) ${imageWidth}px`);
            }
        }
        return sizes.join(', ');
    }

}
