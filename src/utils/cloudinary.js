import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLODINARY_API_KEY, 
  api_secret: process.env.CLODINARY_API_SECRET 
});

const cloudinaryUpload = async(localPath) => {
try {
  if(!localPath) return null

  //upload the file on cloudinary
  const result = await cloudinary.uploader.upload(localPath, {
    resource_type: "auto"
  });

  console.log('file is uploaded on cloudinary',result.url);

  //fs.unlinkSync(localPath) //delete the local file after uploading to clodinary

  return result;

} catch (error) {
  fs.unlinkSync(localPath)// remove the locally saved temporary file as the upload operation got failed
  return null
  }
}

export {cloudinaryUpload}