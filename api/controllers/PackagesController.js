import { Package } from '../models/Packages.js';
import { Category } from '../models/Categories.js';

import * as fs from 'fs';

export const getPackages = async (req, res) => {
	try {
		const packages = await Package.findAll({
			include: {
				model: Category,
				attributes: ['name'],
			}
		});
		res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getFeaturedPackages = async (req, res) => {
	try {
		const packages = await Package.findAll({
			where: {
				featured: true,
			},
			include: {
				model: Category,
				attributes: ['name'],
			}
		});
		packages.length < 1
		? res.status(200).json({ message: 'There are no featured packages.' })
		: res.status(200).json(packages);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const createPackage = async (req, res) => {
	console.log(req.body);
	const { name, description, main_image, images, price, featured, available, on_sale, categoryId } = req.body;

	try {
		const newPackage = await Package.create({
			name, description, main_image, images, price, featured, available, on_sale, categoryId
		});
		res.json({message: 'Package created successfully'});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

export const getTypes = async (req, res) => {
	try {
		// const packageTypes = await Package.findAll()
		// const uniquePackageTypes = []
		// packageTypes?.forEach(p => {
		// 	!uniquePackageTypes.includes(p.types) && uniquePackageTypes.push(p)
		// });
		// res.status(200).send(uniquePackageTypes)

		const data = fs.readFileSync('D:/FinalProject-Henry/proyecto-final-henry/api/data/JSON_paquetes.json', 'utf8');
		const uniquePackageTypes = []
		JSON.parse(data)?.forEach(p => {
			!uniquePackageTypes.includes(p.type) && uniquePackageTypes.push(p.type)
		});
    
    res.status(200).json(uniquePackageTypes)

	} catch (error) {
		res.status(400).send({ data: error.message })
	}
}