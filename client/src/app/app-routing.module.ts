import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { InformationComponent } from './components/information/information.component';

const routes: Routes = [
  { path: 'information', component: InformationComponent },
  { path: 'car', component: CarComponent },
  { path: '', component: InformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
