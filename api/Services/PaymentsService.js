import axios from "axios";
import "dotenv/config";
const { ACCESS_TOKEN_MP } = process.env;
const direccion = process.env.URLHEROKU || "http://localhost:3000";

export class PaymentService {
  async createPayment(req) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: req.packages?.map((p) => ({
        title: p.name,
        description: req.id,
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "Paquetes turisticos",
        quantity: 1,
        unit_price: parseInt(p.total),
      })),
      back_urls: {
        failure: `${direccion}/checkout/cancel`,
        pending: `${direccion}/pending`,
        success: `${direccion}/checkout/confirmation`,
      },
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket",
          },
        ],
      },
    };
    // try {
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
      },
    });
    // console.log(payment);
    return payment.data;
    // } catch (error) {
    //     console.log(error)
    // }
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/checkout/preapproval";
    const body = {
      reason: "subscripcion de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },

      back_url: "https://google.com.ar",
      payer_email: "test_user_21258363@testuser.com", //MAIL DEL USUARIO COMPRADOR
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
      },
    });
    return subscription.data;
  }
}
