"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controlelr_1 = require("./users.controlelr");
const router = express_1.default.Router();
router.get('/', users_controlelr_1.usersController.getAllUsers);
router.get('/:id', users_controlelr_1.usersController.getSingleUser);
router.patch('/:id', users_controlelr_1.usersController.updateSingleUsers);
router.delete('/:id', users_controlelr_1.usersController.deleteSingleUser);
exports.userRouter = router;
