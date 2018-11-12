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
import { ConectionComponent } from './conection/conection.component';
import { GeneratorComponent } from './generator/generator.component';
import { HttpClientModule } from '@angular/common/http';

const APP_ROUTES: Routes = [
  {path: '', component: MainComponent },
  {path: 'estructure', component: EstructureComponent },
  {path: 'messages', component: MessagesComponent },
  {path: 'destination', component: DestinationComponent },
  {path: 'conection', component: ConectionComponent },
  {path: 'generator', component: GeneratorComponent }
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
    DestinationComponent,
    ConectionComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent,FooterComponent]
})
export class AppModule { }
