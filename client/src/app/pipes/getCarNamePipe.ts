import { Pipe, PipeTransform } from "@angular/core";
import { Car } from "../models/car";

@Pipe({
    name: 'getCarName'
})
export class GetCarNamePipe implements PipeTransform {
    transform(value: Car) {
        if (!value) return null;
        return `${value.marca} ${value.model} ${value.an_fabricatie}`;
    }
}