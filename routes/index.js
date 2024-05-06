const router = require('express').Router();
const notes = require('./api.js'); 
router.use('/notes', notes);
module.exports = router;
