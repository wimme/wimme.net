import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsItemComponent } from './components/newsitem/newsitem.component';
import { NewsListComponent } from './components/newslist/newslist.component';
import { NewsService } from './services/news.service';

@NgModule({
    declarations: [
        NewsItemComponent,
        NewsListComponent
    ],
    imports: [
        CommonModule,
        NewsRoutingModule
    ],
    providers: [
        NewsService
    ]
})
export class NewsModule { }
