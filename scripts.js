function exportList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

    };
    xhttp.open('GET', '/resources/people.json', true);
    xhttp.send();
}

console.log(123);