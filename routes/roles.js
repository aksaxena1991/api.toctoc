exports.allRoles = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from roles", function (error, rows) {
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
                                "message": "Roles are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Roles are not found.",
                                "data": data
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
exports.addRole = function (req, res) {
    try {
        var requestParams = req.body;

        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO roles SET ?";
                var values = {
                    role_name: requestParams.role_name
                };
                connection.query(query, values, function (error, rows) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new role has been added."
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
exports.updateRole = function (req, res) {
    try {
        var requestParams = req.body;

        var role_id = requestParams.role_id;
        var role_name = requestParams.role_name;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('UPDATE roles SET role_name = ? WHERE role_id = ? order by timestamp', [role_name, role_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A role has been updated."
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
exports.deleteRole = function (req, res) {
    try {
        var requestParams = req.body;

        var role_id = requestParams.role_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from roles where role_id = ?', [role_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A role has been deleted."
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