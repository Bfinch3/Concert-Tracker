//----GLOBAL VARIABLES SEARCH RESULTS----//
var form = $('#my-form');
var mapDiv = $('#insert-map');
var mykey = "AIzaSyDVi-GKGACDGCuHrw";
//var searchInput = $('#searchInputField');

//this function will parse the URL and get event data from the ticketmaster API
function getEventApi(){
    
}

//this function will parse the URL and get the map data from the Google map API 
function getMapData(data){
    
    var googleSrc = 'https://www.google.com/maps/embed/v1/place?';
    
    if (data._embedded && data._embedded.events) {
        var numberOfEvents = data._embedded.events.length

            for (var i = 0; i < numberOfEvents; i++) {
            var eventVenue = data._embedded.events[i]._embedded.venues[0].name;
            var requestUrl = googleSrc + "key=" + mykey + "RzhM10mkpiS3mtjBE&q=" + eventVenue;
            displayMapResults(requestUrl);
        }
    } else {
        mapDiv.text("Sorry, there are no results in your area!");
    }

}

//this function will create and append the HTML for the results received from the ticketmaster API
function displayEventResults(){ 
    
}

//this function will create and append the HTML for the results received from the Google map API
function displayMapResults(requestUrl){

        var mapIframe = $('<iframe></iframe>').attr('src',requestUrl);
        mapDiv.append(mapIframe); //may need to add attributes or classes
    
}

//super janky version
function getApi(){ 
    
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&keyword=drake&apikey=drGLGyf4VsdbAnIfEkn6xrA1QAWMUH7O';

    console.log(requestUrl);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Ticketmaster API \n----------');
            console.log(data);
            getMapData(data);
        });
}

getApi();