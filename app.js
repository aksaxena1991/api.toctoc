var express = require('express');
var path = require('path');
var connection = require('express-myconnection');
var mysql = require('mysql');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var roles = require('./routes/roles');
var auth = require('./routes/auth');
var categories = require('./routes/categories');
var products = require('./routes/products');
var coupons = require('./routes/coupons');
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'toctoc',
        port: 3306
    }, 'pool') //or single
);
// Authentication Start
app.get('/api/auth/verify', auth.verify);
app.get('/api/auth/login', auth.login);
// Authentication End
// Coupons Start
app.get('/api/coupons/allCoupons', coupons.allCoupons);
app.post('/api/coupons/addCoupon', coupons.addCoupon);
app.put('/api/coupons/updateCoupon', coupons.updateCoupon);
app.delete('/api/coupons/deleteCoupon', coupons.deleteCoupon);
// Coupons End
// Roles Start
app.get('/api/roles/allRoles', roles.allRoles);
app.post('/api/roles/addRole', roles.addRole);
app.put('/api/roles/updateRole', roles.updateRole);
app.delete('/api/roles/deleteRole', roles.deleteRole);
// Roles End
// Categories Start
app.get('/api/categories/allCategories', categories.allCategories);
app.get('/api/categories/allCategoriesByParentAndStoreId', categories.allCategoryByParentAndStoreId);
app.get('/api/categories/allCategoriesByStoreId', categories.allCategoryByStoreId);
app.post('/api/categories/addCategory', categories.addCategory);
app.put('/api/categories/updateCategory', categories.updateCategory);
app.delete('/api/categories/deleteCategory', categories.deleteCategory);
// Categories End
//Products Start
app.get('/api/products/allProducts', products.allProducts);
app.get('/api/products/allProductsByCategoryId', products.allProductsByCategoryId);
app.put('/api/products/updateProduct', products.updateProduct);
app.post('/api/products/addProduct', products.addProduct);
app.delete('/api/products/deleteProduct', products.deleteProduct);
// Products end
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
