import { Package } from '../models/Packages.js';
import { Destination } from '../models/Destinations.js';
import { Activity } from '../models/Activities.js';
import { User } from '../models/Users.js';
import sequelize, { Op } from 'sequelize';


export const getPackages = async (req, res) => {
    const { limitRender } = req.params;
    const { page, priceSort, durationSort, type, region, destination, dateMin, dateMax, available } = req.query;
    const { priceFilterMin, priceFilterMax, durationFilterMin, durationFilterMax } = req.body;

    try {
        const limitRend = parseInt(limitRender) || 12,
            pag = parseInt(page) || 1,
            priceS = priceSort?.toLowerCase(),
            durationS = durationSort?.toLowerCase(),
            durationFilterExist = (durationFilterMin && durationFilterMax) ? true : false;
        
		const packages = await Package.findAll({
            include: [
                {
                    model: Destination,
                    attributes: ['name', "region"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: Activity,
                    attributes: ['name', "price"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: User,
                    attributes: ['id'],
                    through: {
                        attributes: ['rating']
                    }
                }
            ],
            where: {
				available: available === 'true' ? 
                    true : 
                        available === 'false' ? 
                        false : {
                            [Op.or]: [{
								[Op.is]: true,
							}, {
								[Op.is]: false,
							}],
                        },
                type: type ? type : {
                    [Op.not]: null,
                },
                price: (priceFilterMin && priceFilterMax) ? {
                    [Op.and]: {
                        [Op.gte]: priceFilterMin,
                        [Op.lte]: priceFilterMax,
                    },
                } : {
                    [Op.not]: null,
                },
                start_date: (dateMin && dateMax) ? {
                    [Op.and]: {
                        [Op.gte]: dateMin,
                        [Op.lte]: dateMax,
                    }
                } : {
                    [Op.not]: null,
                },
			},
			[priceSort && 'order']: [
				priceS === 'asc' ? 
                ['price', 'ASC'] : 
                    priceS === 'desc' ? 
                    ['price', 'DESC'] : 
                        null,
			],
            offset: limitRend * (pag - 1),
			limit: limitRend,
		});

        let packagesResult = packages.filter(p => {
            let durationF = durationFilterExist ? 
                ((durationFilterMin <= p.duration) && (p.duration <= durationFilterMax)) :
                true;
            return durationF && p.destinations.some(d => {
                let regionF = region ? (d.region === region) : true;
                let destinationF = destination ? (d.name === destination) : true;
                return regionF && destinationF;
            });
        });
        packagesResult = ((durationS === 'asc') || (durationS === 'desc')) ? 
            packagesResult.sort((p1, p2) => {
                let order = durationS === 'asc' ? 
                    p1.duration - p2.duration : 
                    p2.duration - p1.duration;
                return !priceS ?
                    order :
                        (p1.price === p2.price) ?
                        order :
                        true;
                }) : 
                packagesResult;
        const copyPackagesResult = JSON.parse(JSON.stringify(packagesResult))
        copyPackagesResult.forEach(e => {
            let pRating = 0;
            e.users.length &&  e.users.forEach(u => {
                pRating += u.ratingAndFavourite.rating
            })
            pRating? e.rating = Math.ceil(pRating / e.users.length) : e.rating = pRating
            delete e.users
        })
		res.status(200).json(copyPackagesResult);
	} catch (error) {
		return res.status(404).json({ message: error.message });
	};
};