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
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db.category.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json({ status: 200, categories });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
const save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.user.findOne({
            where: { email: req.body.data.user },
            include: [db.category]
        });
        for (let item of req.body.data.categories) {
            const category = yield db.category.findOne({
                where: { name: item.toLowerCase() },
                include: [db.user]
            });
            yield user.addCategory(category);
            console.log(category, "associated");
        }
        res.status(200).json({ status: 200, message: "Success, the categories have been saved" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with associating the categories" });
    }
});
const deleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db.user.findOne({
            where: { email: req.body.data.user },
            include: [db.category]
        });
        for (let item of req.body.data.categories) {
            const category = yield db.category.findOne({
                where: { name: item },
                include: [db.user]
            });
            yield user.removeCategory(category);
            console.log("the category ", item, " is successfully unassociated from user");
        }
        res.status(200).json({ status: 200, message: 'Success, the categories have been unassociated from user' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with deleting categories" });
    }
});
module.exports = {
    all,
    save,
    deleteCategories
};
//# sourceMappingURL=category.js.map