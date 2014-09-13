'use strict';

function search() {
    var query = document.getElementById("search-box").value;
    window.open("http://google.com/search?q=" + query
        + "%20site:" + "http://www.jonathanholmlund.co.uk");
}