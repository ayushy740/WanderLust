const express = require("express");
const router = express.Router();
const Listing = require("../models/listing"); // Iska bhi zarurat hai
const wrapAsync = require("../utils/wrapAsync.js"); // ✅ Yahi missing tha

const { reviewSchema }= require("../schema.js");
const { isLoggedin,isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");


const upload = multer({ storage});
router.
 route("/")
 .get(wrapAsync(listingController.index))
 .post(isLoggedin,upload.single("listing[image]"),wrapAsync( listingController.createListing));


 //new route

router.get("/new",isLoggedin,listingController.renderNewForm);



router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

//new route

router.get("/new",isLoggedin,listingController.renderNewForm);



//edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;
