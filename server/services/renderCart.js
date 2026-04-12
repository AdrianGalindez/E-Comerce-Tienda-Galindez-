exports.car = (req, res) => {
    const cart = req.session.cart || {
        items: [],
        total: 0
    };

    res.render('car', {
        productosCarrito: cart.items,
        subtotal: cart.total,
        user: req.session.user
    });
};