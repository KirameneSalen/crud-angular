import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrashAlt, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SCROLL_TOP, SET_HEIGHT } from 'src/app/utils/utils-table';
import { PersonModalComponent } from './person-modal/person-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { toastr } from '../toastr/toastr.component';
import { Person } from 'src/app/models/person';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  faTrashAlt = faTrashAlt; faEdit = faEdit; faChevronUp = faChevronUp; faPlus = faPlus;
  limit: number = 70; showBackTop: string = '';
  person: Person[] = [];
  search_person = new Person();
  car = '';
  car_id = [];

  constructor(private _modal: NgbModal, private _spinner: NgxSpinnerService) { SET_HEIGHT('view', 20, 'height'); }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = async (): Promise<void> => {
    this._spinner.show();
    axios.get('/api/person').then(({ data }) => {
      this.person = data;
      this.person.forEach(async person => {
        axios.get(`/api/carPerson/${person.id}`).then(({ data }) => {
          person.cars = data;
          person.cars?.map((c) => c.nume = c.marca + ' ' + c.model + ' ' + c.an_fabricatie?.toString())
        }).catch((error) => {
          console.log(error);
        });
      });
      this._spinner.hide();
    }).catch(() => toastr.error('Eroare la preluarea persoanelor!'));
  }

  addEdit = (id?: number): void => {
    const modalRef = this._modal.open(PersonModalComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.person_id = id;
    modalRef.closed.subscribe(() => {
      this.loadData();
    });
  }

  delete = (person: Person): void => {
    const modalRef = this._modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Ștergere persoană`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>
      Doriți să ștergeți persoana având 
      numele <b>${person.nume}</b>, 
      prenumele <b>${person.prenume}</b>, 
      CNP-ul <b>${person.cnp}</b> și
      vârsta <b>${person.varsta}</b>?`;
    modalRef.closed.subscribe(() => {
      axios.delete(`/api/person/${person.id}`).then(() => {
        toastr.success('Persoana a fost ștearsă cu succes!');
        this.loadData();
      }).catch(() => toastr.error('Eroare la ștergerea persoanei!'));
    });
  }

  onResize(): void {
    SET_HEIGHT('view', 20, 'height');
  }

  showTopButton(): void {
    if (document.getElementsByClassName('view-scroll-persons')[0].scrollTop > 500) {
      this.showBackTop = 'show';
    } else {
      this.showBackTop = '';
    }
  }

  onScrollDown(): void {
    this.limit += 20;
  }

  onScrollTop(): void {
    SCROLL_TOP('view-scroll-persons', 0);
    this.limit = 70;
  }

}
