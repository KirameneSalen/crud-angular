import { Pipe, PipeTransform } from "@angular/core";
import { Car } from "../models/car";
import { Person } from "../models/person";
import { REPLACE_DIACRITICS } from "../utils/utils-input";

@Pipe({
    name: 'searchPerson'
})
export class SearchPersonPipe implements PipeTransform {
    transform(value: Person[], args: Person, car: string) {
        if (!value) return null;
        if (!args) return value;


        if (args.nume) {
            value = value.filter((obj: Person) => REPLACE_DIACRITICS(obj.nume.toLowerCase()).includes(REPLACE_DIACRITICS(args.nume.toLowerCase())));
        }

        if (args.prenume) {
            value = value.filter((obj: Person) => REPLACE_DIACRITICS(obj.prenume.toLowerCase()).includes(REPLACE_DIACRITICS(args.prenume.toLowerCase())));
        }

        if (args.cnp) {
            value = value.filter((obj: Person) => obj.cnp.includes(args.cnp));
        }

        if (args.varsta) {
            value = value.filter((obj: Person) => obj.varsta === args.varsta);
        }

        if (car) {
            value = value.filter((obj: Person) => {
                if (obj.cars) return obj.cars.map(c => c.nume).join(' ').includes(car)
                return true;
            });
        }

        return value;
    }
}