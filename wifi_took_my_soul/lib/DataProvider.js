export class DataProvider {
    async _getResult() {
        try {
            const text = await this._response.text();
            const json = await this._response.json();
            return { text, json };
        } catch (err) {
            return { text: err, json: err }
        }
    }
    constructor() {
        this.srcJson = '/native/resources/people.json';
        this.alertText = 'список еще не готов';
    }
    async getData() {
        this._response = await fetch(this.srcJson);
        return this._response;
    }
}