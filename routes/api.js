var express = require('express');
var router = express.Router();
const api_controller = require('../controllers/apiController');

router.get('/', api_controller.index_get);

router.get('/blog/:blogId', api_controller.blog_get);

router.post('/blog', api_controller.verify_token, api_controller.blog_post);

router.put('/blog/:blogId', api_controller.verify_token, api_controller.blog_put);

router.delete('/blog/:blogId', api_controller.verify_token, api_controller.blog_delete);

router.post('/blog/:blogId/comment', api_controller.comment_post);

router.delete('/blog/:blogId/comment/:commentId', api_controller.verify_token, api_controller.comment_delete);

router.post('/login', api_controller.login_post);

router.get('/logout', api_controller.logout_get);

router.get('/verify-user', api_controller.verify_token);

module.exports = router;