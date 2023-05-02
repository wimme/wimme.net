import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { WebsiteService } from '../../services/website.service';
import { SearchItem } from '../../interfaces/searchitem';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

    public isLoading = false;
    public searchField!: FormControl;
    public results$!: Observable<SearchItem[]>;

    constructor(
        private _websiteService: WebsiteService,
        private _apiService: ApiService
    ) { }

    public ngOnInit(): void {
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            filter(value => !!value),
            tap(() => { this.isLoading = true; }),
            switchMap(value => this._search(value)),
            tap(() => { this.isLoading = false; })
        );
    }

    private _search(query: string): Observable<SearchItem[]> {
        return this._apiService.get<SearchItem[]>('core', 'search', { needle: query, amount: 5 });
    }

    public onSubmit(event: Event): void {
        if (event) {
            event.preventDefault();
        }
    }

    public onClick(item: SearchItem): void {
        this._websiteService.closeSidebar();
    }

}
