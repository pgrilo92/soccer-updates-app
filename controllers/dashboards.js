const Dashboard = require('../models/dashboard')
const axios = require('axios')
let key = process.env.FOOTBALL_API_KEY
// let headers = {
//     "content-type":"application/octet-stream",
//     "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
//     "x-rapidapi-key":key
//     }

//     function onSuccessLeague(json) {
    
//         $('#league-name').val(json.api.leagues[0].name)
//         $('#league-logo').val(json.api.leagues[0].logo)
//         $('#league-country').val(json.api.leagues[0].country)
//     }
//     function onError(xhr, status, errorThrown) {
//         alert("Sorry, there was a problem!");
//         console.log("Error: " + errorThrown);
//         console.log("Status: " + status);
//         console.dir(xhr);
//     }
// axios({
//     "method":"GET",
//     "url":"https://api-football-v1.p.rapidapi.com/v2/",
//     headers
//     })
//     .then((response)=>{
//       console.log(response)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })

const getAllDashboards = (req, res) => {
    Dashboard.find({}).then((dashboards) => {
        res.status(200).json(dashboards)
    })
}

const getOneDashboard = (req, res) => {
    Dashboard.findById(req.params.id).then((dashboard) => {
        res.status(200).json(dashboard)
    })
}

const createDashboard = (req, res) => {
    Dashboard.create(req.body).then((dashboard) => {
        res.status(201).json(dashboard)
    })
}

const deleteDashboard = (req, res) => {
    Dashboard.findByIdAndDelete(req.params.id).then((dashboard) => {
        res.status(200).json(dashboard)
    })
}

const updateDashboard = (req, res) => {
    Dashboard.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((dashboard) => {
        res.status(200).json(dashboard)
    })
}

module.exports = {
    getAllDashboards,
    getOneDashboard,
    createDashboard,
    deleteDashboard,
    updateDashboard
}