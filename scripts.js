function onLoad() {
    console.log(123);
}

function exportList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = getPeople;
    xhttp.open('GET', '/resources/people.json', true);
    xhttp.send();
}

function getPeople() {
    console.log(321);
}

window.onload = onLoad;
