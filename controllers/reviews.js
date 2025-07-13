const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview=async (req,res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    
    await newReview.save();
    await listing.save();
     req.flash("success" , "Review Created!");
    res.redirect(`/listings/${listing._id}`)

};

module.exports.destroyReview= async (req,res) =>{
let { id, reviewId}=req.params;

await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // listings array mein jo review hoga usko hata diya
await Review.findByIdAndDelete(reviewId) ; //reviews mein se review ko delete kr diya 
 req.flash("success" , "Review Deleted!"); 
res.redirect(`/listings/${id}`);
};