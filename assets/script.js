//----GLOBAL VARIABLES HOME PAGE----//
var artistText = $('#search-artist input')
var locationText = $('#search-city input')

// this function will get the search input provided and redirect to the search page
$(document).ready(function () {
    //listens for all link clicks
    $('a').click(function (event) {
        var location = locationText.val() != undefined ? locationText.val() : '';
        var artist = artistText.val() != undefined ? artistText.val() : '';
        var state = location.split(',')[1]
        var city = location.split(',')[0]
        localStorage.setItem('city', city.toLowerCase());
        localStorage.setItem('artist', artist.toLowerCase());
        localStorage.setItem('state', state?.trim().toLowerCase())
        window.location.href = `search-results.html`

    })
})