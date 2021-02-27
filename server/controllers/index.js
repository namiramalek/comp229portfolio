/* Student name : Namirabanu Malek,
student id : 301178112,
Subject :COMP229-web application development
Date : 27 feb 2021 */
var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let passport=require('passport');

//Create the UserModel instance
 let userModel=require('../models/user');
 let User =userModel.User; //alias
module.exports.displayHomePage= (req,res,nex)=>{
    res.render('index',{title: 'Home', displayName:req.user ? req.user.displayName:''});
}

module.exports.displayAboutPage= (req,res,nex)=>{
    res.render('about',{title: 'About', displayName:req.user ? req.user.displayName:''});
}

module.exports.displayProjectPage= (req,res,nex)=>{
    res.render('project',{title: 'Project', displayName:req.user ? req.user.displayName:''});
}

module.exports.displayServicePage= (req,res,nex)=>{
    res.render('service',{title: 'Service', displayName:req.user ? req.user.displayName:''});
}

module.exports.displayContactPage= (req,res,nex)=>{
    res.render('contact',{title: 'Contact Me', displayName:req.user ? req.user.displayName:''});
}

module.exports.displayLoginPage =(req,res,next)=>{
    //Check if the user already Logged In
    if(!req.user)
    {
        res.render('auth/login',
        {
            title:"Login",
            messages:req.flash('loginMessage'),
            displayName:req.user ? req.user.displayName:''
        })
    }
    else
    {
         return res.redirect('/');
    }
}

module.exports.processLoginPage=(req,res,next)=>{
    passport.authenticate('local',
    (err, user, info)=>{
        //server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=>{
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/business-contact-list');
        });
    })(req,res,next);
}

module.exports.displayRegisterPage =(req,res,next)=>{
    //check if user is not logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title:"Register",
            messages:req.flash('registerMessage'),
            displayName:req.user ? req.user.displayName:''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next)=>{
    //instantiate a user object
    let newUser=new User({
        username:req.body.username,
        //password:req.body.password,
        email:req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser,req.body.password,(err)=>
    {
        if(err)
        {
            console.log("Ërror: Inserting New User");
            if(err.name == "UserExistError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessages'),
                displayName:req.user ? req.user.displayName:''
            });
        }
        else 
        {
            //if no error exists, then registration is successful

            //redirect the user and authenticate them

            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/business-contact-list')
            });
        }
    });
}

module.exports.performLogout=(req,res,next)=>{
    req.logout();
    res.redirect('/');
}