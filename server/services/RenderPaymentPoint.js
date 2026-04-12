const axios = require('axios');

const Cart = require('../model/cart');

exports.payment_point = async (req, res) => {

    const cart = await Cart.findOne({ usuario: req.session.user._id }).populate('items.producto');
    res.render('payment_point', {
        user: req.session.user,
        cart: cart || { items: [] }
    });

}

exports.billing_point = (req, res) => {
    res.render('Billing_point', {
        user: req.session.user
    });
}