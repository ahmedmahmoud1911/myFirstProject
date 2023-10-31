const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const controller = require('../controllers/controller.js');
const valid = require('../middlewares/middleware.js');








router.route('/')
    .get(controller.getAllCars)
    .post(valid.validate(),controller.addCar)

router.route('/:id')
    .get(controller.getSingleCar)
    .patch(valid.validate(),controller.updateCar)
    .delete(controller.deleteCar)



 

module.exports = router;