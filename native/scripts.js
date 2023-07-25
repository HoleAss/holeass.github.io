const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/native/resources/people.json';
const WRITE_DELAY = 100;
const HISTORY_LENGTH = 2;
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
    try {
        const result = await exportList();
        const people = JSON.parse(result);
        const length = people.length;
        let index = 0;
        clearList();
        list.addEventListener('click', eventListner.bind(this));
        setInterval(function () {
            if (index === length) {
                historyPush();
                list.removeEventListener('click', eventListner.bind(this));
                return;
            }
            getPeopleLine(people[index]);
            index++;
        }, WRITE_DELAY);
    } catch (error) {
        throw error;
    }
}

async function exportList() {
    try {
        const response = await fetch(LIST_PATH);
        const text = await response.text();
        // const json = await response.json();
        return text;
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
