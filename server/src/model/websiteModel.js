const mongoose = require('mongoose');
const websiteModel= mongoose.model("Website",{
    site_name: String,
    title: String,
    meta_desc: String,
    meta_keywords: String,
    screen_shot: String,
    hyperlinks: [String],
    otherlinks: [String],
});
module.exports = websiteModel;