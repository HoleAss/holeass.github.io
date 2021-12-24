const MAX_TIMER = 600000;
const TICK = 1000;
class Timer {
    _startDate = document.cookie;
    _isActive = false;
    _endDate;
    _container;
    _workspace;

    constructor(container, workspace) {
        this._container = container;
        this._workspace = workspace;
        if (this._startDate) {
            this._endDate = Number.parseInt(this._startDate, 10) + MAX_TIMER;
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
            let timer =  Math.round((this._endDate - new Date().getTime()) / TICK);
            if (timer <= 0) {
                this._isActive = false;
                this._container.innerHTML = '';
                this._workspace.innerHTML = '<div class="time-out">Время вышло</div>';
                clearInterval(interval);
                return;
            }
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            display = `${minutes}:${seconds}`;
            this._container.innerHTML = display;
        }, TICK);
    }
}

Object.defineProperties(Timer.prototype, {
    isActive: {
        get() {
            return this._isActive;
        }
    }
});
