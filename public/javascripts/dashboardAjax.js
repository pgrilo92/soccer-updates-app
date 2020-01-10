let mainUrl2 = 'https://api-football-v1.p.rapidapi.com/v2/' 
let searchLeagueUrl2 = "leagues/league/"
let key3 = '7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465'
loadAllDashboards()
//run as soon as page is loaded
function loadAllDashboards() {
    $('#index-dashboards').html('')
    $('#creating-dashboard').show()
    $.ajax({
        url: "api/dashboards",
        method: "GET",
        dataType: 'json',
        success: function(json) {
            loadAllOnSuccess(json)
        },
        error: onError,
        beforeSend: beforeSuccess,
        complete: completed
    })
}

//run once submit button is pressed
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

//load existing json
function loadAllOnSuccess(json) {
    json.forEach((dashboard) => {

        $("#index-dashboards").append(`
            <div class="card" style="width: 18rem;">
                    <img src="${dashboard.logo}" class="card-img-top" alt="league-photo">
                <div class="card-body">
                    <h5 class="card-title"><a onclick="getOne('${dashboard._id}')">${dashboard.league}</a></h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Country: ${dashboard.country}</li>
                </ul>
                <button class="btn btn-warning" onclick="editData('${dashboard._id}', ${dashboard})">Edit</button>
                <button class="btn btn-danger" onclick="deleteData('${dashboard._id}')">Delete</button>
            </div>
        `)
    })
}

// assign hidden values 
function onSuccessLeague(json) {
    
    $('#league-name').val(json.api.leagues[0].name)
    $('#league-logo').val(json.api.leagues[0].logo)
    $('#league-country').val(json.api.leagues[0].country)
}

//send thes values from func onSuccessLeague to .POST method
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
        success: function() {
            loadAllDashboards()
        },
        error: onError,
        beforeSend: beforeSuccess,
        complete: completed
    })
}
//optional loading message
function beforeSuccess() {
    $("#index-dashboards").append(`<div id="loading"> Loading</div> `)
}
//remove loading message
function completed() {
    $("#loading").remove()
}
//edit function call from button in html
function editData(id, body) {
    $.ajax({
        url: '/api/dashboards/' + id,
        method: "PUT",
        success: loadAllDashboards(),
        error: onError,
    })
}
//delete function call from button in html
function deleteData(id) {
    $.ajax({
        url: '/api/dashboards/' + id,
        method: "DELETE",
        success: 
            $(this).remove()
        ,
        error: onError,
    })
}

function getOne(id) {
    $('#creating-dashboard').hide()
    $.ajax({
        url: '/api/dashboards/' + id,
        method: "GET",
        dataType: 'json',
        success: function(json) {
            loadDashboard(json)
        },
        error: onError,
    })
}

function loadDashboard(json) {
    $('#index-dashboards').html('')
    $('#index-dashboards').append(`
    <div class="card" style="width: 18rem;">
        <img src="${json.logo}" class="card-img-top" alt="league-photo">
        <div class="card-body">
            <h5 class="card-title"><a>${json.league}</a></h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Country: ${json.country}</li>
        </ul>
        <button class="btn btn-warning" onclick="editData('${json._id}', ${json})">Edit</button>
        <button class="btn btn-danger" onclick="deleteData('${json._id}')">Delete</button>
    </div>
    `)
}
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}