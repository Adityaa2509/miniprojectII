const express = require('express');
const { createComment, getPostComments, deleteComment, updateComment, getcomments, likeComment } = require('../controller/CommentController');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

router.post('/create',isAuth,createComment)
router.get('/getPostComments/:postId', getPostComments);
router.delete('/deleteComment/:commentId',isAuth,deleteComment);
router.put('/editComment/:commentId',isAuth,updateComment);
router.get('/getcomments', isAuth, getcomments);
router.put('/likeComment/:commentId', isAuth, likeComment);
module.exports = router

