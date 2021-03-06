import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive-ng13fix';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InformationComponent } from './components/information/information.component';
import { InformationModalComponent } from './components/information/information-modal/information-modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CarComponent } from './components/car/car.component';
import { CarModalComponent } from './components/car/car-modal/car-modal.component';
import { SearchCarPipe } from './pipes/searchCarPipe';
import { PersonComponent } from './components/person/person.component';
import { PersonModalComponent } from './components/person/person-modal/person-modal.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { SearchPersonPipe } from './pipes/searchPersonPipe';
import { GetCarNamePipe } from './pipes/getCarNamePipe';

const DefaultTooltipOptions: TooltipOptions = {
  'hide-delay': 0
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InformationComponent,
    InformationModalComponent,
    ConfirmDialogComponent,
    CarComponent,
    CarModalComponent,
    SearchCarPipe,
    PersonComponent,
    PersonModalComponent,
    CarListComponent,
    SearchPersonPipe,
    GetCarNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    InfiniteScrollModule,
    TooltipModule.forRoot(DefaultTooltipOptions as TooltipOptions),
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
