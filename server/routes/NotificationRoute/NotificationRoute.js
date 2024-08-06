const express = require('express');
const { NotificationRequestController, NotificationPostsController, ExpiredRequestController , ExpiredPostController, deletePostNotificationController, deleteRequestNotificationController } = require('../../controllers/NotificationController/NotificationController');
const router = express.Router();



router.post("/requests", NotificationRequestController)

router.post('/posts', NotificationPostsController); 

router.post('/expiredRequests', ExpiredRequestController);

router.post('/expiredPosts', ExpiredPostController);

router.post('/deletePost', deletePostNotificationController);

router.post('/deleteRequest', deleteRequestNotificationController);


module.exports = router;