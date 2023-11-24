const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const serialize = require('cookie').serialize;

exports.index_get = asyncHandler(async (req, res, next) => {
    const posts = await Blog.find({ published: true }, '-comment').exec();
    res.json(posts);
})

exports.admin_index_get = asyncHandler(async (req, res, next) => {
    const posts = await Blog.find({}, '-comment').exec();
    res.json(posts);
})

exports.blog_get = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.blogId).exec();
    res.json(blog);
})

exports.blog_post = [
    body('title').trim().notEmpty().withMessage('Blog Post needs a title').isLength({ max: 100 }).withMessage(`Title can't exceed 100 characters`),
    body('blogBody').trim().notEmpty().withMessage('Blog Post needs a body').isLength({ max: 5000 }).withMessage(`Body can't exceed 5000 characters`),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const newBlog = new Blog({
            title: req.body.title,
            blogBody: req.body.blogBody,
            date: new Date(),
            published: req.body.published
        })
        await newBlog.save();
        res.status(200).json({ message: "Blog created", newBlog })
    })
]

exports.blog_put = [
    body('title').trim().notEmpty().withMessage('Blog Post needs a title').isLength({ max: 110 }).withMessage(`Title can't exceed 110 characters`),
    body('comment').trim().notEmpty().withMessage('Blog Post needs a body').isLength({ max: 5000 }).withMessage(`Body can't exceed 5000 characters`),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, {
            title: req.body.title,
            comment: req.body.comment,
            published: req.body.published
        });
        res.json({ message: "Blog updated", updatedBlog });
    })
]

exports.blog_delete = asyncHandler(async (req, res, next) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId).exec();
    res.json({ messsage: 'Blog deleted', deletedBlog });
})

exports.comment_post = [
    body('username').trim().optional().isLength({ max: 15 }).withMessage(`Username can't exceed 15 characters`),
    body('comment').trim().notEmpty().withMessage('Comment required').isLength({ max: 1000 }).withMessage(`Comment can't exceed 1000 characters`),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }
        const newComment = new Comment({
            username: req.body.username,
            comment: req.body.comment,
            blog: req.params.blogId,
            date: new Date()
        })
        await newComment.save();
        res.json({ message: "Message created", newComment });
    })
]

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id).exec();
    res.json({ messsage: 'Comment deleted', deletedComment });
})

exports.login_post = asyncHandler(async (req, res, next) => {
    if (req.body.username !== process.env.ADMIN_USERNAME || req.body.password !== process.env.ADMIN_PASSWORD) {
        res.status(403).json({ message: "Username/password combo is not correct" });
    }
    const user = {
        id: "him",
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    }
    jwt.sign({ user }, process.env.SEKRET_KEY, { expiresIn: 60 * 60 }, (err, token) => {
        if (err) {
            return next(err);
        }
        const serialized = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/'
        });
        res.setHeader('Set-Cookie', serialized).send();
    })
})

exports.logout_get = asyncHandler(async (req, res, next) => {
    const jwt = req.cookies.token;
    if (!jwt) {
        return res.status(403).json({
            status: 'error',
            error: 'Unauthorized',
        })
    }
    const serialized = serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({
        status: 'success',
        message: 'Logged out',
    });
})

exports.verify_token = function (req, res, next) {
    const bearerToken = req.cookies.token;
    if (bearerToken) {
        jwt.verify(bearerToken, process.env.SEKRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ status: 'error', message: err });
            }
            if (req.url === '/verify-user') {
                return res.status(200).json({ status: 'success', message: 'User verified' });
            }
            next();
        })
    } else {
        res.status(403).json({ status: 'error', message: 'User is not logged in' });
    }
}