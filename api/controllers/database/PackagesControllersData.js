import { Package } from '../../models/Packages.js';
import { Destination } from '../../models/Destinations.js';
import * as fs from 'fs';
import { Activity } from '../../models/Activities.js';
// import * as data from '../../data/JSON_paquetes.json' assert {type: "json"};
import * as data from '../../data/JSON_paquetes.js';

export const getPackageData = async () =>{
    try {
<<<<<<< HEAD
        
        let dataJson = await Promise.all(
            fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/JSON_paquetes.json', "utf8", (error, data) =>{
                let dataPackage = JSON.parse(data)
                //console.log(dataPackage)
                dataPackage.map(async (paquete) => {
                    let newPaquete = await Package.findOrCreate({
                        
                       where:{
                        name: paquete.name, 
                        price: paquete.price, 
                        description: paquete.description, 
                        images: paquete.images,
                        on_sale: paquete.on_sale,
                        
                        seasson: paquete.seasson,
                        type: paquete.type,
                        start_date: paquete.start_date,
                        end_date: paquete.end_date,
                        featured: paquete.featured,
                        main_image: paquete.main_image,
                        available: paquete.available,  
                    },
                    })
                    for (let i=0; i< paquete.destinations.length; i++){
=======

        const infoDelJson = data.default;

        infoDelJson.map(async (paquete) => {
            let newPaquete = await Package.findOrCreate({
                where:{
                name: paquete.name, 
                price: paquete.price, 
                description: paquete.description, 
                images: paquete.images,
                on_sale: paquete.on_sale,
                region: paquete.region,
                seasson: paquete.seasson,
                type: paquete.type,
                start_date: paquete.start_date,
                end_date: paquete.end_date,
                featured: paquete.featured,
                main_image: paquete.main_image,
                available: paquete.available,  
                }
            })

            for (let i=0; i< paquete.destinations.length; i++){
>>>>>>> 329c3ab1c18ad3a724147eaf62ba03457efe7015
                        const destinationfind = await Destination.findOne({ where: { name: paquete.destinations[i]}})
                        await newPaquete[0].addDestinations(destinationfind)
                    }
            const actividadesfind = await Activity.findOne({where: {name: "Tour de Highlights" }})
            const actividadesfind2 = await Activity.findOne({where: {name: "Tour de Museos" }})
            await newPaquete[0].addActivities(actividadesfind)
            await newPaquete[0].addActivities(actividadesfind2)
        })
    }catch (error){
        console.log(error.message)
    }
};
