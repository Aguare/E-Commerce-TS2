import { Router } from 'express';
import chatController from '../controllers/chat.controller';

const router = Router();

router.post('/getConversations', chatController.getConversations);
router.post('/getMessages', chatController.getMessages);
router.post('/sendMessage', chatController.sendMessage);
router.post('/createConversation', chatController.createConversation);

module.exports = router;
