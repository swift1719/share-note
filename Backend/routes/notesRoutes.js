const express = require('express');
const {getNotes} = require('../controllers/noteController');
const { route } = require('./userRoutes');

const router = express.Router();

router.route('/').get(getNotes);

// router.route('/create').post();
// router.route('/:id')
    // .get()//get
    // .put()//update
    // .delete()//delete


module.exports = router;