//----GLOBAL VARIABLES SEARCH RESULTS----//
var form = $('#results');
// var insert = $('#insert-map');
var mykey = "AIzaSyDVi-GKGACDGCuHrw";
//var searchInput = $('#searchInputField');
$(document).ready(function () {
    //get local storage
    const details = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var value = localStorage.getItem(key)
        details[key] = value
    }
    getEventApi(details)
});
//this function will parse the URL and get event data from the ticketmaster API
function getEventApi(data) {
    //URL is a class that takes in a url and then constructs it based on the parameters added through the methods bellow. 
    const ticketMasterSrc = new URL('https://app.ticketmaster.com/discovery/v2/events.json?')
    if (data['artist'] !== '') {
        //searchParams is a method of the class URL that appends the key (keyword) and assigns it the value (data[key]) to the url
        ticketMasterSrc.searchParams.append('keyword', data['artist'])
    }
    if (data['city'] !== '') {
        ticketMasterSrc.searchParams.append('city', data['city'])
        ticketMasterSrc.searchParams.append('state', data['state'])
    }
    ticketMasterSrc.searchParams.append('size', 5)
    ticketMasterSrc.searchParams.append('apikey', 'drGLGyf4VsdbAnIfEkn6xrA1QAWMUH7O')

    //href is a method of URL class that creates the string of the URL that will be used in the fetch 
    getApi(ticketMasterSrc.href);

}

//this function will parse the URL and get the map data from the Google map API 
function getMapData(data) {

    var googleSrc = 'https://www.google.com/maps/embed/v1/place?';

    // if (data._embedded && data._embedded.events) {
    //     var numberOfEvents = data._embedded.events.length

        // for (var i = 0; i < numberOfEvents; i++) {
            // var eventVenue = data._embedded.events[i]._embedded.venues[0].name;
            var requestUrl = googleSrc + "key=" + mykey + "RzhM10mkpiS3mtjBE&q=" + data;
            displayMapResults(requestUrl);
            console.log(requestUrl);
        // }
    // } else {
    //     $("#insert-map").text("Sorry, there are no results in your area!");
    // }

}

//this function will create and append the HTML for the results received from the ticketmaster API
function displayEventResults(data) {
    console.log("test1");
    if (data._embedded && data._embedded.events) {
        var numberOfEvents = data._embedded.events.length

        for (var i = 0; i < numberOfEvents; i++) {
            var artistName = data._embedded.events[i].name
            var location = data._embedded.events[i]._embedded.venues[0].name
            var salesUrl = data._embedded.events[i].url
            var city = data._embedded.events[i]._embedded.venues[0].city.name
            var state = data._embedded.events[i]._embedded.venues[0].state.name
            var image = data._embedded.events[i].images[0].url
            console.log(`${artistName} is playing at ${location} in ${city}, ${state}`)
            form.append(`  <div class="card-image has-text-centered">
<img src="${image}">
</div>
<div class="card-content">
<ul>
    <li>Artist: ${artistName}</li>
    <li>Location: ${location} in ${city}, ${state}</li>
</ul>
</div>
<div>
<footer class="card-footer">
    <a class="button is-primary is-centered" href="${salesUrl}">Buy Tickets</a>
</footer>
<div id="insert-map"> ${getMapData(location)}</div>

</div>`);
// getMapData(location);
console.log(location);
        }
    } else {
        form.text("Sorry, there are no results in your area!");
    }
}

//this function will create and append the HTML for the results received from the Google map API
function displayMapResults(requestUrl) {
console.log("test2");
    var mapIframe = $('<iframe></iframe>').attr('src', requestUrl);
    $("#insert-map").append(mapIframe); //may need to add attributes or classes

}

//super janky version
function getApi(requestUrl) {

    console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Ticketmaster API \n----------');
            console.log(data);
            displayEventResults(data);
        });
}