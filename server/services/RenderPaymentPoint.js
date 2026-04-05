const axios = require('axios');

exports.payment_point = (req, res) => {
    res.render('payment_point', {
        user: req.session.user
    });
}

exports.billing_point = (req, res) => {
    res.render('Billing_point', {
        user: req.session.user
    });
}