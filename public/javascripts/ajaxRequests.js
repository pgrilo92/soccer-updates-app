let mainUrl = 'https://free-nba.p.rapidapi.com/' 
let searchHandle = "?search="
let searchLeagueUrl = "leagues/search/"
let key = 'f83d6f7d08b762ea607cf55201b54cc8'
let key2 = '7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465'

$('form').on('submit', function(e) {
    e.preventDefault()
    let userInput = $('#search').val()
    let userData = userInput.split(' ').join('_')

    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://api-football-v1.p.rapidapi.com/v2/leagues/search/" + userData,
        method: "GET",
        headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": key2
        },
        success: function(json) {
            $('#search-results').html('')
            onSuccessLeague(json)
        },
        error: onError
    })
})


$.ajax({
    async: true,
    crossDomain: true,
    url: "https://api-football-v1.p.rapidapi.com/v2/topscorers/524",
    method: "GET",
    headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": key2
    },
    success: function(json) {
        $('#search-results').html('')
        onSuccess(json)
    },
    error: onError
})
function onSuccessLeague(json) {
    
        json.api.leagues.forEach(function(league) {
            $("#search-results").append(`
            <p>Player: ${league.name}</p>
            <img src="${league.logo}" class="img-fluid">
            `)    
        })
}
function onSuccess(json) {
    
    json.api.topscorers.forEach(function(player) {
        $("#search-results").append(`
        <p>Player: ${player.player_name} ${player.goals.total} Team: ${player.team_name} </p>
        `)
    })
}

function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}