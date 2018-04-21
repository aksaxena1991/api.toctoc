exports.allProducts = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from product", function (error, rows) {
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
                                "message": "products are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "products are not found.",
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
exports.allProductsByCategoryId = function (req, res) {
    try {
        var params = req.query;
        var category_id = params.category_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query('Select * from product where category_id = ? ',[category_id], function (error, rows) {
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
                                "message": "Products are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Products are not found.",
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
exports.addProduct = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO product SET ?";
                var values = {
                    "product_name" : params.product_name,
                    "product_price" : params.product_price,
                    "category_id" : params.category_id,
                    "product_image" : params.product_image
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new product has been added."
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
exports.updateProduct = function (req, res) {
    try {
        var params = req.body;

        var product_id = requestParams.product_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from category where product_id = ?', [product_id], function (conErr, data) {

                    var category_id = params.category_id || data[0].category_id;
                    var product_name = params.product_name || data[0].product_name;
                    var product_price = params.product_price|| data[0].product_price;
                    var product_image = params.product_image || data[0].product_image;

                    connection.query('UPDATE product SET product_name = ?,' +
                        ' category_id = ?, product_price = ?, product_image = ?' +
                        ' WHERE product_id = ?', [product_name, category_id, product_price, product_image, product_id], function (error, result) {
                        if (error) {
                            console.log("Error wile executing query ", error);

                        } else {
                            res.status(200).send({
                                "code": 200,
                                "message": "A product has been updated."
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
exports.deleteProduct = function (req, res) {
    try {
        var params = req.body;

        var product_id = params.product_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from product where product_id = ?', [product_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A product has been deleted."
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