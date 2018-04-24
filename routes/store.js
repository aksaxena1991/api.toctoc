exports.allStores = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from store", function (error, rows) {
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
                                "message": "Stores are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Stores are not found.",
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
exports.addStore = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO store SET ?";
                var values = {
                    "store_name": params.store_name,
                    "store_address": params.store_address,
                    "store_contact": params.store_contact,
                    "store_owner": params.store_owner,
                    "profile_id": params.profile_id,
                    "store_image": params.store_image,
                    "store_city": params.store_city,
                    "store_state": params.store_state,
                    "store_street": params.store_street,
                    "store_pincode": params.store_pincode
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new store has been added."
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
exports.updateStore = function (req, res) {
    try {
        var params = req.body;

        var store_id = params.store_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from store where store_id= ?', [store_id], function (conErr, data) {
                    if (data.length > 0) {

                        var store_name = params.store_name || data[0].store_name;
                        var store_address = params.store_address || data[0].store_address;
                        var store_contact = params.store_contact || data[0].store_contact;
                        var store_owner = params.store_owner || data[0].store_owner;
                        var store_image = params.store_image || data[0].store_image;
                        var store_city = params.store_city || data[0].store_city;
                        var store_state = params.store_state || data[0].store_state;
                        var store_street = params.store_street || data[0].store_street;
                        var store_pincode = params.store_pincode || data[0].store_pincode;

                        connection.query('UPDATE store SET store_name = ?,' +
                            ' store_address = ?, store_contact = ?, store_owner = ?, store_image =? ' +
                            ', store_city =? , store_state = ?, store_street = ?, store_pincode = ?' +
                            ' WHERE store_id = ?', [store_name, store_address, store_contact, store_owner, store_image, store_city, store_state, store_street, store_pincode, store_id], function (error, result) {
                            if (error) {
                                console.log("Error wile executing query ", error);

                            } else {
                                res.status(200).send({
                                    "code": 200,
                                    "message": "A store has been updated."
                                });

                            }
                        });
                    } else {
                        res.status(404).send({
                            "code": 404,
                            "message": "A store not found."
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
exports.deleteStore = function (req, res) {
    try {
        var params = req.body;

        var store_id = params.store_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from store where store_id = ?', [store_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A store has been deleted."
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