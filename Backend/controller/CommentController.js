const Comment = require('../model/Comment');

const createComment = async (req, resp) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return resp.status(401).json({ msg: "You are not allowed to create a comment" });
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    resp.status(200).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    return resp.status(500).json({ msg: "Problem while creating comment" });
  }
}

const getPostComments=async(req,resp)=>{

     try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    resp.status(200).json(comments);
  } catch (error) {
    return resp.status(500).json({msg:"Problem while fetching post comments"})
}
}
const deleteComment = async(req,resp)=>{
      try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return resp.status(404).json({msg:"Comment Not Found"})
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return resp.status(403).json({msg:"You are not allowed to delete this comment"})
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    resp.status(200).json('Comment has been deleted');
  } catch (error) {
    return resp.status(500).json({msg:"Problem while deleting this Comment"})
  }
}

const updateComment = async(req,resp)=>{
          try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return resp.status(404).json({msg:"Comment Not Found"})
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return resp.status(401).json({msg:"You are not allowed to edit this comment"})
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    resp.status(200).json(editedComment);
  } catch (error) {
        return resp.status(500).json({msg:"Problem while editing comment"})
  }
}
const getcomments = async(req,resp)=>{
      if (!req.user.isAdmin)
    return resp.status(403).json({msg:"You are Admin"})
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    resp.status(200).
    json({ comments, totalComments, lastMonthComments });
  } catch (error) {
console.log(error)
    return resp.status(500).json({error})
  
}
}
const likeComment = async (req, res) => {
console.log('aa gaya like mein')
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({
        success:false,
        msg:"Comment not found"
      })
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success:false,
      msg:"Problem while liking comment"
    })
  }
};


module.exports = { createComment ,getPostComments,deleteComment,updateComment,getcomments,likeComment};
