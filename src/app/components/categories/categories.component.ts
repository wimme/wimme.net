import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WebsiteService } from '../../services/website.service';
import { CategoryItem } from '../../interfaces/categoryitem';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {

    public categories$!: Observable<CategoriesTreeItem[]>;

    constructor(
        private _websiteService: WebsiteService
    ) { }

    public ngOnInit(): void {
        this.categories$ = this._websiteService.categories$.pipe(
            map(data => this._convertToTree(data))
        );
    }

    public onClick(item: CategoriesTreeItem): void {
        this._websiteService.closeSidebar();
    }

    private _convertToTree(data: CategoryItem[]): CategoriesTreeItem[] {
        const categories: CategoriesTreeItem[] = [];
        const mapCategoriesPerParent: { [id: number]: CategoryItem[] } = {};
        for (const category of data) {
            if (category && category.parent) {
                var arr = mapCategoriesPerParent[category.parent];
                if (!arr) {
                    arr = [];
                    mapCategoriesPerParent[category.parent] = arr;
                }
                arr.push(category);
            }
        }
        for (const category of data) {
            if (category && !category.parent) {
                const treeItem = new CategoriesTreeItem(category);
                treeItem.children = this._getChildren(mapCategoriesPerParent, category);
                treeItem.totalcount = this._getCount(mapCategoriesPerParent, category);
                categories.push(treeItem);
            }
        }
        return categories;
    }

    private _getChildren(mapCategoriesPerParent: { [id: number]: CategoryItem[] }, category: CategoryItem): CategoriesTreeItem[] {
        const treeItems: CategoriesTreeItem[] = [];
        const children = mapCategoriesPerParent[category.id] || [];
        for (const child of children) {
            const treeItem = new CategoriesTreeItem(child);
            treeItem.children = this._getChildren(mapCategoriesPerParent, child);
            treeItem.totalcount = this._getCount(mapCategoriesPerParent, child);
            treeItems.push(treeItem);
        }
        return treeItems;
    }

    private _getCount(mapCategoriesPerParent: { [id: number]: CategoryItem[] }, category: CategoryItem): number {
        var result = category.count;
        var children = mapCategoriesPerParent[category.id] || [];
        for (const child of children) {
            result += this._getCount(mapCategoriesPerParent, child);
        }
        return result;
    }
}

class CategoriesTreeItem {
    id: number;
    name: string;
    children?: CategoriesTreeItem[];
    totalcount?: number;

    constructor(category: CategoryItem) {
        this.id = category.id;
        this.name = category.name;
    }
}
