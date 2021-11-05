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
        errors.push('Por favor inserta tu nombre');
    }
    if (password != confirm_password) {
        errors.push('Las contraseñas no coiciden');
    }
    if (password.length < 4 ) {
        errors.push('La contraseña debe ser mayor a 4 caracteres');
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta registrado');
            res.redirect('/users/signup'); 
        } else {
            const newUser = new User ({name, email, password});
            newUser.password  = await newUser.encryptPassword(password);
           await newUser.save();
           req.flash('success_msg', 'Registro de usuario con exito');
           res.redirect('/users/signup');
        }
       
    }
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', `Cerraste Sesión`);
    res.redirect('/users/signin');
});

module.exports = router;