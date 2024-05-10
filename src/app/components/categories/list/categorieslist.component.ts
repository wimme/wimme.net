import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WebsiteService } from '../../../services/website.service';
import { CategoriesTreeItem } from '../categories.component';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categorieslist.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent {

    @Input()
    public tree?: CategoriesTreeItem[] | null;

    constructor(
        private _websiteService: WebsiteService
    ) { }

    public onClick(item: CategoriesTreeItem): void {
        this._websiteService.closeSidebar();
    }
}
