const express = require("express");
const router = express.Router();
const path = require('path');
const User = require("../models/User");
const passport = require ("passport");
const { model } = require("mongoose");
const flash = require("connect-flash");
const { truncate } = require("fs/promises");



// New code 

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin',passport.authenticate('local',{ 
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


router.get('/users/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({text: 'Por favor inserta tu nombre'});
    }
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coiciden'});
    }
    if (password.length < 4 ) {
        errors.push({text: ' La contraseña debe ser mayor a 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta registraado');
            res.redirect('/users/signup'); 
        }
       const newUser = new User ({name, email, password});
       newUser.password  = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('succes_msg', 'Estas regristrado');
      res.redirect('/users/signup');
    }
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/signin');
});

module.exports = router;