"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), feedback_controller_1.feedbackController.careteFeedback);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.feedbackController.getAllFeedback);
exports.feedbackRouter = router;
