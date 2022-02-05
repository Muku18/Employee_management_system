const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);

router.get('/about', userController.about);



router.get('/adduser', userController.form);
router.post('/adduser', userController.create);

router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);

router.get('/viewuser/:id', userController.viewall);

router.get('/:id',userController.delete);

router.post('/sort', userController.sort);

//Department


  
module.exports = router;