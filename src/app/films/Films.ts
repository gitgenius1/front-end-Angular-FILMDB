// Films model
export class Films {
    constructor(
        public id: number,
        public title: string,
        public year: number,
        public director: string,
        public stars: string,
        public review: string
    ) {
    }
}