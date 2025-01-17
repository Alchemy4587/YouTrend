const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')



// CREATE A POST
// POST: api/posts
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError('Fill in all fields and choose a thumbnail.', 422))
        }
        const {thumbnail} = req.files;
        //Check file size
        if (thumbnail.size > 2000000) {
            return next(new HttpError('Thumnail too big. Must be less than 2mb', 422))
        }
        let fileName = thumbnail.name;
        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError())
            } else {
                const newPost = await Post.create({title, category, description, thumbnail: newFileName, creator: req.user.id})
                if (!newPost) {
                    return next(new HttpError('Post Could not be created', 422))
                }
                //Find User and Increase Post Count By 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                    
                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError('Creating Post Failed', 500))
    }   
}


// GET ALL POST
// GET: api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// GET SINGLE POST
// GET: api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new HttpError('Post Not Found', 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError("Post Doesn't Exist", 404))
    }
}


// GET POSTS BY CATEGORY    
// GET: api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError("Category Not Found", 404))
    }
}


// GET AUTHOR POST
// GET: api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError("User Not Found", 404))
    }
}


// EDIT A POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFileName;
        let updatedPost;
        const postId = req.params.id;
        let {title, category, description} = req.body;
        //React quill has a paragraph opening and closing tag with a break tag in between so there are 11 character there already
        if(!title || !category || description.length < 12) {
            return next(new HttpError('Fill in all fields and description must be at least 12 characters', 422))
        }
        if(!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
        } else {
            //get old post from database before we can proceed with this
            const oldPost = await Post.findById(postId);
            //delete old thumbnail if it exist
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
            //Upload new thumbail
            const {thumbnail} = req.files;
            //check file size
            if (thumbnail.size > 2000000) {
                return next(new HttpError('Thumbnail too big. Must be less than 2mb', 422))
            }
            fileName = thumbnail.name;
            let splittedFileName = fileName.split('.')
            newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
            })
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFileName}, {new: true})
        }

        if(!updatedPost) {
            return next(new HttpError('Post Cannot Be Updated', 400))
        }

        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError('Post Could Not Be Updated', 400))
    }
}


// DELETE A POST
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if(!postId) {
            return next(new HttpError('Post Not Unavailable', 400))
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        // delete thumbnail from uploads folder
        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else{
                await Post.findByIdAndDelete(postId);
                //Find User and reduce post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
            }
        })

        res.json(`Post ${postId} deleted successfully. `)
    } catch (error) {
        return next(new HttpError(err))
    }
}




module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }