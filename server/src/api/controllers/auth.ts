import type {Request, Response} from 'express';
const db = require('../../../models')
const bcrypt = require('bcrypt')


const register = async (req : Request, res : Response) : Promise<void> => {
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

}

const login = async ( req : Request, res : Response ) : Promise<void> => {
    const user = await db.user.findOne({
        where: {email: req.body.email}
    })
    console.log("logging in")
    if (!user){
        res.status(400).json({ message: "User does not exist"})
    } else {
        const match = await bcrypt.compare(req.body.password, user.password) 
        if (match) {
            res.status(200).json({ status: 200, message: "Success, user is logged in", user: req.body.email})
        } else {
            res.status(400).json({ message: "Email or password is incorrect"})
        }
        
    }
}

module.exports = {
    login, register
}