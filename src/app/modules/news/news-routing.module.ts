import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsItemComponent } from './components/newsitem/newsitem.component';
import { NewsListComponent } from './components/newslist/newslist.component';

const routes: Routes = [
    { path: '', component: NewsListComponent },
    { path: 'item/:id', component: NewsItemComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
