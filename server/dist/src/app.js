"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./api/routes");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/news', routes_1.routes.news);
app.use('/auth', routes_1.routes.auth);
app.use('/category', routes_1.routes.category);
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=app.js.map