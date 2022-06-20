import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  limit: number = 70; showBackTop: string = '';
  @Input() cars: Car[] | undefined = [];

  constructor() { }

  ngOnInit(): void {
  }

}
