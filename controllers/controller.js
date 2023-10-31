const {validationResult} = require('express-validator');

const Car = require('../models/model.js');

const httpStatus = require('../utils/statusvalues.js');

const asyncWrapper = require('../middlewares/asyncwrapper.js');

const appError = require('../utils/apperror.js');

const getAllCars = asyncWrapper( async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const data = await Car.find({price : {$gt : 100}},{"__v":false}).limit(limit).skip(skip);
    res.status(200).json({status : httpStatus.SUCCESS,data : data});
})

const getSingleCar = asyncWrapper( async (req,res,next) => {
    
    const car = await Car.findById(req.params.id);
    if (!car) {
        const error = appError.create(httpStatus.FAIL,404,'car not found')
        return next(error)
    }
    res.status(200).json({status : httpStatus.SUCCESS , data : car});
})

const addCar = asyncWrapper( async (req,res,next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {

        const error = appError.create(httpStatus.FAIL,400,err.array())
        return next(error)
    }
    const newcar = new Car(req.body);
    await newcar.save();
    res.status(201).json({status : httpStatus.SUCCESS , data : newcar});
})


const updateCar = asyncWrapper( async (req,res,next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        const error = appError.create(httpStatus.FAIL,400,err.array())
        return next(error)
    }
    const filter = {__id:req.params.id};
    const update = {... req.body};
    const updated = await Car.findOneAndUpdate(filter,update,{new:true});
    if (!updated){
        const error = appError.create(httpStatus.FAIL,400,'this id deleted before');
        return next(error);
    }
    res.status(201).json({status : httpStatus.SUCCESS , msg : 'updated'});
})  


const deleteCar = asyncWrapper(async (req,res,next) => {
    const resourse = await Car.findById(req.params.id);
    if (!resourse) {
        const error = appError.create(httpStatus.FAIL,400,'there is no car to delete');
        return next(error);
    }
    await Car.findByIdAndDelete(req.params.id);
    res.json({status : httpStatus.SUCCESS , data : null ,msg : 'deleted'});
})


module.exports = {
    getAllCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar
};