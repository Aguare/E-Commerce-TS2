import { Router } from 'express';
import generalController from '../controllers/general.controller';

const router = Router();

router.post('/addFounds', generalController.addFounds);
router.post('/register', generalController.registerUser);
router.post('/login', generalController.loginUser);
router.post('/getUser', generalController.getUser);
router.get('/getCarouselPublication', generalController.getCarouselPublication);
router.post('/createPublication', generalController.createPublication);
router.post('/changeProfileImage', generalController.changeProfileImage);

module.exports = router;
