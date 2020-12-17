const express = require('express');
const router = express.Router();
const { getAll, getOne, create, remove, update } = require('./../controllers/propertyControllers');
const { validateProperty } = require('../validations')
const { isLoggedIn, isAdmin } = require('../middlewares/index');
const multer = require('multer');
const { storage } = require('../../cloudinary');
const upload = multer({ storage });

router.get('/', getAll);

router.get('/:id', getOne);

router.post('/', isLoggedIn, isAdmin, upload.array('image'), validateProperty, create);

router.put('/:id', isLoggedIn, isAdmin, upload.array('image'), validateProperty, update);

router.delete('/:id', isLoggedIn, isAdmin, remove);

module.exports = router;