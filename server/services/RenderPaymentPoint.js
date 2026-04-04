const axios = require('axios');

exports.payment_point = (req, res) => {
    res.render('payment_point');
}


exports.billing_point = (req, res) => {
    res.render('Billing_point');
}