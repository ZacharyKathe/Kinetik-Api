const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const { cloudinary } = require('../../utils/cloudinary')
const User = require("../../models/User");
const ProfilePic = require("../../models/ProfilePic");

// Get all pictures @ api/profile-pictures
router.get("/", async (req, res) => {
  try {
    const picData = await ProfilePic.findAll({
      include: [{ model: User }],
    });
    const allPictures = picData.map((picture) => picture.get({ plain: true }));
    res.status(200).json(allPictures);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Add picture
router.post("/", tokenAuth, async (req, res) => {
  try {
    // console.log(req.body);
    const fileStr = req.body.profilePic
    const uploadResponse = await cloudinary.uploader.
        upload(fileStr, { 
        upload_preset: 'kinetik-pics'
    })
    console.log(uploadResponse)
    res.json({msg: 'WOO UPLAODED'})
    // const newPic = await ProfilePic.create(req.body);
    // console.log(req.user);
    // newPic.user_id = req.user.id;
    // newPic.save();
    // res.status(200).json(newPic);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete this specific group
router.delete("/:id", tokenAuth, async (req, res) => {
  try {
    const picData = await ProfilePic.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(picData);
    if (!picData) {
      res.status(404).json({ message: "No picture with that id." });
      return;
    }

    res.status(200).json(picData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
