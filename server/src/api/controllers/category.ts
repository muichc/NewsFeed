import type {Request, Response} from 'express';
const db = require('../../../models')

const all = async (req: Request, res: Response) : Promise<void> => {
    const categories = await db.category.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    console.log(categories)
    res.status(200).json({status: 200, categories})
}

const save = async (req: Request, res: Response) : Promise<void> => {
    const user = await db.user.findOne({
        where: { email: req.body.user},
        include: [db.category]
    })
    console.log(req.body.categories)
    for (let item of req.body.categories) {
        const category = await db.category.findOne({
            where: { name:item.toLowerCase() },
            include: [db.user]
        })
        console.log("the category is", category, "name should be", item)
        const relationInfo = await user.addCategory(category)
        console.log("category associated")
        console.log(relationInfo)
    }
}

module.exports = {
    all,
    save
}