const COOKIE = {
    FINISH_TEST: 'test=false',
    START_TEST: 'test=true'
}

class Timer {
    _cookie = document.cookie || COOKIE.START_TEST;
    _canExecute = false;
    constructor() {
       this._canExecute = this._cookie === COOKIE.START_TEST;
    }
}

Object.defineProperties(Timer.prototype, {
    canExecute: {
        get() {
            return this._canExecute
        }
    }
});
