const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth")
const { User, Goal, Comment } = require('../../models')

//Get All Comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }]
    });
    const allcomments = commentData.map((comment) => comment.get({ plain: true }));
    res.status(200).json(allcomments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get One Comment
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id,
      {
        include: [{ model: User }, { model: Goal }]
      });

    const thisComment = commentData.get({ plain: true });

    res.status(200).json(thisComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new comment!
router.post('/', tokenAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Edit this specific comment
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const editComment = await Comment.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    await editComment.update(req.body)
    res.json(200).json(editComment);
  } catch (err) {
    console.log(err);
    res.json(400).json(err);
  }
});

// Delete this specific comment
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment with that id." });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;