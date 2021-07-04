const express = require('express');
const {getNotes, createNote} = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');
// const { route } = require('./userRoutes');

const router = express.Router();

router.route('/').get( protect, getNotes);
router.route('/create').post(protect, createNote);

// router.route('/create').post();
// router.route('/:id')
    // .get()//get
    // .put()//update
    // .delete()//delete


module.exports = router;