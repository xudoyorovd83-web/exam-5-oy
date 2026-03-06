module.exports = class CustomErrorhandler extends Error{
    constructor(status,massage,errors=[]){
        super(massage)
        this.status=status
        this.errors=errors
    }

    static UnAuthorizet(massage,errors=[]){
        return new CustomErrorhandler(401,massage,errors)
    }
    static NotFound(massage,errors=[]){
        return new CustomErrorhandler(404,massage,errors)
    }

    static BadRequest(massage,errors=[]){
        return new CustomErrorhandler(400,massage,errors)
    }

    static Forbidden(massage,errors=[]){
        return new CustomErrorhandler(403,massage,errors)
    }

    static NoContent(massage,errors=[]){
        return new CustomErrorhandler(204,massage,errors)
    }
    static InternalServerError(massage,errors=[]){
        return new CustomErrorhandler(500,massage,errors)
    }
}