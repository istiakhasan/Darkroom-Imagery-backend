"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const FileUploadHelpers_1 = require("../../../helpers/FileUploadHelpers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const services_controller_1 = require("./services.controller");
const services_validation_1 = require("./services.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), FileUploadHelpers_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    if (!req.body.data) {
        throw new ApiError_1.default(400, "Data could not be empty");
    }
    req.body = services_validation_1.serviceValidation.serviceValidationSchema.parse(JSON.parse(req.body.data));
    return services_controller_1.serviceController.createService(req, res, next);
});
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.serviceController.getAllServices);
router.get('/users', services_controller_1.serviceController.getAllServicesForUsers);
router.get('/:id', services_controller_1.serviceController.getSingleService);
exports.servicesRouter = router;
