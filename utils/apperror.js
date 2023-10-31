class AppError extends Error{
    constructor(){
        super()
    }

    create(statustext,statuscode,message) {
        this.text = statustext;
        this.code = statuscode;
        this.mess = message
        return this;
    }
}


module.exports = new AppError();