const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/resources/people.json';
const READY_STATE = 4;
const STATUS_OK = 200;
let button;
let list;
let i = 0;

function onLoad() {
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    button.onclick = execute;
}

function execute() {
    clearList();
    exportList().then(
        function (result) {
            const list = JSON.parse(result);
            const people = list.people;
            const length = people.length;
            for (const item of people) {
                getPeopleLine(people[i]);
            }
        }
    )
}

function exportList() {
    const self = this;
    const XMLHttp = new XMLHttpRequest();
    return new Promise(function(resolve) {
        fetch(LIST_PATH).then(
            (data) => {
                resolve(data);
            }
        )
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
