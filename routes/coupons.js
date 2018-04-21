exports.allCoupons = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from coupons", function (error, rows) {
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
                                "message": "Coupons are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Coupons are not found.",
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
exports.addCoupon = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO coupons SET ?";
                var values = {
                    "coupon_code" : params.coupon_code,
                    "coupon_type" : params.coupon_type,
                    "coupon_value" : params.coupon_value,
                    "coupon_valid_from" : params.coupon_valid_from,
                    "coupon_valid_to" : params.coupon_valid_to,
                    "coupon_usage" : params.coupon_usage
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new coupon has been added."
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
exports.updateCoupon = function (req, res) {
    try {
        var params = req.body;

        var coupon_id = params.coupon_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from coupons where coupon_id = ?', [coupon_id], function (conErr, data) {

                    var coupon_code = params.coupon_code || data[0].coupon_code;
                    var coupon_type = params.coupon_type || data[0].coupon_type;
                    var coupon_value = params.coupon_value|| data[0].coupon_value;
                    var coupon_valid_from = params.coupon_valid_from || data[0].coupon_valid_from;
                    var coupon_valid_to = params.coupon_valid_to || data[0].coupon_valid_to;
                    var coupon_usage = params.coupon_usage || data[0].coupon_usage;

                    connection.query('UPDATE coupons SET coupon_code = ?,' +
                        ' coupon_type = ?, coupon_value = ?, coupon_valid_from = ?, coupon_valid_to = ?, coupon_usage =? ' +
                        ' WHERE coupon_id = ?', [coupon_code, coupon_type, coupon_value, coupon_valid_from, coupon_valid_to, coupon_usage, coupon_id], function (error, result) {
                        if (error) {
                            console.log("Error wile executing query ", error);

                        } else {
                            res.status(200).send({
                                "code": 200,
                                "message": "A coupon has been updated."
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
exports.deleteCoupon = function (req, res) {
    try {
        var params = req.body;

        var coupon_id = params.coupon_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from coupons where coupon_id = ?', [coupon_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A coupon has been deleted."
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