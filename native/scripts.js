const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/native/resources/people.json';
const WRITE_DELAY = 100;
const HISTORY_LENGTH = 100000;
const historyArray = [];
let button;
let list;

function onLoad() {
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    button.onclick = async () => {
        await execute();
    }
}

async function execute() {
    const result = await exportList();
    const people = JSON.parse(result).people;
    const length = people.length;
    const writeLite = function (index, endIndex) {
        if (index === endIndex) {
            historyPush();
            list.removeEventListener('click', eventListner.bind(this));
            return;
        }

        setTimeout(function () {
            getPeopleLine(people[index]);
            writeLite(++index, endIndex);
        }, WRITE_DELAY);
    };
    clearList();
    list.addEventListener('click', eventListner.bind(this));
    writeLite(0, length);
}

async function exportList() {
    try {
        const response = await fetch(LIST_PATH);
        const text = await response.text();
        return await response.json() || text;
    } catch (error) {
        return error;
    }
}

function getPeopleLine(record) {
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `${record.name} из ${record.city} в возрасте ${record.age}`;
    list.className = 'list fill';
    list.append(div);
}

function clearList() {
    list.className = 'list';
    list.innerHTML = '';
}

function eventListner() {
    console.log('список еще не готов');
}

function generateHistory() {
    const result = [];
    for (let i = 0; i < HISTORY_LENGTH; i++) {
        result.push(`Что-то лежит в истории ${Math.random()}`);
    }
    return result;
}

function historyPush() {
    historyArray.push(generateHistory());
}

window.onload = onLoad;
