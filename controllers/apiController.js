const Comment = require('../models/Comment');
const Post = require('../models/Post');

const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");

exports.index_get = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().exec();
    res.json(posts);
})

exports.blog_get = asyncHandler(async (req, res, next) => {
    const blog = await Post.findById(req.params.id).exec();
    res.json(blog);
})

exports.blog_post = asyncHandler(async (req, res, next) => {
    
})

exports.blog_edit = asyncHandler(async (req, res, next) => {
    
})

exports.blog_delete = asyncHandler(async (req, res, next) => {
    
})

exports.comment_post = asyncHandler(async (req, res, next) => {
    
})

exports.comment_delete = asyncHandler(async (req, res, next) => {
    
})

exports.login_post = asyncHandler(async (req, res, next) => {
    
})

exports.logout_get = asyncHandler(async (req, res, next) => {
    
})