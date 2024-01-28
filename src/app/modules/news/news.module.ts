import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsItemPageComponent } from './components/newsitempage/newsitempage.component';
import { NewsListComponent } from './components/newslist/newslist.component';
import { NewsListPageComponent } from './components/newslistpage/newslistpage.component';
import { NewsNextComponent } from './components/newsnext/newsnext.component';
import { NewsService } from './services/news.service';

@NgModule({
    declarations: [
        NewsItemPageComponent,
        NewsListComponent,
        NewsListPageComponent,
        NewsNextComponent
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
