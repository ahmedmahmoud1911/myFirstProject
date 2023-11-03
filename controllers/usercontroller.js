const User = require('../models/usermodel.js');
const helper = require('../utils/statusvalues.js');
const asyncWrapper = require('../middlewares/asyncwrapper.js');
const appError = require('../utils/apperror.js');
const bcrypt = require('bcryptjs');


const getAllUsers = asyncWrapper( async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({},{"__v" : false}).limit(limit).skip(skip);
    return res.status(200).json({status:helper.SUCCESS,data:{users}});
});


const createNewUser = asyncWrapper( async (req,res,next) => {
    const {firstName,lastName,email,password} = req.body;
    const user = await User.findOne({email:email});
    if (user) {
      const error = appError.create(400,helper.FAIL,'this email is exsists');
      return next(error);
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password : hashedPassword
    });
    await newUser.save();
    res.status(201).json({status:helper.SUCCESS,msg:'created successfully'});
  })



const loginUser = asyncWrapper( async (req,res,next) => {
    const {email,c} = req.body;
    if(!email || !password) {
      const error = appError.create(400,helper.FAIL,'enter your email and pass');
      return next(error);
    }
    const user = await User.findOne({email:email});
    if (!user) {
      const error = appError.create(400,helper.FAIL,'not valid email');
      return next(error);
    }
    const copmaredPassword = await bcrypt.compare(password,user.password);
    if (copmaredPassword) {
      return res.status(200).json({status:helper.SUCCESS,msg:'you are loged in'});
    }else {
      const error = appError.create(400,helper.FAIL,'wrong password');
      return next(error);
    }
  })


module.exports = {
    getAllUsers,
    createNewUser,
    loginUser
}
