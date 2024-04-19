import { Router } from 'express';
import publicationController from '../controllers/publications.controller';

const router = Router();

router.post('/getListPublications', publicationController.getListPublications);
router.post('/deletePublication', publicationController.deletePublication);
router.post('/getPublication', publicationController.getPublication);
router.post('/getListPublicationsAdmin', publicationController.getListPublicationsAdmin);
router.post('/buy_list', publicationController.buy_list);
router.post('/deleteBuy', publicationController.deleteBuy);
router.post('/volunteering_list', publicationController.volunteering_list);
router.post('/deleteVolunteering', publicationController.deleteVolunteering);
router.post('/updateStatusPublication', publicationController.updateStatusPublication);
router.post('/verifyAvailableVolunteering', publicationController.getCoupAvailableVolunteering);
router.post('/register_buy', publicationController.register_buy);
router.post('/register_volunteering', publicationController.register_volunteering);

module.exports = router;
