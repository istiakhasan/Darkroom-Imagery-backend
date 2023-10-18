import express from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { blogRouter } from '../modules/blog/blog.route';
import { bookedRouter } from '../modules/bookedService/bookedService.route';
import { bookingSlots } from '../modules/bookingslots/bookingSlots.routes';
import { categoryRouter } from '../modules/category/category.routes';
import { faqRouter } from '../modules/faq/faq.route';
import { feedbackRouter } from '../modules/feedback/feedback.route';
import { profileRouter } from '../modules/profile/profile.route';
import { reviewRoute } from '../modules/review/review.route';
import { servicesRouter } from '../modules/services/services.route';
import { userRouter } from '../modules/users/users.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/users',
    routes: userRouter,
  },
  {
    path: '/categories',
    routes: categoryRouter,
  },
  {
    path: '/service',
    routes: servicesRouter,
  },
  {
    path: '/service-slots',
    routes: bookingSlots,
  },
  {
    path: '/booked-service',
    routes: bookedRouter,
  },
  {
    path: '/faq',
    routes: faqRouter,
  },
  {
    path: '/blog',
    routes: blogRouter,
  },
  {
    path: '/profile',
    routes: profileRouter,
  },
  {
    path: '/review',
    routes: reviewRoute,
  },
  {
    path: '/feedback',
    routes: feedbackRouter,
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
