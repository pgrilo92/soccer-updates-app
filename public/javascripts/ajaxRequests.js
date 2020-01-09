let mainUrl = 'https://api-football-v1.p.rapidapi.com/v2/' 
let searchLeagueUrl = "leagues/search/"
let key2 = '7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465'

$('search-form').on('submit', function(e) {
    e.preventDefault()
    let userInput = $('#search').val()
    let userData = userInput.split(' ').join('_')

    $.ajax({
        async: true,
        crossDomain: true,
        url: mainUrl + searchLeagueUrl + userData,
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

$('search-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        async: true,
        crossDomain: true,
        url: mainUrl + "topscorers/524",
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
})
function onSuccessLeague(json) {
    
        json.api.leagues.forEach(function(league) {
            if(league.season === 2019 && league.logo != null) {
            $("#search-results").append(`
            <div class="col-4">
                <div class="card" style="width: 300px;">
                    <img src="${league.logo}" class="card-img-top" alt="league-logo">
                    <div class="card-body">
                        <h5 class="card-title">${league.name}</h5>
                        <p class="card-text"> Season: ${league.season} </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Country: ${league.country}</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
            `)    
            }
        })
}
function onSuccess(json) {
    
    json.api.topscorers.forEach(function(player) {
        $("#top-scorers").append(`
        
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