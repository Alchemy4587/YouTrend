const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')

//REGISTER A NEW USER
//POST : api/users/register
//UNPROTECTED
const registerUser = async (req,res,next) => {
    try {
        const {name, email, password, password2} = req.body
        if(!name || !email || !password) {
            return next(new HttpError("Please Fill all the Fields", 400))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email: newEmail})
        if(emailExists) {
            return next(new HttpError("Email Already Exists", 422))
        }

        if(password.trim().length < 6) {
            return next(new HttpError("Password must be at least 6 characters", 422))
        }

        if(password !== password2) {
            return next(new HttpError("Passwords do not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({name, email: newEmail, password: hashedPass})
        res.status(201).json(`New User  ${newUser.email} Registered Successfully `)
    } catch (error) {
        return  next(new HttpError("User Registration Failed", 422))
    }
}










//LOGIN A REGISTERED USER
//POST : api/users/login
//UNPROTECTED
const loginUser = async (req,res,next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return next(new HttpError("Please Fill all the Fields", 422))
        }
        const newEmail = email.toLowerCase()

        const user = await User.findOne({email: newEmail})
        if(!user) {
            return next(new HttpError("Invalid Credentials", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass) {
            return next(new HttpError("Invalid Credentials", 422))
        }

        const {_id: id, name} = user
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})
        res.json(`Welcome Back ${user.name}`)
    } catch (error) {
        return  next(new HttpError("User Login Failed. Please Check Your Credentials", 422))
    }
}











//USER PROFILE
//POST : api/users/:id
//PROTECTED
const getUser = async (req,res,next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");
        if(!user) {
            return next(new HttpError("User Not Found", 404))
        }
        res.status(200).json(user);
    } catch (error) {
        return  next(new HttpError(error))
        
    }
}










//CHANGE USER AVATAR (Profile Picture)
//POST : api/users/change-avatar
//PROTECTED
const changeAvatar = async (req,res,next) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Please Choose an Image. ", 422))
        }
         
        //find user from database
        const user = await User.findById(req.user.id)
        //delete old avatar if exist
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }


        const {avatar} = req.files;
        //Check Fie Size
        if(avatar.size > 500000) {
            return next(new HttpError("Profile Picture Too Big. Should Be Less Than 500kb "), 422)
        }

        let fileName;
        fileName = avatar.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename}, {new: true})
            if (!updatedAvatar) {
                return next(new HttpError("Avatar Couldn't be Changed. ", 422))
            }
            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}












//EDIT USER DETAILS (From Profile)
//POST : api/users/edit-user
//PROTECTED
const editUser = async (req,res,next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill In All Fields. ", 422))
        }

        //Get User From Database
        const user = await User.findById(req.user.id);
        if(!user) {
            return next(new HttpError("User Not Found. ",403))
        }

        //Make Sure New Email Doesn't Exist
        const emailExists = await User.findOne({email});
        //We want to update other details with/without changing the email (which is a unique id because we use it to login)
        if (emailExists && (emailExists._id != req.user.id)) {
            return next(new HttpError("Email Already Exists. ", 422))
        }
        // Compare Current Password to Db Password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid Current Password ", 422))
        }

        //Comapre New Passwords
        if(newPassword !== confirmNewPassword   ) {
            return next(new HttpError("New Passwords Do not Match. ",422))
        }

        //Hash New Password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt);

        //Update User Info in Db
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError(error))
    }
}




//GET AUTHORS
//POST : api/users/authors
//UNPROTECTED
const getAuthors = async (req,res,next) => {
    try {
        const authors = await User.find().select("-password");
        res.json(authors);
    } catch (error) {
        return  next(new HttpError(error))
    }
}


module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}