import { Classification } from '../../models/Classification.js';
import * as fs from 'fs';

export const getClassificationData = async () => {
    try {
       //CAMBIAR A PATH RELATIVO
// <<<<<<< HEAD
        let dataJson = fs.readFile('f:/Users/Admin/Desktop/Soy Henry/PF/proyecto-final-henry/api/data/classification.json', "utf8", (error, data) => {
// =======
//         let dataJson = fs.readFile('D:/FinalProject-Henry/proyecto-final-henry/api/data/classification.json', "utf8", (error, data) => {
// >>>>>>> origin/develop
        let dataClassification = JSON.parse(data)
        dataClassification.map((categoria) => {
            Classification.findOrCreate({
                where: {name: categoria.name, image: categoria.image }
                
            })
        })
        })
        //let dataClassificationResult = await Classification.findAll()
        
         
    }catch (error){
        console.log(error.message)
    }
}


