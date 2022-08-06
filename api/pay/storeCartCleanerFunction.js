export const storeCartCleaner = (storeCart) => {
    const cartCleaner = storeCart.map(pack => {
        const quantity = pack.cantidad;
        const packageId = pack.paquete.id;
        const packageName = pack.paquete.name;
        const packagePriceCents = pack.paquete.price * 100;
        const packageOnsalePercent = pack.paquete.on_sale;
        const activities = pack.actividades.map(act => {
            const activityId = act.Package_Activity.activityId;
            const activityName = act.name;
            const activityPriceCents = act.price * 100;
            return { 
                activityId, 
                activityName, 
                activityPriceCents, 
            };
        });
        const totalPerUnitCents = packagePriceCents + activities.reduce((sum, act) => sum + act.activityPriceCents, 0)
        return { 
            quantity, 
            packageId, 
            packageName, 
            packagePriceCents, 
            activities, 
            totalPerUnitCents,
            packageOnsalePercent,
        };
    });
    return cartCleaner;
};