import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { toastr } from '../../toastr/toastr.component';
import { Person } from 'src/app/models/person';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss']
})
export class PersonModalComponent implements OnInit {

  @Input() person_id: number | undefined;

  modal = {} as Person;
  cars: Car[] = [];
  car_id: (number | undefined)[] | undefined = [];
  created_id: number = -1;

  constructor(private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (this.person_id) {
      this._spinner.show();
      axios.get(`/api/person/${this.person_id}`).then(({ data }) => {
        console.log(data);
        console.log(this.person_id);
        this.modal = data;
      }).catch(() => toastr.error('Eroare la preluarea persoanei!'));
      axios.get(`/api/carPerson/${this.person_id}`).then(({ data }) => {
        this.modal.cars = data;
        this.car_id = this.modal.cars?.map(car => car.id);
        this._spinner.hide();
      }).catch(() => toastr.error('Eroare la preluarea mașinilor!'));
    }

    axios.get(`/api/car`).then(({ data }) => {
      this.cars = data;
      this.cars.map((i) => i.getName());
      this._spinner.hide();
    }).catch(() => toastr.error('Eroare la preluarea mașinilor!'));
  }

  async save(): Promise<void> {
    this._spinner.show();
    this.modal.varsta = this.calculateAge(this.modal.cnp);
    if (!this.person_id) {
      await axios.post('/api/person', this.modal).then((response) => {
        this._spinner.hide();
        toastr.success('Persoana a fost salvată cu succes!');
        this.created_id = response.data.id;
        this.activeModal.close();
      }).catch(() => toastr.error('Eroare la salvarea persoanei!'));
      this.car_id?.forEach(car => {
        console.log(`CarID: ${car}, PersonId: ${this.created_id}`);
        axios.post('/api/carPerson', { CarId: car, PersonId: this.created_id }).then(() => {
          this._spinner.hide();
          this.activeModal.close();
        }).catch(() => toastr.error('Eroare la salvarea mașinilor!'));
      });
    } else {
      axios.put('/api/person', this.modal).then(() => {
        this._spinner.hide();
        toastr.success('Persoana a fost modificată cu succes!');
        this.activeModal.close();
      }).catch(() => toastr.error('Eroare la modificarea persoanei!'));

      let cars_to_be_added = this.car_id?.filter(x => this.modal.cars?.map(x => x.id).indexOf(x) === -1);
      console.log(cars_to_be_added);
      let cars_to_be_deleted = this.modal.cars?.filter(x => this.car_id?.indexOf(x.id) === -1);
      console.log(cars_to_be_deleted);
      cars_to_be_deleted?.forEach(car => {
        axios.delete(`/api/carPerson/del?car_id=${car.id}&person_id=${this.person_id}`).then(() => {
          this._spinner.hide();
          this.activeModal.close();
        }).catch(() => toastr.error('Eroare la salvarea persoanei!'));
      });
      cars_to_be_added?.forEach(car => {
        console.log(`CarID: ${car}, PersonId: ${this.person_id}`);
        axios.post('/api/carPerson', { CarId: car, PersonId: this.person_id }).then(() => {
          this._spinner.hide();
          this.activeModal.close();
        }).catch(() => toastr.error('Eroare la salvarea persoanei!'));
      });
    }
  }

  calculateAge(cnp: string): number {
    let baseYear = 0;

    switch (cnp[0]) {
      case '1' || '2':
        baseYear = 1900;
        break;
      case '3' || '4':
        baseYear = 1800;
        break;
      case '5' || '6':
        baseYear = 2000;
        break;
      default:
        baseYear = 1900;
    }

    let year = baseYear + parseInt(cnp.slice(1, 3));
    let month = parseInt(cnp.slice(3, 5));
    let day = parseInt(cnp.slice(5, 7));

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDay();

    let varsta = currentYear - year;

    if (currentMonth < month - 1) {
      varsta--;
    }
    if (month - 1 == currentMonth && currentDay < day) {
      varsta--;
    }
    return varsta;
  }

  selectSearch(term: string, item: any): boolean {
    const isWordThere = [] as any;
    const splitTerm = term.split(' ').filter(t => t);

    item = REPLACE_DIACRITICS(item.name);

    splitTerm.forEach(term => isWordThere.push(item.indexOf(REPLACE_DIACRITICS(term)) !== -1));
    const all_words = (this_word: any) => this_word;

    return isWordThere.every(all_words);
  }

}
