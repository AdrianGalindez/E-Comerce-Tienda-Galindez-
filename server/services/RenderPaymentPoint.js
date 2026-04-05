const axios = require('axios');

const Cart = require('../model/cart');

exports.payment_point = async (req, res) => {

    const cart = await Cart.findOne({ user: req.session.user._id }).populate('items.product');

    res.render('payment_point', {
        user: req.session.user,
        cart: cart
    });

}

exports.billing_point = (req, res) => {
    res.render('Billing_point', {
        user: req.session.user
    });
}