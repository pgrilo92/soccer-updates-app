let mainUrl2 = 'https://api-football-v1.p.rapidapi.com/v2/' 
let searchLeagueUrl2 = "leagues/league/"
let key3 = '7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465'


$.ajax({
    url: "/api/dashboards",
    method: "GET",
    dataType: 'json',
    success: function(json) {
        onSuccess(json)
    },
    error: onError,
    beforeSend: before,
    complete: completed
})

$('#creating-dashboard').on('submit', function(e) {
    e.preventDefault()
// getting info from third party api
    let userData2 =  $('select.select-league').children("option:selected").val()
    $.ajax({
        async: true,
        crossDomain: true,
        url: mainUrl2 + searchLeagueUrl2 + userData2,
        method: "GET",
        headers: {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": key2
        },
        success: function(json) {
            //setting values for the req body
            onSuccessLeague(json)
        },
        error: onError,
        // calling the post method to post these values
        complete: postFunct
    })

})
function onSuccess(json) {
    json.forEach((dashboard) => {
        $("#index-dashboards").append(`
            <div class="col-4">
            <p>League: ${dashboard.league}</p>
            <p>Country: ${dashboard.country}</p>
            <img src="${dashboard.logo}">
            </div>
            `)
    })
}

function onSuccessLeague(json) {
    
    $('#league-name').val(json.api.leagues[0].name)
    $('#league-logo').val(json.api.leagues[0].logo)
    $('#league-country').val(json.api.leagues[0].country)
}
function postFunct() {
    let dashboard = {
        league:  $('#league-name').val(),
        league_id:  $('select.select-league').children("option:selected").val(),
        logo: $('#league-logo').val(),
        country: $('#league-country').val()
    }

    $.ajax({
        url: "/api/dashboards",
        method: "POST",
        dataType: 'json',
        data: dashboard,
        success: onPostSuccess(dashboard),
        error: onError,
        beforeSend: before,
        complete: completed
    })
}

function onPostSuccess(dashboard) {
    $("#index-dashboards").append(`
            <div class="col-4">
            <p>League: ${dashboard.league}</p>
            <p>Country: ${dashboard.country}</p>
            <img src="${dashboard.logo}">
            </div>
            `)
}
function before() {
    $("#index-dashboards").append(`<div id="loading"> Loading</div> `)
}

function completed() {
    $("#loading").remove()
}

function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}