import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { WebsiteService } from '../../services/website.service';
import { RecentItem } from '../../interfaces/recentitem';

@Component({
    selector: 'app-recents',
    templateUrl: './recents.component.html',
    styleUrls: ['./recents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentsComponent implements OnInit {

    public recents$!: Observable<RecentItem[]>;

    constructor(
        private _websiteService: WebsiteService,
        private _apiService: ApiService
    ) { }

    public ngOnInit(): void {
        this.recents$ = this._apiService.get<RecentItem[]>('core', 'getrecents', { amount: 5 });
    }

    public onClick(item: RecentItem): void {
        this._websiteService.closeSidebar();
    }

}
