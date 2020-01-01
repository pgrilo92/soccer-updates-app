let mainUrl = "http://v2.api-football.com/"
let searchLeagueUrl = "leagues/search/"
let key = 'f83d6f7d08b762ea607cf55201b54cc8'

$('form').on('submit', function(e) {
    e.preventDefault()
    let userInput = $('#search').val()
    let userData = userInput.split(' ').join('_')

    $.ajax({
        method: "GET",
        //data: {signature: authHeader},
        url: mainUrl + searchLeagueUrl + userData,
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-RapidAPI-Key', key)
        },
        sucess: function(json) {
            $('').html('')
            onSuccess(json)
        },
        error: onError
    })
})

function onSuccess(json) {
    json.date.forEach(function(league) {
        $("#search-results").append(`
        <div>${league.name}</div>
        `)
    })
}

function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}