import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrashAlt, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SCROLL_TOP, SET_HEIGHT } from 'src/app/utils/utils-table';
import { CarModalComponent } from './car-modal/car-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { toastr } from '../toastr/toastr.component';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  faTrashAlt = faTrashAlt; faEdit = faEdit; faChevronUp = faChevronUp; faPlus = faPlus;
  limit: number = 70; showBackTop: string = '';
  cars: Car[] = [];
  search_car = new Car();

  constructor(private _modal: NgbModal, private _spinner: NgxSpinnerService) { SET_HEIGHT('view', 20, 'height'); }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = (): void => {
    this._spinner.show();
    axios.get('/api/car').then(({ data }) => {
      this.cars = data;
      this._spinner.hide();
    }).catch(() => toastr.error('Eroare la preluarea mașinilor!'));
  }

  addEdit = (id?: number): void => {
    const modalRef = this._modal.open(CarModalComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.car_id = id;
    modalRef.closed.subscribe(() => {
      this.loadData();
    });
  }

  delete = (car: any): void => {
    const modalRef = this._modal.open(ConfirmDialogComponent, {size: 'lg', keyboard: false, backdrop: 'static'});
    modalRef.componentInstance.title = `Ștergere mașină`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>
      Doriți să ștergeți mașina având 
      marca <b>${car.marca}</b>, 
      modelul: <b>${car.model}</b>, 
      anul fabricației <b>${car.model}</b>, 
      capacitatea cilindrică <b>${car.capacitate_cilindrica}</b> și
      taxa de impozit <b>${car.taxa_impozit}</b>?`;
    modalRef.closed.subscribe(() => {
      axios.delete(`/api/car/${car.id}`).then(() => {
        toastr.success('Mașina a fost ștearsă cu succes!');
        this.loadData();
      }).catch(() => toastr.error('Eroare la ștergerea mașinii!'));
    });
  }

  onResize(): void {
    SET_HEIGHT('view', 20, 'height');
  }

  showTopButton(): void {
    if (document.getElementsByClassName('view-scroll-cars')[0].scrollTop > 500) {
      this.showBackTop = 'show';
    } else {
      this.showBackTop = '';
    }
  }

  onScrollDown(): void {
    this.limit += 20;
  }

  onScrollTop(): void {
    SCROLL_TOP('view-scroll-cars', 0);
    this.limit = 70;
  }

}
