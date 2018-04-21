exports.allProfiles = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from profile", function (error, rows) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        if (rows.length > 0) {
                            var data = [];
                            for (var index in rows) {
                                var rowObj = rows[index];
                                data.push(rowObj);
                            }
                            res.status(200).send({
                                "code": 200,
                                "message": "Profiles are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Profiles are not found."
                            });
                        }

                    }
                });
            }
        });
    } catch (ex) {
        console.log("we caught an exception ", ex);
    }

}
exports.profileByRegId = function (req, res) {
    try {
        var params = req.query;
        var reg_id = params.reg_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query('Select * from profile where reg_id = ? ',[reg_id], function (error, rows) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                       if (rows.length > 0) {
                            var data = [];
                            for (var index in rows) {
                                var rowObj = rows[index];
                                data.push(rowObj);
                            }
                            res.status(200).send({
                                "code": 200,
                                "message": "Profile has been found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Profile not found."
                            });
                        }

                    }
                });
            }
        });
    } catch (ex) {
        console.log("we caught an exception ", ex);
    }

}
exports.addProfile = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO profile SET ?";
                var values = {
                    "firstname" : params.firstname,
                    "lastname" : params.lastname,
                    "gender" : params.gender,
                    "ownership" : params.ownership,
                    "address" : params.address,
                    "reg_id" : params.reg_id,
                    "profile_image" : params.profile_image,
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new profile has been added."
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
exports.updateProfile = function (req, res) {
    try {
        var params = req.body;

        var profile_id = params.profile_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from profile where profile_id = ?', [profile_id], function (conErr, data) {

                    var firstname = params.firstname || data[0].firstname;
                    var lastname = params.lastname || data[0].lastname;
                    var gender = params.gender|| data[0].gender;
                    var ownership = params.ownership || data[0].ownership;
                    var address = params.address || data[0].address;
                    var reg_id = params.reg_id || data[0].reg_id;
                    var profile_image = params.profile_image || data[0].profile_image;

                    connection.query('UPDATE profile SET firstname = ?,' +
                        ' lastname = ?, gender = ?, ownership = ?, address = ?, reg_id = ?, profile_image = ?' +
                        ' WHERE profile_id = ?', [firstname, lastname, gender, ownership, address, reg_id, profile_image, profile_id], function (error, result) {
                        if (error) {
                            console.log("Error wile executing query ", error);

                        } else {
                            res.status(200).send({
                                "code": 200,
                                "message": "A profile has been updated."
                            });

                        }
                    });
                });

            }
        });
    }
    catch (ex) {
        console.log("we caught an exception ", ex);
    }
}
exports.deleteProfile = function (req, res) {
    try {
        var params = req.body;

        var profile_id = params.profile_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from profile where profile_id = ?', [profile_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A profile has been deleted."
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