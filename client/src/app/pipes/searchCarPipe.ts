import { Pipe, PipeTransform } from "@angular/core";
import { Car } from "../models/car";
import { REPLACE_DIACRITICS } from "../utils/utils-input";

@Pipe({
    name: 'searchCar'
})
export class SearchCarPipe implements PipeTransform {
    transform(value: Car[], args: Car) {
        if (!value) return null;
        if (!args) return value;


        if (args.marca) {
            value = value.filter((obj: Car) => REPLACE_DIACRITICS(obj.marca.toLowerCase()).includes(REPLACE_DIACRITICS(args.marca.toLowerCase())));
        }

        if (args.model) {
            value = value.filter((obj: Car) => REPLACE_DIACRITICS(obj.model.toLowerCase()).includes(REPLACE_DIACRITICS(args.model.toLowerCase())));
        }

        if (args.an_fabricatie) {
            value = value.filter((obj: Car) => obj.an_fabricatie === args.an_fabricatie);
        }

        if (args.capacitate_cilindrica) {
            value = value.filter((obj: Car) => obj.capacitate_cilindrica === args.capacitate_cilindrica);
        }

        if (args.taxa_impozit) {
            value = value.filter((obj: Car) => obj.taxa_impozit === args.taxa_impozit);
        }
        return value;
    }
}