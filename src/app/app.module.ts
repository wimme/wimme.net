import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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

import { LOCATION_PROVIDERS } from './providers/location.provider';
import { WINDOW_PROVIDERS } from './providers/window.provider';

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
        LOCATION_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
