class ExpressError extends Error {
    constructor(statuscode, messege){
        super();
        this.statuscode=statuscode;
        this.message=messege;
    }
}

module.exports = ExpressError;