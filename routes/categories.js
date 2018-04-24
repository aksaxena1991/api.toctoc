var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
}).single('category_image');
exports.allCategories = function (req, res) {
    try {
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query("Select * from category", function (error, rows) {
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
                                "message": "Categories are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Categories are not found.",
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
exports.allCategoryByParentAndStoreId = function (req, res) {
    try {
        var params = req.query;
        var parent_category_id = params.parent_category_id;
        var store_id = params.store_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query('Select * from category where parent_category_id = ? && store_id = ? ', [parent_category_id, store_id], function (error, rows) {
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
                                "message": "Categories are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Categories are not found.",
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
exports.allCategoryByStoreId = function (req, res) {
    try {
        var params = req.query;

        var store_id = params.store_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                connection.query('Select * from category where  store_id = ? ', [store_id], function (error, rows) {
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
                                "message": "Categories are found.",
                                "data": data
                            });
                        }
                        else {
                            res.status(404).send({
                                "code": 404,
                                "message": "Categories are not found.",
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
exports.addCategory = function (req, res) {
    try {
        var requestParams = req;
        upload(req, res, function (err) {
            if (err) {
                res.status(405).send({
                    "code": 405,
                    "message": "Unable to upload image."
                });
            }
            else {
                req.getConnection(function (err, connection) {
                    if (err) {
                        console.log("SQL Connection: ", err);
                    }
                    else {
                        var query = "INSERT INTO category SET ?";
                        var values = {
                            "parent_category_id": requestParams.parent_category_id,
                            "category_name": requestParams.category_name,
                            "category_description": requestParams.category_description,
                            "category_image": requestParams.category_image,
                            "store_id": requestParams.store_id
                        };
                        console.log(requestParams);
                        connection.query(query, values, function (error, result) {
                            if (error) {
                                console.log("Error wile executing query ", error);
                            }
                            else {
                                res.status(200).send({
                                    "code": 200,
                                    "message": "A new category has been added."
                                });

                            }
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
exports.updateCategory = function (req, res) {
    try {
        var requestParams = req.body;

        var category_id = requestParams.category_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from category where category_id = ?', [category_id], function (conErr, data) {

                    var parent_category_id = requestParams.parent_category_id || data[0].parent_category_id;
                    var category_name = requestParams.category_name || data[0].category_name;
                    var category_description = requestParams.category_description || data[0].category_description;
                    var category_image = requestParams.category_image || data[0].category_image;
                    var store_id = requestParams.store_id || data[0].store_id;
                    connection.query('UPDATE category SET category_name = ?,' +
                        ' parent_category_id = ?, category_description = ?, category_image = ?' +
                        ' , store_id = ?  WHERE category_id = ?', [category_name, parent_category_id, category_description, category_image, store_id, category_id], function (error, result) {
                        if (error) {
                            console.log("Error wile executing query ", error);

                        } else {
                            res.status(200).send({
                                "code": 200,
                                "message": "A category has been updated."
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
exports.deleteCategory = function (req, res) {
    try {
        var requestParams = req.query;
        var category_id = requestParams.category_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from category where category_id = ?', [category_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A category has been deleted."
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