$.ajax({
    async: true,
    crossDomain: true,
    url: "http://localhost:3000/api",
    method: "GET",
    dataType: 'json',
    success: function(json) {
        onSuccess(json)
    },
    error: onError,
    beforeSend: before(),
    complete: completed()
})

('#creating-dashboard').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        async: true,
        crossDomain: true,
        url: "http://localhost:3000/api",
        method: "POST",
        dataType: 'json',
        error: onError,
        beforeSend: before(),
        complete: completed()
    })
})
function onSuccess(json) {
    json.dashboards.forEach((dashboard) => {
        $("#index-dashboards").append(`
            <div class="col-4">
            <p>League: ${dashboard.league}</p>
            <p>Country: ${dashboard.country}</p>
            <img src="${dashboard.logo}">
            `)
    })
}

function onPostSuccess(dashboard) {

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