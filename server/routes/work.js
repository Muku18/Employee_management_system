
const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

router.get('/assignproject',workController.assignProject);
router.post('/assignproject',workController.createProject);

router.get('/editproject/:id', workController.editProject);
router.post('/editproject/:id', workController.updateProject);

router.get('/assignproject/:id',workController.deleteProject);





router.get('/assigndepartment',workController.assignDepartment);
router.post('/assigndepartment',workController.createDepartment);

router.post('/assigndepartment/sort', workController.sortDepartment);
router.post('/assigndepartment/search', workController.searchDepartment);

router.get('/editdepartment/:id', workController.editDepartment);
router.post('/editdepartment/:id', workController.updateDepartment);


router.get('/assigndesignation',workController.assignDesignation);
router.post('/assigndesignation',workController.createDesignation);

router.get('/editdesignation/:id', workController.editDesignation);
router.post('/editdesignation/:id', workController.updateDesignation);



router.get('/workproject',workController.workProject);
router.post('/workproject',workController.createworkProject);

router.get('/editworkproject/:id', workController.editworkProject);
router.post('/editworkproject/:id', workController.updateworkProject);








router.get('/manageattendance',workController.Attendance);
router.post('/manageattendance',workController.createAttendance);

router.get('/editmanageattendance/:id',workController.editAttendance);
router.post('/editmanageattendance/:id',workController.updateAttendance);

router.get('/assigndepartment/:id',workController.deleteDepartment);

router.get('/assigndesignation/:id',workController.deleteDesignation);

router.get('/workproject/:id/:id1',workController.deleteworkproject);

router.get('/manageattendance/:id',workController.deleteAttendance);


module.exports = router;