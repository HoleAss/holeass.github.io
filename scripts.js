const BUTTON = 'button';
const LIST_PATH = '/resources/people.json';
const READY_STATE = 4;
const STATUS_OK = 200;
let button;

function onLoad() {
    button = document.getElementById(BUTTON);
    button.onclick = execute;
}

function execute() {
    exportList().then(
        function (result) {
            const list = JSON.parse(result);
            const people = list.people;
            const length = people.length;
            for (let i = 0; i < length; i++) {
                console.log(people[i]);
            }
        }
    )
}

function exportList() {
    const self = this;
    const xhttp = new XMLHttpRequest();
    return new Promise(function(resolve) {
        xhttp.onreadystatechange = function() {
            if (this.readyState === READY_STATE && this.status === STATUS_OK) {
                resolve(this.responseText);
            }
        };
        xhttp.open('GET', LIST_PATH, true);
        xhttp.send();
    });
}

function getPeople() {
    return Promise.resolve('привет');
}

window.onload = onLoad;
