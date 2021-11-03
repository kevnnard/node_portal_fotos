const { Router } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const fs = require('fs-extra');
const router = Router();
const { isAuthenticated } = require("../helpers/auth");



// Models
const Image = require('../models/Image');
const { link } = require('fs');
const { url } = require('inspector');
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

router.get('/', isAuthenticated, async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

router.get('/fox', isAuthenticated, async (req, res) => {
    const images = await Image.find();
    const image = new Image();
    image.cat = req.body.cat;
    res.render('index-fox', { images });
});
router.get('/replays', isAuthenticated, async (req, res) => {
    const images = await Image.find();
    const image = new Image();
    image.cat = req.body.cat;
    res.render('replays', { images });
});

router.get('/upload', isAuthenticated, (req, res) => {
    res.render('upload');
});
router.get('/about',  (req, res) => {
    res.render('about');
});

router.post('/upload', isAuthenticated , async (req, res) => {
    const image = new Image();
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    image.sku = req.body.sku;
    image.cat = req.body.cat;
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.imageUrl = result.url;
    image.public_id = result.public_id;
    await image.save();
    res.redirect('/');
});

router.get('/image/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/:id/delete',isAuthenticated,  async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

router.get('/buscar', isAuthenticated, async (req, res) => {
        if(req.query.search) {
            const images = await Image.find({
                sku: req.query.search,
            });
            console.log('el sku es :', {images})
            res.render('buscar', { images })
        }

    
});

module.exports = router;