require('dotenv').config();
const Express = require('express');
const app = new Express();
const carsRouter = require('./routes/route.js');
const userRouter = require('./routes/userroute.js');
const mongoose = require('mongoose');
const cors = require('cors');
const httpStatus = require('./utils/statusvalues.js');

mongoose.connect(process.env.URL).then(() => {
    console.log('connected to database server');
});

app.use(cors());

app.use(Express.json());


app.use('/api/cars',carsRouter);
app.use('/api/users',userRouter);

app.all('*',(req,res) => {
    return res.status(404).json({status:httpStatus.ERROR,msg:'page not found'});
})

app.use((error,req,res,next) => {
    return res.status(error.code || 400).json({status:error.text || httpStatus.ERROR,msg:error.mess || error.message});
})



app.listen(process.env.PORT || 2000 ,() => {
    console.log('listening on port 2000');
});