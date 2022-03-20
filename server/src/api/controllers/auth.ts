import type {Request, Response} from 'express';
const db = require('../../../models')
const bcrypt = require('bcrypt')


const register = async (req : Request, res : Response) : Promise<void> => {
    try {
        const [...created] = await db.user.findOrCreate({
            where: {email: req.body.email},
            defaults: {
                password: bcrypt.hashSync(req.body.password, 12)
            }
            })
        if (created) {
        res.status(200).json({ status: 200, message: "User is successfully registered", user: req.body.email})
        } else {
        res.status(400).json({ message: 'This email was already registered or something else went wrong'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Server error, ${error}`})
    }
}

const login = async ( req : Request, res : Response ) : Promise<void> => {
    try {
        const user = await db.user.findOne({
            where: {email: req.body.email},
            include: [db.category]
        })
        console.log("logging in")
        if (!user){
            res.status(400).json({ message: "User does not exist"})
        } else {
            const match = await bcrypt.compare(req.body.password, user.password) 
            if (match) {
                res.status(200).json({ status: 200, message: "Success, user is logged in", user: req.body.email, categories: user.categories})
            } else {
                res.status(400).json({ message: "Email or password is incorrect"})
            }
            
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
    
}

const changePassword = async ( req : Request, res : Response ) : Promise<void> => {
    try {
        const user = await db.user.findOne({
            where: {email: req.body.email}
        })
        if (!user){
            res.status(400).json({ message: "User does not exist"})
        } else {
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match) {
                const [...updated] = await db.user.update({password: bcrypt.hashSync(req.body.newPassword, 12)}, {where:{email:user.email}})
                if (updated) {
                    res.status(200).json({ status: 200, message: "Success, user password changed", user: req.body.email})
                } else {
                    res.status(500) .json({ status: 500, message: "Something went wrong server side", user: req.body.email})
                }
            } else {
                res.status(400).json({message: "Password does not match", user: req.body.email})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
}

export const auth = {
    login, register, changePassword
}