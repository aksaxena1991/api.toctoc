exports.allOrderDetails = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from order_details", function (error, rows) {
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
                                "message": "Order details are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Order details are not found.",
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
exports.addOrderDetails = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO order_details SET ?";
                var values = {
                    "order_id" : params.order_id,
                    "product_id" : params.product_id,
                    "product_price" : params.product_price,
                    "product_quantity" : params.product_quantity
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new order detail has been added."
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
exports.updateOrderDetails = function (req, res) {
    try {
        var params = req.body;

        var order_detail_id = params.order_detail_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from order_details where order_detail_id = ?', [order_detail_id], function (conErr, data) {

                    var order_id = params.order_id || data[0].order_id;
                    var product_id = params.product_id || data[0].product_id;
                    var product_price = params.product_price|| data[0].product_price;
                    var product_quantity = params.product_quantity || data[0].product_quantity;

                    connection.query('UPDATE order_details SET order_id = ?,' +
                        ' product_id = ?, product_price = ?, product_quantity = ? ' +
                        ' WHERE order_detail_id = ?', [order_id, product_id, product_price, product_quantity, order_detail_id], function (error, result) {
                        if (error) {
                            console.log("Error wile executing query ", error);

                        } else {
                            res.status(200).send({
                                "code": 200,
                                "message": "A order detail has been updated."
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
exports.deleteOrderDetails = function (req, res) {
    try {
        var params = req.body;

        var order_detail_id = params.order_detail_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from order_details where order_detail_id = ?', [order_detail_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A order detail has been deleted."
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