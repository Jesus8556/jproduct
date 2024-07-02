const cloudinary = require("cloudinary");
require("dotenv").config();



cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
})



async function uploadImage(filePath){
    return await cloudinary.v2.uploader.upload(filePath,{
        folder: 'replit'

    })
}

async function deleteImage(publicId){
    return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = {
    uploadImage,
    deleteImage
}