"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/signup', FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = auth_validation_1.authValidation.signUpValidation.parse(JSON.parse(req.body.data));
    return auth_controller_1.signUpController.signUP(req, res, next);
});
router.post('/signin', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginValidation), auth_controller_1.signUpController.logIn);
router.get('/all-users', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.signUpController.getAllUsers);
router.delete('/all-users/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.signUpController.deleteUsers);
router.patch('/all-users/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = auth_validation_1.authValidation.userUpdateValidation.parse(JSON.parse(req.body.data));
    return auth_controller_1.signUpController.updateUser(req, res, next);
});
exports.AuthRouter = router;
