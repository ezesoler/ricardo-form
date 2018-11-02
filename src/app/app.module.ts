import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EstructureComponent } from './estructure/estructure.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { MessagesComponent } from './messages/messages.component';
import { DestinationComponent } from './destination/destination.component';

const APP_ROUTES: Routes = [
  {path: '', component: MainComponent },
  {path: 'estructure', component: EstructureComponent },
  {path: 'messages', component: MessagesComponent },
  {path: 'destination', component: DestinationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    EstructureComponent,
    SanitizeHtmlPipe,
    MessagesComponent,
    DestinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent,FooterComponent]
})
export class AppModule { }
