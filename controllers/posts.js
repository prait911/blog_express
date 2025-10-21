
const posts = require('../data');



const getPosts = (req, res) => {
    res.status(200).json(posts);
}

const createPost = (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }


const newPost = {};
newPost.title = title;
newPost.content = content;
newPost.author = author;
newPost.published = false;
newPost.createdAt = new Date().toISOString();
newPost.updatedAt = new Date().toISOString();
if(posts.length > 0) {
    newPost.id = posts[posts.length - 1].id +1; 
} else {
    newPost.id = 1;
} 
posts.push(newPost);
res.status(201).json(newPost);

}


const deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => postId === post.id);

  if (postIndex === -1) {
  return res.status(404).json({message: 'Post not found'})
  }
  const deletedPost = posts.splice(postIndex, 1)[0];
  
  res.status(200).json({ 
    message: 'Post deleted successfully', 
    post: deletedPost 
  });
}


const updatePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  const {title, content, author} = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({message: 'All fields (title, content, author) are required' });
  }

  posts[postIndex].title = title;
  posts[postIndex].content = content;
  posts[postIndex].author = author;
  posts[postIndex].updatedAt = new Date().toISOString();
  
  res.status(200).json({
    message: 'Post updated successfully',
    post: posts[postIndex]
  });
}


const publishPost = (req, res) => {
    const {published} = req.body;
    if(published === undefined) {
        res.status(400).json({ message: 'published is required' });
        return;
    }
    const id = parseInt(req.params.id);
    const post = posts.find( (post) => {
        return post.id === id;
    });
    if(!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    post.published = published;
    post.updatedAt = new Date().toISOString();
    res.status(200).json(post);
}


module.exports = {
    getPosts,
    createPost,
    updatePost,
    publishPost,
    deletePost
} 