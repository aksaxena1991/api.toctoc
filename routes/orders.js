exports.allOrders = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from orders", function (error, rows) {
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
                                "message": "Orders are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Orders are not found.",
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
exports.addOrder = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO orders SET ?";
                var values = {
                    "fname": params.fname,
                    "lname": params.lname,
                    "contact": params.contact,
                    "email": params.email,
                    "address": params.address,
                    "city": params.city,
                    "pincode": params.pincode,
                    "delivery_date": params.delivery_date,
                    "delivery_time": params.delivery_time,
                    "note_for_store": params.note_for_store,
                    "subtotal": params.subtotal,
                    "delivery_mode": params.delivery_mode,
                    "delivery_fee": params.delivery_fee,
                    "grand_total": params.grand_total,
                    "store_id": params.store_id,
                    "order_status": params.order_status
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new order has been added."
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
exports.updateOrder = function (req, res) {
    try {
        var params = req.body;

        var order_id = params.order_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from orders where order_id = ?', [order_id], function (conErr, data) {
                    if (data.length > 0) {

                        var fname = params.fname || data[0].fname;
                        var lname = params.lname || data[0].lname;
                        var contact = params.contact || data[0].contact;
                        var email = params.email || data[0].email;
                        var city = params.city || data[0].city;
                        var pincode = params.pincode || data[0].pincode;
                        var delivery_date = params.delivery_date || data[0].delivery_date;
                        var delivery_time = params.delivery_time || data[0].delivery_time;
                        var note_for_store = params.note_for_store || data[0].note_for_store;
                        var address = params.address || data[0].address;
                        var subtotal = params.subtotal || data[0].subtotal;
                        var delivery_mode = params.delivery_mode || data[0].delivery_mode;
                        var delivery_fee = params.delivery_fee || data[0].delivery_fee;
                        var grand_total = params.grand_total || data[0].grand_total;
                        var store_id = params.store_id || data[0].store_id;
                        var order_status = params.store_id || data[0].order_status;

                        connection.query('UPDATE orders SET fname = ?,' +
                            ' lname = ?, contact = ?, email = ?, city =? ' +
                            ', pincode =? , delivery_date = ?, delivery_time = ?, note_for_store = ?, address = ?' +
                            ', subtotal = ?, delivery_mode = ?, delivery_fee = ?, grand_total = ?, store_id = ?, order_status= ?  '+
                            ' WHERE order_id = ?', [fname, lname, contact, email, city, pincode,
                            delivery_date, delivery_time, note_for_store, address, subtotal, delivery_mode, delivery_fee,
                            grand_total, store_id, order_status,order_id], function (error, result) {
                            if (error) {
                                console.log("Error wile executing query ", error);

                            } else {
                                res.status(200).send({
                                    "code": 200,
                                    "message": "A store detail has been updated."
                                });

                            }
                        });
                    } else {
                        res.status(404).send({
                            "code": 404,
                            "message": "A store detail not found."
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
exports.deleteOrder = function (req, res) {
    try {
        var params = req.body;

        var order_id = params.order_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from orders where order_id = ?', [order_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A order has been deleted."
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