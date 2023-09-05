import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { WebsiteService } from '../../services/website.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

    public isHidden$!: Observable<boolean>;

    constructor(
        private _websiteService: WebsiteService,
        @Inject(PLATFORM_ID) private _platformId: string
    ) {}

    public ngOnInit(): void {
        this.isHidden$ = isPlatformBrowser(this._platformId)
            ? this._websiteService.isLoading$.pipe(
                map(isLoading => !isLoading)
              )
            : of(false);
    }
}
