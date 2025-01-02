
// CREATE A POST
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    res.json("Create Post")
}


// GET ALL POST
// GET: api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    res.json("Get all Post")
}


// GET SINGLE POST
// GET: api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    res.json("Get Single Post")
}


// GET POSTS BY CATEGORY    
// GET: api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    res.json("Get Post By Category")
}


// GET AUTHOR POST
// GET: api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    res.json("Get User Post")
}


// EDIT A POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    res.json("Edit Post")
}


// DELETE A POST
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    res.json("Delete Post")
}




module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }