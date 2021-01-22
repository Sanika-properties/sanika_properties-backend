const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  remove,
  update,
  search,
} = require("./../controllers/propertyControllers");
const { validateProperty } = require("../validations");
const {
  isLoggedIn,
  isAdmin,
  searchAndFilterProperty,
} = require("../middlewares/index");
const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({ storage });

router.get("/", searchAndFilterProperty, getAll);

router.get("/:id", getOne);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("image"),
  validateProperty,
  create
);

router.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  upload.array("image"),
  validateProperty,
  update
);

router.delete("/:id", isLoggedIn, isAdmin, remove);

module.exports = router;
