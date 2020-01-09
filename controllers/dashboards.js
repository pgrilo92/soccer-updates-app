const Dashboard = require('../models/dashboard')

const getAllDashboards = (req, res) => {
    Dashboard.find({}).then((dashboards) => {
        console.log(dashboards)
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
        console.log(dashboard)
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