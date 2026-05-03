const express = require('express');
const router = express.Router();

const { isLogged, isAdmin } = require('../middleware/auth');
const servicesRenderPaymentPoint = require('../services/RenderPaymentPoint');


router.get('/payment-point', isLogged, servicesRenderPaymentPoint.payment_point);
router.post('/payment-point', isLogged, servicesRenderPaymentPoint.payment_point);


router.get('/billing-point', isAdmin, servicesRenderPaymentPoint.billing_point);
router.post('/billing-point', isAdmin, servicesRenderPaymentPoint.billing_point);


module.exports = router;