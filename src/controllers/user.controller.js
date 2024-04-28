import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
// collect user details from frontend (through postman)
const {fullname,username, email, password} = req.body
console.log("email: ", email);

// validation (empty username, correct email etc)
   if ([username, fullname, email, password].some((field) => {
    field?.trim( ) === "" 
   })) {
    throw new ApiError(400, "All fiels are required")
   }

// check if the user is already registered or not - Through username or email
const existedUser = User.findOne({
  $or:[{username},{email}]
})

if (existedUser) {
  throw new ApiError(409,"User Already Exists");
}

// check for imgs, check for avatar
const avatarLocalPath = req.files?.avatar[0]?.path
const coverImageLocalPath = req.files?.coverImage[0]?.path
 if (!avatarLocalPathLocalPath) {
  throw new ApiError(400, 'Avatar must be provided')
 }

// upload them to cloudinary
const avatar =  await cloudinaryUpload(avatarLocalPath)
const coverImage = await cloudinaryUpload(coverImageLocalPath)

// As avatar is required, so check if it uploaded successfully or not.
if(!avatar){
  throw new ApiError(400, 'Avatar must be provided')
}

// create user object - create entry db call
const user = User.create({
  fullname,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()
})

// remove password and refreshToken field from response as we can not show password to the user.


// check for user creation
const cretaedUser = await User.findById(user._id).select(["-password -refreshToken"]);

if(!cretaedUser){
  throw new ApiError(500, "something went wrong while registering the user")
}

// then send responsse.
return res.status(201).json(
  new ApiResponse(200, cretaedUser, "user registered successfully")
)

})

export {registerUser}