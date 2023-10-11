//----GLOBAL VARIABLES HOME PAGE----//
var artistText = $('#search-artist input')
var locationText = $('#search-city input')

// this function will get the search input provided and redirect to the search page
$(document).ready(function () {
    //listens for all link clicks
    $('a').click(function (event) {
        var location = locationText.val() != undefined ? locationText.val() : '';
        var artist = artistText.val() != undefined ? artistText.val() : '';

        localStorage.setItem('city', location);
        localStorage.setItem('artist', artist);

        window.location.href = `search-results.html`

    })
})