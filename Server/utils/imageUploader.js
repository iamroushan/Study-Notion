const cloudinary = require('cloudinary').v2;
require('dotenv').config()

exports.uploadImageToCloudinary = async(file,folder,height,quality)=>{
    console.log('inside the upload');
    const options = {folder}
    if(height){
        options.height = height
    }
    if(quality){
        options.quality = quality
    }
    options.resource_type = "auto"


    console.log("reached here",file?.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}