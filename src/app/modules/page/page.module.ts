import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { ContactComponent } from './elements/contact/contact.component';

@NgModule({
    declarations: [
        PageComponent,
        ContactComponent
    ],
    imports: [
        CommonModule,
        PageRoutingModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class PageModule { }
