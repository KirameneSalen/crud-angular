export class Car {

    constructor(
        public id?: number,
        public marca = '',
        public model = '',
        public nume = '',
        public an_fabricatie: number | null = null,
        public capacitate_cilindrica: number | null = null,
        public taxa_impozit: number | null = null
    ) {

    }

}