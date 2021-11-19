const LIST_PATH = '/resources/people.json';
let button;

/**
 * Обработчик события загрузки всей страницы.
 */
function onLoad() {
    button = document.getElementById('button');
    button.onclick = execute;
}

function execute() {
    exportList().then(
        function (result) {
            console.log(result);
        }
    )
}

/**
 * Обработчик выгрузки списка из файла.
 */
function exportList() {
    const xhttp = new XMLHttpRequest();
    return new Promise(function(resolve) {
        xhttp.onreadystatechange = function() {
            resolve('ПРИВЕТ!');
        };
        xhttp.open('GET', LIST_PATH, true);
        xhttp.send();
    });
}

/**
 * Вывод выгруженного списка.
 */
function getPeople() {
    return Promise.resolve('привет');
}

window.onload = onLoad;
