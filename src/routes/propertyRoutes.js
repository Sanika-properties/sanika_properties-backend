const express = require('express');
const router = express.Router();
const { getAll, getOne, create, remove, update, search } = require('./../controllers/propertyControllers');
const { validateProperty } = require('../validations')
<<<<<<< HEAD
const { isLoggedIn, isAdmin } = require('../middlewares/index');
=======
const { isLoggedIn, isAdmin, searchAndFilterProperty } = require('../middlewares/index');
>>>>>>> develop
const multer = require('multer');
const { storage } = require('../../cloudinary');
const upload = multer({ storage });


router.get('/', searchAndFilterProperty, getAll);

router.get('/:id', getOne);

router.post('/', isLoggedIn, isAdmin, upload.array('image'), validateProperty, create);
<<<<<<< HEAD

router.put('/:id', isLoggedIn, isAdmin, upload.array('image'), validateProperty, update);

router.delete('/:id', isLoggedIn, isAdmin, remove);
=======

router.put('/:id', isLoggedIn, isAdmin, upload.array('image'), validateProperty, update);

router.delete('/:id', isLoggedIn, isAdmin, remove);


>>>>>>> develop

module.exports = router;