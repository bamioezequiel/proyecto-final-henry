import { Package } from '../../models/Packages.js';
import { Destination } from '../../models/Destinations.js';
import * as fs from 'fs';
import { Activity } from '../../models/Activities.js';
export const getPackageData = async () =>{
    try {
        
        let dataJson = await Promise.all(
            fs.readFile('/home/sadnena/pf/proyecto-final-henry/api/data/JSON_paquetes.json', "utf8", (error, data) =>{
                let dataPackage = JSON.parse(data)
                //console.log(dataPackage)
                dataPackage.map(async (paquete) => {
                    let newPaquete = await Package.findOrCreate({
                        
                       where:{name: paquete.name, price: paquete.price, 
                        description: paquete.description, 
                        images: paquete.images,
                        on_sale: paquete.on_sale,
                        region: paquete.region,
                        seasson: paquete.seasson,
                        type: paquete.type,
                    },
                       default: { 
                        main_image: paquete.main_image,
                        destinations: paquete.destinations,
                        featured: paquete.featured, start_date: paquete.start_date,
                        end_date: paquete.end_date,
                        available: paquete.available,
                        
                       }
                    })
                    // console.log("paquete")
                    // console.log(paquete.price)
                    const destinationfind = await Destination.findOne({ where: { name: paquete.destinations[0]}})
                    const actividadesfind = await Activity.findOne({where: {name: "Tour de Highlights" }})
                    const actividadesfind2 = await Activity.findOne({where: {name: "Tour de Museos" }})
                    await newPaquete[0].addDestinations(destinationfind)
                    await newPaquete[0].addActivities(actividadesfind)
                    await newPaquete[0].addActivities(actividadesfind2)
                })
                })).then((data)=>{
                    console.log(data)
                })
    }catch (error){
        console.log(error.message)
    }
};
