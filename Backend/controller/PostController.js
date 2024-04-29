const Post = require('../model/Post')

const deletePost = async(req,resp)=>{

 if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return resp.status(401).json({msg:"You are not allowed to delete this POST"})
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    resp.status(200).json({msg:'The post deleted Successfully'});
  } catch (error) {
    return resp.status(500).json({msg:"Problem in deleting POST"})
  }

}


const createPost = async(req,resp)=>{
console.log(req.body)
    if (!req.user.isAdmin) {
    return resp.status(401).json({
        msg:"You are not Admin and not allowed to Post"
    })
  }
  if (!req.body.title || !req.body.content) {
return resp.status(400).json({
    msg : "Please Provide all the fields"
})    
}
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    resp.status(201).json(savedPost);
  } catch (error) {
    return resp.status(500).json({msg:"Problem in Creating New Post"})
  }}


 const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    let publicPostFilter = {};
    if (req.user && !req.user.isAdmin) {
      publicPostFilter = { isPublic: true };
    
    }
    console.log(req.user)
    const queryOptions = {
      ...publicPostFilter,
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    const posts = await Post.find(queryOptions)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate('likes');

    const totalPosts = await Post.countDocuments(publicPostFilter);
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({
      ...publicPostFilter,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Problem in fetching posts" });
  }
};




const updatePost = async(req,resp)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return resp.status(401).json({msg:"You are not allowed to Update Post"});
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    resp.status(200).json(updatedPost);
  } catch (error) {
    return resp.status(500).json({msg:"Problem while updating Post"})
  }
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    // Remove null values from the likes array if present
    post.likes = post.likes.filter(userId => userId); // Remove null values

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like) =>{
        console.log(like+"<->"+userId)
        return like != userId});
      console.log(post.likes)
      console.log(post)
      console.log("disliking")
    } else {
      console.log(post)
      console.log("liking")
      post.likes.push(userId);
    }

    await post.save();
    
    res.json({ message: 'Post like updated successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};


const togglePostVisibility = async (req, resp) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return resp.status(404).json({ message: 'Post not found' ,success:false});
    }

    post.isPublic = !post.isPublic;
    await post.save();
    resp.status(200).json({ message: 'Post visibility toggled successfully', post,success:true });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ message: 'Internal server error',suceess:false });
  }
};



module.exports = {createPost,getPosts,deletePost,updatePost,likePost,togglePostVisibility}