const express = require('express');
const {
    getNotes, 
    createNote,
    getNoteById,
    updateNote,
    deleteNote
} = require('../controllers/noteController');
const { protect } = require('../middlewares/authMiddleware');
// const { route } = require('./userRoutes');

const router = express.Router();

router.route('/').get( protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(getNoteById).put(protect,updateNote).delete(protect,deleteNote);

module.exports = router;