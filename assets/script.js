//----GLOBAL VARIABLES HOME PAGE----//
var artistText=$('#search-artist input')
var locationText=$('#search-city input')

// this function will get the search input provided and redirect to the search page
form.on('submit', function(event){ 

// this function will get the search input provided and redirect to the search page
$(document).ready(function () {
    //listens for all link clicks
    $('a').click(function (event) { 
localStorage.setItem('city', locationText.val());
localStorage.setItem('artist', artistText.val());

        window.location.href =`search-results.html`
    });
})

});