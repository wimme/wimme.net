import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../../interfaces/settings';
import { WebsiteService } from '../../services/website.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

    public settings$!: Observable<Settings>;

    constructor(
        private _websiteService: WebsiteService,
        private _changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.settings$ = this._websiteService.settings$;
        this._changeDetector.markForCheck();
    }

    public getCurrentYear(): number {
        return new Date().getFullYear();
    }
}
