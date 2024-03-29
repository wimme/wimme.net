import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigationitem';
import { WebsiteService } from '../../services/website.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

    public navigation$: Observable<NavigationItem[]>;

    constructor(
        private _websiteService: WebsiteService
    ) {
        this.navigation$ = this._websiteService.navigation$.pipe(
            map(nav => nav?.filter(one => one?.showInMenu))
        );
    }

    public onClick(item: NavigationItem): void {
        this._websiteService.closeSidebar();
    }

}
