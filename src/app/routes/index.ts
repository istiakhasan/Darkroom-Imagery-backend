import express from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { bookedRouter } from '../modules/bookedService/bookedService.route';
import { bookingSlots } from '../modules/bookingslots/bookingSlots.routes';
import { categoryRouter } from '../modules/category/category.routes';
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

];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
