var express = require('express');
var router = express.Router();
const api_controller = require('../controllers/apiController');

function verifyToken(req, res, next) {
    const bearerAuth = req.headers['authorization'];
    if (bearerAuth) {
        const bearerToken = bearerAuth.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

router.get('/', api_controller.index_get);

router.get('/blog/:blogId', api_controller.blog_get);

router.post('/blog', verifyToken, api_controller.blog_post);

router.put('/blog/:blogId', verifyToken, api_controller.blog_put);

router.delete('/blog/:blogId', verifyToken, api_controller.blog_delete);

router.post('/blog/:blogId/comment', api_controller.comment_post);

router.delete('/blog/:blogId/comment/:commentId', verifyToken, api_controller.comment_delete);

router.post('/login', api_controller.login_post);

router.get('/logout', api_controller.logout_get);

module.exports = router;
