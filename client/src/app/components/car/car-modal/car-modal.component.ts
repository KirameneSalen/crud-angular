import axios from 'axios';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { REPLACE_DIACRITICS } from 'src/app/utils/utils-input';
import { toastr } from '../../toastr/toastr.component';
import { NgForm } from '@angular/forms';
import { Car } from 'src/app/models/car';
import * as e from 'express';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss']
})
export class CarModalComponent implements OnInit {

  @Input() car_id: number | undefined;

  modal = {} as Car;

  constructor(private _spinner: NgxSpinnerService, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    if (this.car_id) {
      this._spinner.show();
      axios.get(`/api/car/${this.car_id}`).then(({ data }) => {
        console.log(data);
        console.log(this.car_id);
        this.modal = data;
        this._spinner.hide();
      }).catch(() => toastr.error('Eroare la preluarea mașinii!'));
    }
  }

  save(): void {
    this._spinner.show();
    if(this.modal.capacitate_cilindrica){
      if(this.modal.capacitate_cilindrica < 1500) {
        this.modal.taxa_impozit = 50;
      }
      else if(this.modal.capacitate_cilindrica < 2000) {
          this.modal.taxa_impozit = 100;
      }
      else {
          this.modal.taxa_impozit = 150;
      }
    }
    else{
      this.modal.taxa_impozit = null;
    }

    if (!this.car_id) {
      axios.post('/api/car', this.modal).then(() => {
        this._spinner.hide();
        toastr.success('Mașina a fost salvată cu succes!');
        this.activeModal.close();
      }).catch(() => toastr.error('Eroare la salvarea mașinii!'));
    } else {
      axios.put('/api/car', this.modal).then(() => {
        this._spinner.hide();
        toastr.success('Mașina a fost modificată cu succes!');
        this.activeModal.close();
      }).catch(() => toastr.error('Eroare la modificarea mașinii!'));
    }
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
