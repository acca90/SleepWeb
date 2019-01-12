import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DataTablesModule } from 'angular-datatables';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

import { SandboxComponent } from './sandbox/sandbox.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        SandboxComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AngularFontAwesomeModule,
        DataTablesModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
