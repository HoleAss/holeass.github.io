export class DataProvider {
    constructor() {
        this.srcJson = '/native/resources/people.json';
    }
    async getData() {
        this._response = await fetch(this.srcJson);
        return this._response;
    }
}