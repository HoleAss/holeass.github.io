const MAX_TIMER = 300000;
const INTERVAL = 1000;
class Timer {
    _startDate = document.cookie;
    _endDate;
    _timer = 0;
    _container;
    _isActive = false;

    constructor(container) {
        this._container = container;
        if (this._startDate) {
            this._endDate = this._startDate + MAX_TIMER;
            this._timer = Math.round((this._endDate - this._startDate) / 1000);
            this.startTimer();
        }
    }

    startTimer() {
        let display;
        let minutes;
        let seconds;
        this._isActive = true;
        if (!this._startDate) {
            this._timer = MAX_TIMER;
            this._startDate = new Date().getTime();
            document.cookie = this._startDate;
            this._endDate = this._startDate + MAX_TIMER;
            this._timer = Math.round((this._endDate - this._startDate) / 1000);
        }
        const interval = setInterval(() => {
            if (this._timer <= 0) {
                clearInterval(interval);
                this._isActive = false;
            }
            minutes = parseInt(this._timer / 60, 10);
            seconds = parseInt(this._timer % 60, 10);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            display = `${minutes}:${seconds}`;
            this._container.innerHTML = display;
            --this._timer;
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
