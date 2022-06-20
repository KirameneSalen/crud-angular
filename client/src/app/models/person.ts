import { Car } from "./car";

export class Person {

    constructor(
        public id?: number,
        public nume = '',
        public prenume = '',
        public cnp = '',
        public varsta: number | null = null,
        public cars?: Car[],
    ) {

    }

}