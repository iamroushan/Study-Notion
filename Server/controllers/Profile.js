const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")
require('dotenv').config();

// updating a profile
exports.updateProfile = async (req,res)=>{
    try {
        // get data
        const {dateOfBirth="", about="", contactNumber="", gender="", firstName, lastName} = req.body

        // get userId
        const id = req.user.id;

        // validation
        if(!contactNumber || !gender){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        
        // find profile
        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        // update profile
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        profileDetails.gender = gender
        await profileDetails.save();
        const temp = await User.findById(id).populate('additionalDetails').exec();
        // let copyobject = Object.assign({} , profileDetails);
        // copyobject.firstName = firstName;
        // copyobject.lastName = lastName;

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            temp
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while trying to update your profile",
            error: error.message
        })
    }
}

// delete the account
exports.deleteAccount = async (req,res)=>{
    try {
        // get id
        const id = req.user.id

        console.log("here");
        // validation
        const userDetails = await User.findById(id) 
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // profile delete
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails})
        // TODO: unenroll user from all enrolled courses

        // user delete
        await User.findByIdAndDelete({_id: id})
        
        // return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be deleted successfully",
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req,res)=>{
    try {
        // get id
        const id = req.user.id

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec()

        // return response
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User details cannot be fetched successfully",
            error: error.message
        })
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try{
        console.log("the input request is : " , req.body);
        console.log("the input request is : " , req.files);
        console.log("the input request is : " , req.files.displayPicture);
        const Picture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
        	Picture,
        	process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log('image is', image);
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            {image:image.secure_url},
            { new: true });

        res.status(200).json({
                success: true,
                message: `Image updated successfully`,
                data: updatedProfile,
        });
    }
    catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}
}

exports.getEnrolledCourses = async(req,res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
          _id: userId,
        })
          .populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          })
          .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
    }
}