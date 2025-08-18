export class DataProvider {
    async _getResult() {
        const text = await this._response.text();
        const json = await this._response.json();
        return { text, json };
    }
    constructor() {
        this.srcJson = '/native/resources/people.json';
    }
    async getData() {
        this._response = await fetch(this.srcJson);
        return this._response;
    }
}