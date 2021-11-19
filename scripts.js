const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/resources/people.json';
const READY_STATE = 4;
const STATUS_OK = 200;
let button;
let list;

function onLoad() {
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    button.onclick = execute;
}

function execute() {
    exportList().then(
        function (result) {
            const list = JSON.parse(result);
            const people = list.people;
            const length = people.length;
            for (let i = 0; i < length; i++) {
                getPeopleLine(people[i]);
            }
        }
    )
}

function exportList() {
    const self = this;
    const XMLHttp = new XMLHttpRequest();
    return new Promise(function(resolve) {
        XMLHttp.onreadystatechange = function() {
            if (this.readyState === READY_STATE && this.status === STATUS_OK) {
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
    div.innerHTML = `${record.name} из ${record.city} помер в возрасте ${record.age}`;
    list.className = 'fill';
    list.append(div);
}

window.onload = onLoad;
