import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
        private _websiteService: WebsiteService
    ) {}

    public hidden = false;

    public ngOnInit(): void {
        this.isHidden$ = this._websiteService.isLoading$.pipe(
            map(isLoading => !isLoading)
        );
    }
}
