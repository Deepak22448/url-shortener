const mongoose = require("mongoose")
const shortId = require('shortid');



const urlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
    },
    shortUrl:{
        type:String,
        default:shortId.generate
    },
    click:{
        type:Number,
        default:0
    }
}) 

const Url = mongoose.model("URL",urlSchema)

module.exports = Url

