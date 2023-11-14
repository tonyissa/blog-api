var express = require('express');
var router = express.Router();
const api_controller = require('../controllers/apiController');

/* GET users listing. */
router.get('/', api_controller.index_get);

router.get('/about', api_controller.about_get);

router.get('/blog/:id', api_controller.blog_get);

router.post('/blog', api_controller.blog_create);

router.put('/blog/:id', api_controller.blog_edit);

router.post('/blog/:id/comment', api_controller.comment_create);

router.delete('/blog/:id/comment', api_controller.comment_delete);

module.exports = router;
