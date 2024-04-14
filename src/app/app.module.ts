import { inject, isDevMode, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatomoConfiguration, MatomoConsentMode, provideMatomo, withRouter } from 'ngx-matomo-client';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './elements/image/image.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PopupComponent } from './components/popup/popup.component';
import { RecentsComponent } from './components/recents/recents.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LOCATION, LOCATION_PROVIDERS } from './providers/location.provider';
import { WINDOW_PROVIDERS } from './providers/window.provider';

function matomoConfigFactory(platformId: Object, location: Location): MatomoConfiguration {
    const siteId = getMatomoSiteId(location);
    return {
        disabled: !siteId || !isPlatformBrowser(platformId) || isDevMode(),
        siteId: siteId,
        trackerUrl: '//analytics.wimme.net',
        requireConsent: MatomoConsentMode.COOKIE
    };
}

function getMatomoSiteId(location: Location): string | number {
    switch (location.hostname) {
        case 'wimme.net':
            return '1';
        case 'vakantievibes.be':
            return '2';
    }
    return '';
};

@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        FooterComponent,
        HeaderComponent,
        ImageComponent,
        LoaderComponent,
        NavigationComponent,
        PopupComponent,
        RecentsComponent,
        SearchComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        WINDOW_PROVIDERS,
        LOCATION_PROVIDERS,
        provideMatomo(
            () => matomoConfigFactory(inject(PLATFORM_ID), inject(LOCATION)),
            withRouter()
        )
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
