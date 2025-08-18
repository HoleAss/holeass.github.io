import { DataProvider } from "./DataProvider";

export class Response extends DataProvider {
    async getResult() {
        try {
            const text = await this._response.text();
            const json = await this._response.json();
            return json || text;
        } catch (err) {
            return err;
        }
    }
}