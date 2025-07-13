const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing"); // Iska bhi zarurat hai
const wrapAsync = require("../utils/wrapAsync.js"); // ✅ Yahi missing tha
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedin,isReviewAuthor} = require("../middleware.js");
reviewController = require("../controllers/reviews.js");





//reviews
//post review route

router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview ));

//delete review route

router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports =  router;
