import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async (loacalFilePath)=>{
    try {
        if(!loacalFilePath) return null
        //cloudinary file upload
        const response=await cloudinary.uploader.upload(loacalFilePath,{resource_type:"auto"})
        //file has uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(loacalFilePath)
        //remove the loacally saved file as the upload operation got failed
        return null;
    }

}



// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
export {uploadOnCloudinary}