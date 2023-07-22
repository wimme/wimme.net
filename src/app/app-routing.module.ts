import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LoadChildrenCallback, Router, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { WebsiteService } from './services/website.service';

function getModule(module: string): LoadChildrenCallback | null {
    switch (module) {
        case 'page':
            return () => import('./modules/page/page.module').then(mod => mod.PageModule);
        case 'news':
            return () => import('./modules/news/news.module').then(mod => mod.NewsModule);
    }
    return null;
}

function initializeRoutes(router: Router, websiteService: WebsiteService) {
    return () => websiteService.navigation$.pipe(
        map(navigation => {
            const dynamicRoutes: Routes = [];
            for (const nav of navigation) {
                const module = getModule(nav.module);
                if (module) {
                    dynamicRoutes.push({ path: nav.url, loadChildren: module });
                }
            }
            return dynamicRoutes;
        }),
        map(dynamicRoutes => [
            ...dynamicRoutes,
            ...staticRoutes
        ]),
        map(routes => {
            router.resetConfig(routes);
            router.initialNavigation();
        })
    );
}

const staticRoutes: Routes = [
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot([], {
        //initialNavigation: 'enabledBlocking'
    })],
    exports: [RouterModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeRoutes,
            deps: [Router, WebsiteService],
            multi: true
        }
    ]
})
export class AppRoutingModule { }
