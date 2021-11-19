const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/resources/people.json';
const READY_STATE = 4;
const STATUS_OK = 200;
const INTERVAL_DELAY = 200;
const MAX_ROW = 9;
let button;
let list;

function onLoad() {
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    button.onclick = execute;
}

function execute() {
    let i = 0;
    clearList();
    exportList().then(
        function (result) {
            const list = JSON.parse(result);
            const people = list.people;
            const length = people.length;
            const timerId = setInterval(() => {
                getPeopleLine(people[i]);
                if (i === MAX_ROW) {
                    clearTimeout(timerId);
                }
            }, INTERVAL_DELAY);
        }
    )
}

function exportList() {
    const self = this;
    const XMLHttp = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        XMLHttp.onreadystatechange = function() {
            if (this.status === STATUS_OK) {
                resolve(this.responseText);
            }
        };
        XMLHttp.open('GET', LIST_PATH, true);
        XMLHttp.send();
    });
}

function getPeopleLine(record) {
    let div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `${record.name} из ${record.city} в возрасте ${record.age}`;
    list.className = 'list fill';
    list.append(div);
}

function clearList() {
    list.className = 'list';
    list.innerHTML = '';
}

window.onload = onLoad;
