const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/native/resources/people.json';
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
    let result = await exportList();
    let people = JSON.parse(result);
    clearList();
    list.addEventListener('click', eventListner.bind(this));
    for (let item of people) {
        item++;
        getPeopleLine(item);
    }
    list.removeEventListener('click', eventListner.bind(this));
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
    setTimeout(() => list.append(div), 500);
}

function clearList() {
    list.className = 'list';
    list.innerHTML = '';
}

function eventListner() {
    console.log('список еще не готов')
}

window.onload = onLoad;
