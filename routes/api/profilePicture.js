const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const User = require('../../models/User');
const ProfilePic = require('../../models/ProfilePic');

// Get all pictures
router.get('/', async (req, res) => {
    try{
        const picData = await ProfilePic.findAll({
            include: [{model: User}]
        });
        const allPictures = picData.map((picture)=> picture.get({plain: true}));
        res.status(200).json(allPictures);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Add picture
router.post('/', tokenAuth, async (req, res) => {
    try {
        const newPic = await ProfilePic.create(req.body);
        console.log(req.user)
        newPic.user_id = req.user.id;
        newPic.save();
        res.status(200).json(newPic);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})