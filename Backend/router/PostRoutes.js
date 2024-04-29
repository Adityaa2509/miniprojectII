const express = require('express');
const { createPost, getPosts, deletePost, updatePost, likePost, togglePostVisibility } = require('../controller/PostController');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

router.post('/create',isAuth,createPost)
router.get('/myposts',getPosts)
router.put('/updatepost/:postId/:userId', isAuth, updatePost)
router.delete('/deletepost/:postId/:userId',isAuth,deletePost)
router.post('/like/:postId',isAuth,likePost)
router.put('/toggle/:postId',isAuth,togglePostVisibility)

module.exports = router;