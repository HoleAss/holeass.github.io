const BUTTON = 'button';
const LIST = 'list';
const LIST_PATH = '/native/resources/people.json';
const WRITE_DELAY = 100;
const HISTORY_LENGTH = 100;
const historyArray = [];
import { Response } from './lib/Response';
let resp;
let button;
let list

function onLoad() {
    resp = new Response();
    button = document.getElementById(BUTTON);
    list = document.getElementById(LIST);
    button.onclick = async () => await execute();
}

async function execute() {
    try {
        const result = await exportList();
        const people = JSON.parse(result)?.people;
        const length = people.length || 0;
        let index = 0;

        clearList();
        list.addEventListener('click', eventListener.bind(this));
        setInterval(function () {
            if (index === length) {
                historyPush();
                list.removeEventListener('click', eventListener.bind(this));
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
    return resp.getResult();
    // try {

    //     // const response = await fetch(LIST_PATH);
    //     // const text = await response.text();
    //     // const json = await response.json();

    //     // return json || text;
    // } catch (error) {
    //     return error;
    // }
}

function getPeopleLine(record) {
    if (!record) return;

    const divElement = document.createElement('div');

    divElement.className = 'row';
    divElement.innerHTML = `${record.name} из ${record.city} в возрасте ${record.age}`;
    list.className = 'list fill';
    list.append(divElement);
}

function clearList() {
    list.className = 'list';
    list.innerHTML = '';
}

function eventListener() {
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
