var jwt = require('jsonwebtoken');
exports.login = function (req, res) {
    try {
        var requestParams = req.body;
        var reg_username = requestParams.reg_username;
        var reg_password = requestParams.reg_password;
        req.getConnection(function(err, connection){
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else  {
                connection.query("select * from registration where reg_username = ? and reg_password = ?",[reg_username,reg_password], function(error, result){
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else  {
                        jwt.sign({'authenticatedUser':result},'secretkey',function(err,token){
                            res.json({
                                token:token
                            });
                        });
                    }
                });
            }
        });
    }
    catch (ex) {
        console.log("we caught an exception ", ex);
    }

}
exports.verify = function (req,res) {
    try {
        var requestParams = req.query;
        // console.log(req);
        var token = requestParams.token;
        jwt.verify(token,'secretkey',function(err, authData){
            if(err)
            {
                console.log("Token verify error: ",err);
            }
            else {
                res.status(200).send({
                    "code":200,
                    "message":'User verified successfully',
                    "data":authData
                });
            }
        })

    }
    catch (ex) {
        console.log("we caught an exception ", ex);
    }
}