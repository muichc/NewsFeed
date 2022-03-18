import type {Request, Response} from 'express';
const db = require('../../../models')

const all = async (req: Request, res: Response) : Promise<void> => {
    const categories = await db.category.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    res.status(200).json({status: 200, categories})
}

const save = async (req: Request, res: Response) : Promise<void> => {
    console.log("user info is", req.body.user)
    const user = await db.user.findOne({
        where: { email: req.body.user},
        include: [db.category]
    })
    console.log("request categories", req.body.categories)
    try {
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
        res.status(200).json({status: 200, message: "Success, the categories have been saved"})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong with associating the categories"})
    }
    
    
}

const deleteCategories = async (req: Request, res: Response) : Promise<void> => {
    const user = await db.user.findOne({
        where: { email: req.body.user},
        include: [db.category]
    })
    try {
        for (let item of req.body.categories) {
            const category = await db.category.findOne({
                where: {name: item},
                include: [db.user]
            })
            await user.removeCategory(category)
            console.log("the category ", item, " is successfully unassociated from user")
        }
        res.status(200).json({status: 200, message: 'Success, the categories have been unassociated from user'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong with deleting categories"})
    }
    
}

module.exports = {
    all,
    save,
    deleteCategories
}