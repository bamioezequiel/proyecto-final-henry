import Stripe from "stripe";
import { storeCartCleaner } from "./storeCartCleanerFunction.js";
import { getUserInfoByToken, findOneUserFromDataBase } from "../controllers/FavouritesController.js";
const { SIGNING_SECRET } = process.env;
//const stripeKey = 
const stripe = Stripe(/* 'sk_test_51LSoUXFrlpRCY5YH7F7s7KDDAOsF4LAeXJyAJrHjUUSObyUbcDECpGu7N2Afj6N9P1aa7hdc1Ca85x4fSDUJebER00IklWuRZ3' */SIGNING_SECRET)


export const PaymentCreate = async (req, res) => {
    const storeCart = JSON.parse(JSON.stringify(req.body.body));
    // const authUser = String(req.body.headers.authorization);
    try {
        const userInfo = await getUserInfoByToken(req.body);
        const user = await findOneUserFromDataBase(userInfo.email);
        console.log(userInfo.email, user, '\n'/* , cart */);
        const cart = user?.orders.find(order => order.status === 'shopping cart');
        const cartId = cart?.id;
        //FUNCION PARA FORMATEAR EL CARRITO ENVIADO POR REQ DARIA UN RESULTADO COMO EL REPRESENTADO EN ITEMSCART    
        // const itemsCart = [
        //     {
        //         "quantity": "7",
        //         "packageId": 4,
        //         "packageName": "Joyas de Rusia Imperial en tren 8 días de San Petersburgo a Moscú",
        //         "packagePriceCents": 101000,
        //         "activities": [
        //             {
        //                 "activityId": 1,
        //                 "activityName": "Tour de Museos",
        //                 "activityPriceCents": 15000
        //             },
        //             {
        //                 "activityId": 2,
        //                 "activityName": "Tour de Highlights",
        //                 "activityPriceCents": 10000
        //             }
        //         ],
        //         "totalPerUnitCents": 126000,
        //         "packageOnsalePercent": 0
        //     }
        // ]
        //console.log(req.body.body.items)

        const itemsCart = storeCartCleaner(storeCart);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: itemsCart.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.packageName,
                        },
                        unit_amount: item.totalPerUnitCents,
                    },
                    quantity: item.quantity,
                };
            }),
            // discounts: itemsCart.map(item => item.packageOnsalePercent),  // solo se acepta un cupón o codigo de descuento :(
            client_reference_id: cartId,
            success_url: 'http://localhost:3000' , // dejar en variable de entorno .env
            cancel_url: 'http://localhost:3000/checkout',
        });
        // console.log(session);
        res.json({url: session.url});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    };
};