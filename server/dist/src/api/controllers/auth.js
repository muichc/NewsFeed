"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../../../models');
const bcrypt = require('bcrypt');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [...created] = yield db.user.findOrCreate({
            where: { email: req.body.email },
            defaults: {
                password: bcrypt.hashSync(req.body.password, 12)
            }
        });
        if (created) {
            res.status(200).json({ status: 200, message: "User is successfully registered", user: req.body.email });
        }
        else {
            res.status(400).json({ message: 'This email was already registered or something else went wrong' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error, ${error}` });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.user.findOne({
            where: { email: req.body.email },
            include: [db.category]
        });
        console.log("logging in");
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        else {
            const match = yield bcrypt.compare(req.body.password, user.password);
            if (match) {
                res.status(200).json({ status: 200, message: "Success, user is logged in", user: req.body.email, categories: user.categories });
            }
            else {
                res.status(400).json({ message: "Email or password is incorrect" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.user.findOne({
            where: { email: req.body.email }
        });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        }
        else {
            const match = yield bcrypt.compare(req.body.password, user.password);
            if (match) {
                const [...updated] = yield db.user.update({ password: bcrypt.hashSync(req.body.newPassword, 12) }, { where: { email: user.email } });
                if (updated) {
                    res.status(200).json({ status: 200, message: "Success, user password changed", user: req.body.email });
                }
                else {
                    res.status(500).json({ status: 500, message: "Something went wrong server side", user: req.body.email });
                }
            }
            else {
                res.status(400).json({ message: "Password does not match", user: req.body.email });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
module.exports = {
    login, register, changePassword
};
//# sourceMappingURL=auth.js.map