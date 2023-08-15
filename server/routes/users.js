import express from 'express';
import { signin,signup} from '../controllers/user.js' // don't frorget to say posts.js

const router = express.Router();


router.post('/signin',signin);
router.post('/signup',signup);

export default router; 