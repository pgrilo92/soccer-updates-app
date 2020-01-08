const Dashboard = require('../models/dashboard')

const getAllDashboards = (req, res) => {
    Dashboard.find({}).then((dashboards) => {
        res.status(200).json(dashboards)
    })
   // res.render('index', {title: 'Dashboards'})
}

const getOneDashboard = (req, res) => {
    Dashboard.findById(req.params.id).then((dashboard) => {
        res.status(200).json(dashboard)
    })
    //res.render('index', {title: 'Dashboards'})
}

const createDashboard = (req, res) => {
    Dashboard.create(req.body).then((dashboard) => {
        res.status(201).json(dashboard)
    })
    //res.render('index', {title: 'Dashboards'})
}

const deleteDashboard = (req, res) => {
    Dashboard.findByIdAndDelete(req.params.id).then((dashboard) => {
        res.status(200).json(dashboard)
    })
    //res.render('index', {title: 'Dashboards'})
}

const updateDashboard = (req, res) => {
    Dashboard.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((dashboard) => {
        res.status(200).json(dashboard)
    })
    //res.render('index', {title: 'Dashboards'})
}

module.exports = {
    getAllDashboards,
    getOneDashboard,
    createDashboard,
    deleteDashboard,
    updateDashboard
}