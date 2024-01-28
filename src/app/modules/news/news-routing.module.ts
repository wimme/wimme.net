import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsItemPageComponent } from './components/newsitempage/newsitempage.component';
import { NewsListPageComponent } from './components/newslistpage/newslistpage.component';

const routes: Routes = [
    { path: '', component: NewsListPageComponent },
    { path: 'item/:id', component: NewsItemPageComponent },
    { path: 'item/:id/:slug', component: NewsItemPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
