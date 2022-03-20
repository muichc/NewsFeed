import type {Request, Response} from 'express';
const db = require('../../../models')

const all = async (req: Request, res: Response) : Promise<void> => {
    try {
        const categories = await db.category.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.status(200).json({status: 200, categories})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
    
}

const save = async (req: Request, res: Response) : Promise<void> => {
    try {
        const user = await db.user.findOne({
            where: { email: req.body.data.user},
            include: [db.category]
        })
        for (let item of req.body.data.categories) {
            const category = await db.category.findOne({
                where: { name:item.toLowerCase() },
                include: [db.user]
            })
            await user.addCategory(category)
            console.log(category, "associated")
        }
        res.status(200).json({status: 200, message: "Success, the categories have been saved"})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong with associating the categories"})
    }
    
    
}

const deleteCategories = async (req: Request, res: Response) : Promise<void> => {
    try {
        const user = await db.user.findOne({
            where: { email: req.body.data.user},
            include: [db.category]
        })
        for (let item of req.body.data.categories) {
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



export const category = {
    all,
    save,
    deleteCategories
}