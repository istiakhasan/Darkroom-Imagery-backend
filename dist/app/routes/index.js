"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_route_1 = require("../modules/blog/blog.route");
const bookedService_route_1 = require("../modules/bookedService/bookedService.route");
const bookingSlots_routes_1 = require("../modules/bookingslots/bookingSlots.routes");
const category_routes_1 = require("../modules/category/category.routes");
const faq_route_1 = require("../modules/faq/faq.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const profile_route_1 = require("../modules/profile/profile.route");
const review_route_1 = require("../modules/review/review.route");
const services_route_1 = require("../modules/services/services.route");
const users_routes_1 = require("../modules/users/users.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_routes_1.AuthRouter,
    },
    {
        path: '/users',
        routes: users_routes_1.userRouter,
    },
    {
        path: '/categories',
        routes: category_routes_1.categoryRouter,
    },
    {
        path: '/service',
        routes: services_route_1.servicesRouter,
    },
    {
        path: '/service-slots',
        routes: bookingSlots_routes_1.bookingSlots,
    },
    {
        path: '/booked-service',
        routes: bookedService_route_1.bookedRouter,
    },
    {
        path: '/faq',
        routes: faq_route_1.faqRouter,
    },
    {
        path: '/blog',
        routes: blog_route_1.blogRouter,
    },
    {
        path: '/profile',
        routes: profile_route_1.profileRouter,
    },
    {
        path: '/review',
        routes: review_route_1.reviewRoute,
    },
    {
        path: '/feedback',
        routes: feedback_route_1.feedbackRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
