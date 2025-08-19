import { Response } from "./lib/Response.js";
const BUTTON = 'button';
const LIST = 'list';
const WRITE_DELAY = 100;

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
        list.addEventListener('click', eventListener.bind(resp));
        setInterval(function () {
            if (index === length) {
                list.removeEventListener('click', eventListener.bind(resp));
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
    alert(this.alertText);
}

window.onload = onLoad;
