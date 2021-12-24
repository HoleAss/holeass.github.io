const MAX_TIMER = 300;
const INTERVAL = 1000;
class Timer {
    _timer = parseInt(document.cookie, 10);
    _isActive = false;

    constructor() {
        if (this._timer) {
            this.startTimer();
        } else {
            this._timer = MAX_TIMER;
            document.cookie = this._timer.toString();
        }
    }

    startTimer() {
        let display;
        let minutes;
        let seconds;
        this._isActive = true;
        const interval = setInterval(() => {
            minutes = parseInt(this._timer / 60, 10);
            seconds = parseInt(this._timer % 60, 10);
            minutes = minutes < 10 ? `"0"${minutes}` : minutes;
            seconds = seconds < 10 ? `"0"${seconds}` : seconds;
            display = `${minutes}:${seconds}`;
            console.log(display);
            document.cookie = (--this._timer).toString();
            if (this._timer === 0) {
                clearInterval(interval);
                this._isActive = false;
            }
        }, INTERVAL);
    }
}

Object.defineProperties(Timer.prototype, {
    isActive: {
        get() {
            return this._isActive
        }
    }
});
