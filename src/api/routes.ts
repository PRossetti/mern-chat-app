import { Router } from 'express';
import messageRoutes from './message/routes';

const router = Router();

router.use('/messages', messageRoutes);

export default router;
