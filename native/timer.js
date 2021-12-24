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
            this.startTimer();
        }
    }

    startTimer() {
        let display;
        let minutes;
        let seconds;
        this._isActive = true;
        if (!this._startDate) {
            this._startDate = new Date().getTime();
            document.cookie = this._startDate;
            this._endDate = this._startDate + MAX_TIMER;
        }
        const interval = setInterval(() => {
            let timer =  Math.round((this._endDate - this._startDate) / 1000) - 1
            if (timer <= 0) {
                clearInterval(interval);
                this._isActive = false;
                display = `Время вышло!`;
                return;
            }
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            display = `${minutes}:${seconds}`;
            this._container.innerHTML = display;
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
