let mainUrl2 = 'https://api-football-v1.p.rapidapi.com/v2/' 
let searchLeagueUrl2 = "leagues/league/"
let key3 = '7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465'
loadAllDashboards()
//run as soon as page is loaded
function loadAllDashboards() {
   // $('#index-dashboards').html('')
    $('#creating-dashboard').show()
    $('#editing-dashboard').hide()
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
                <button class="btn btn-warning" onclick="editData('${dashboard._id}')">Edit</button>
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
    $('#close-alert').remove()
    $(".notifications").append(`<div class="spinner-border" role="status" id="loading-sign">
                                        <span class="sr-only">Loading...</span>
                                    </div> 
                                `)
}
//remove loading message
function completed() {
  $('#loading-sign').remove()
    $(".notifications").append(`
    <div class="alert alert-success alert-dismissible fade show" id="close-alert" role="alert">
  <strong>Successful</strong> 
  <button onclick="closeNotification()" type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
`)
}
function closeNotification () {
    $('#close-alert').remove()
}
//edit function call from button in html
function editData() {
    //$('#editing-dashboard').show()
//}
    let dashboard = {
        league_id:  $('select.select-league').children("option:selected").val(),
        id: json._id,
        league:  $('#league-name').val(),
        logo: $('#league-logo').val(),
        country: $('#league-country').val()
    }
    //$('#editing-dashboard').on('submit', function () {
    $.ajax({
        url: '/api/dashboards/' + id,
        method: "PUT",
        dataType: 'json',
        data: dashboard,
        success: loadDashboard(json),
        error: onError,
       // complete: $('editing-dashboard').hide()
    })
}

//delete function call from button in html
function deleteData(id) {
    $.ajax({
        url: '/api/dashboards/' + id,
        method: "DELETE",
        success: loadAllDashboards,
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
    <form id="editing-dashboard">
    <div class="form-group">
        <label for="select-league">Select League</label>
        <select class="form-control select-league" name="selectLeague" id="selectLeague">
            <option value="524">Premier League</option>
            <option value="775">La Liga</option>
            <option value="891">Serie A</option>
            <option value="525">Ligue 1</option>
        </select>
    </div>
    <input type="hidden" id="league-name" name="league-name" value="">
    <input type="hidden" id="league-logo" name="league-logo" value="">
    <input type="hidden" id="league-country" name="league-country" value="">
    <input onclick="editData('${json._id}', ${json})" class="btn btn-primary" type="submit"  value="Update">
</form>
    `)
}
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}