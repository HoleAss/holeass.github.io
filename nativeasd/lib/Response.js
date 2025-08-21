import { DataProvider } from "./DataProvider.js";

export class Response extends DataProvider {
    async getResult() {
        try {
            const result = await this._getResult();
            return result.json || result.text;
        } catch (err) {
            return err;
        }
    }
}