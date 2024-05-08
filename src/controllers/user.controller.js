import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

import {User} from "../models/user.model.js"  

import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async (req,res)=>{
   
//1.get user details from fronted
//2.validation-not empty
// 3.check if user already exits,emai,username
// 4.check for images, for avator
// 5.upload them to cloudinary
// 6.create user object -create entery in db
// 7.remove password and refresh token fieldfrom reponse
// 8.check for user creation
// 9.return response

const {fullName,email,username,password}=req.body
console.log("email",email);

// if (fullName=== "") {
//     throw new ApiError(400,"fullname is required")
// }

if (
    [fullName,email,username,password].some((field)=>field?.trim()==="")
) {
    throw new ApiError(400,"All fields are required")
}

const existedUser=User.findOne({
    $or:[{ username },{ email }]
})

if(existedUser) {
    throw new ApiError(409,"User with email or username already exists")
}

const avatarLocationPath=req.files?avator[0]?.path;

const coverImageLocationPath=req.files?coverImage[0]?.path;


if (!avatarLocationPath) {
    throw new ApiError(400,"Avator file is required")
    }
const avator=await uploadOnCloudinary(avatarLocationPath)


const coverImage=await uploadOnCloudinary(coverImageLocationPath)
    


if (!avator) {
    throw new ApiError(400,"Avator file is required")
    
}
const user = await User.create({
    fullName,
    avator:avator.url,
    coverImage:coverImage?.url|| "",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser= await User.findById(user._id).select("-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"Something went wront while registering the user ")
    }
return res.status(201).json(
    new ApiResponse(200,createdUser,"User register successfully")
)
})


export {registerUser}