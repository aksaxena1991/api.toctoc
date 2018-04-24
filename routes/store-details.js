exports.addStoreDetail = function (req, res) {
    try {
        var params = req.body;
        req.getConnection(function (err, connection) {
            if (err) {
                console.log("SQL Connection: ", err);
            }
            else {
                var query = "INSERT INTO store_detail SET ?";
                var values = {
                    "vat_applicable": params.vat_applicable,
                    "store_id": params.store_id,
                    "service_tax_applicable": params.service_tax_applicable,
                    "min_order": params.min_order,
                    "opening_time": params.opening_time,
                    "upto_km": params.upto_km,
                    "upto_km_price": params.upto_km_price,
                    "tax_no": params.tax_no,
                    "sales_no": params.sales_no,
                    "store_description": params.store_description,
                    "is_popular": params.is_popular,
                    "delivery_mode": params.delivery_mode,
                    "vat_tax_percent": params.vat_tax_percent,
                    "service_tax_percent": params.service_tax_percent,
                    "vendor_share": params.vendor_share,
                    "no_of_vendor_share_free": params.no_of_vendor_share_free
                };
                connection.query(query, values, function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);
                    }
                    else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A new store detail has been added."
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
exports.updateStoreDetail = function (req, res) {
    try {
        var params = req.body;

        var store_detail_id = params.store_detail_id;

        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('select * from store_detail where store_detail_id= ?', [store_detail_id], function (conErr, data) {
                    if (data.length > 0) {

                        var vat_applicable = params.vat_applicable || data[0].vat_applicable;
                        var store_id = params.store_id || data[0].store_id;
                        var service_tax_applicable = params.service_tax_applicable || data[0].service_tax_applicable;
                        var min_order = params.min_order || data[0].min_order;
                        var upto_km = params.upto_km || data[0].upto_km;
                        var upto_km_price = params.upto_km_price || data[0].upto_km_price;
                        var tax_no = params.tax_no || data[0].tax_no;
                        var sales_no = params.sales_no || data[0].sales_no;
                        var store_description = params.store_description || data[0].store_description;
                        var opening_time = params.opening_time || data[0].opening_time;
                        var is_popular = params.is_popular || data[0].is_popular;
                        var delivery_mode = params.delivery_mode || data[0].delivery_mode;
                        var vat_tax_percent = params.vat_tax_percent || data[0].vat_tax_percent;
                        var service_tax_percent = params.service_tax_percent || data[0].service_tax_percent;
                        var vendor_share = params.vendor_share || data[0].vendor_share;
                        var no_of_vendor_share_free = params.vendor_share || data[0].no_of_vendor_share_free;

                        connection.query('UPDATE store_detail SET vat_applicable = ?,' +
                            ' store_id = ?, service_tax_applicable = ?, min_order = ?, upto_km =? ' +
                            ', upto_km_price =? , tax_no = ?, sales_no = ?, store_description = ?, opening_time = ?' +
                            ', is_popular = ?, delivery_mode = ?, vat_tax_percent = ?, service_tax_percent = ?, vendor_share = ?, no_of_vendor_share_free= ?  '+
                            ' WHERE store_detail_id = ?', [vat_applicable, store_id, service_tax_applicable, min_order, upto_km, upto_km_price,
                            tax_no, sales_no, store_description, opening_time, is_popular, delivery_mode, vat_tax_percent,
                            service_tax_percent, vendor_share, no_of_vendor_share_free,store_detail_id], function (error, result) {
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
exports.deleteStoreDetail = function (req, res) {
    try {
        var params = req.body;

        var store_detail_id = params.store_detail_id;
        req.getConnection(function (err, connection) {
            if (err) {
                console.error('SQL Connection error: ', err);

            } else {
                connection.query('DELETE from store where store_detail_id = ?', [store_detail_id], function (error, result) {
                    if (error) {
                        console.log("Error wile executing query ", error);

                    } else {
                        res.status(200).send({
                            "code": 200,
                            "message": "A store detail has been deleted."
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