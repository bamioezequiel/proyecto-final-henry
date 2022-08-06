import express, { Router } from 'express';
import { PaymentCreate } from '../pay/payment.js';
import { PaymentResponse } from '../pay/webhook.js';
// import { patchStatusOrder, patchStatusCart } from '../controllers/OrdersController.js';

const router = Router();
router.post('/payment', PaymentCreate, express.raw({type: "application/json"}), PaymentResponse)
// router.post('/payment/webhook')
export default router;