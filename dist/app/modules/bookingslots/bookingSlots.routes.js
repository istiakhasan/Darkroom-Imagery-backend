"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSlots = void 0;
const express_1 = __importDefault(require("express"));
const bookingSlots_controller_1 = require("./bookingSlots.controller");
const router = express_1.default.Router();
router.post('/', bookingSlots_controller_1.bookingSlotsController.createServiceSlots);
exports.bookingSlots = router;
