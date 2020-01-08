var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../controllers/dashboards');

/* GET /api/dashboards */
router.get('/dashboards', dashboardsCtrl.getAllDashboards);
router.get('/dashboards/:id', dashboardsCtrl.getOneDashboard);
router.post('/dashboards', dashboardsCtrl.createDashboard);
router.delete('/dashboards/:id', dashboardsCtrl.deleteDashboard);
router.put('/dashboards/:id', dashboardsCtrl.updateDashboard);

module.exports = router;