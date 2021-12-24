const BUTTON = 'button';
const LIST = 'list';
const TIMER = 'timer';
const WORKSPACE = 'workspace';
const LIST_PATH = '/native/resources/people.json';
let button;
let list;
let timer;

function onLoad() {
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    timer = new Timer(document.getElementById(TIMER), document.getElementById(WORKSPACE));
    button.onclick = async () => {
        timer.startTimer();
        await execute();
    }
}

async function execute() {
    let result = await exportList();
    let people = JSON.parse(result);
    clearList();
    for (let item of people) {
        item++;
        getPeopleLine(item);
    }
}

async function exportList() {
    try {
        let response = await fetch(LIST_PATH);
        let text = await response.text();
        return await response.json() || text;
    } catch (error) {
        return error;
    }
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
