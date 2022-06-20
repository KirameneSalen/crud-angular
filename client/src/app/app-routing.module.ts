import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { InformationComponent } from './components/information/information.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  { path: 'information', component: InformationComponent },
  { path: 'person', component: PersonComponent },
  { path: 'car', component: CarComponent },
  { path: '', component: InformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
