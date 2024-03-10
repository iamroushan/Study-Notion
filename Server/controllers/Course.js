const Course= require("../models/Course")
const Category= require("../models/Category")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const Section = require("../models/Section")
const Subsection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const mongoose= require("mongoose")


// createCourse handler function
// exports.createCourse = async (req,res)=>{
//     try {
//         // fetch data 
//         const {courseName, courseDescription, whatYouWillLearn, price, tag, category,instructions} = req.body

//         // Get thumbnail image from request files
//         const thumbnail = req.files.thumbnailImage;
//         console.log('input data : '  , req.body);

//          // Convert the tag and instructions from stringified Array to Array
//         // const tag = JSON.parse(_tag)
//         // const instructions = JSON.parse(_instructions)

//         // console.log("tag", tag)
//         // console.log("instructions", instructions)

//         // validation -> Check if any of the required fields are missing
//         if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fileds are required"
//             })
//         }
//         // Check if the user is an instructor
//         const userId = req.user.id
//         const instructorDetails = await User.findById(userId,{
//             accountType: "Instructor"
//         })
//         console.log("instructor details: ",instructorDetails);
//         // TODO: verify that userId and instructorDetails._id are same or different?

//         if(!instructorDetails){
//             return res.status(404).json({
//                 success: false,
//                 message: "Instructor details not found"
//             })
//         }

//         // check given category is valid or not
//         // console.log('category id ' , Category);
//         // const categoryId = mongoose.Types.ObjectId(Category);
//         const categoryDetails  = await Category.findById(category)
//         if(!categoryDetails ){
//             return res.status(404).json({
//                 success: false,
//                 message: "Category details not found"
//             })
//         }

//         // Upload the Thumbnail to Cloudinary   
//         const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

//         // create an entry for new course
//         const newCourse = await Course.create({
//             courseName,
//             courseDescription,
//             instructor: instructorDetails._id,
//             whatYouWillLearn: whatYouWillLearn,
//             price,
//             tag,
//             category: categoryDetails._id,
//             thumbnail: thumbnailImage.secure_url,
//             status:  "Draft",
//             instructions
//         })

//         // add the new course to the user schema of instructor
//         await User.findByIdAndUpdate(
//             {
//                 _id: instructorDetails._id
//             },
//             {
//                 $push:{
//                     courses: newCourse._id,
//                 }
//             },
//             {new:true}
//         )
        
//         // update the category schema
//         // TODO: HW
//         await Category.findByIdAndUpdate(
// 			{ _id: category },
// 			{
// 				$push: {
// 					course: newCourse._id,
// 				},
// 			},
// 			{ new: true }
// 		);

//         // return response
//         return res.status(200).json({
//             success: true,
//             message: "Course created successfully",
//             data: newCourse
//         })
//     } 
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to create a course",
//             error: error.message
//         })
//     }
// }


exports.createCourse = async (req, res) => {
    try {
      // Get user ID from request object
      const userId = req.user.id
  
      // Get all required fields from request body
      let {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tag: _tag,
        category,
        status,
        instructions: _instructions,
      } = req.body
      // Get thumbnail image from request files
      const thumbnail = req.files.thumbnailImage
  
      // Convert the tag and instructions from stringified Array to Array
      const tag = JSON.parse(_tag)
      const instructions = JSON.parse(_instructions)
  
      console.log("tag", tag)
      console.log("instructions", instructions)
   
      // Check if any of the required fields are missing
      if (
        !courseName ||
        !courseDescription ||
        !whatYouWillLearn ||
        !price ||
        !tag.length ||
        !thumbnail ||
        !category ||
        !instructions.length
      ) {
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory",
        })
      }
      if (!status || status === undefined) {
        status = "Draft"
      }
      // Check if the user is an instructor
      const instructorDetails = await User.findById(userId, {
        accountType: "Instructor",
      })
  
      if (!instructorDetails) {
        return res.status(404).json({
          success: false,
          message: "Instructor Details Not Found",
        })
      }
  
      // Check if the tag given is valid
      const categoryDetails = await Category.findById(category)
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: "Category Details Not Found",
        })
      }
      // Upload the Thumbnail to Cloudinary
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      console.log(thumbnailImage)
      // Create a new course with the given details
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: instructorDetails._id,
        whatYouWillLearn: whatYouWillLearn,
        price,
        tag,
        category: categoryDetails._id,
        thumbnail: thumbnailImage.secure_url,
        status: status,
        instructions,
      })
  
      // Add the new course to the User Schema of the Instructor
      await User.findByIdAndUpdate(
        {
          _id: instructorDetails._id,
        },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true }
      )
      // Add the new course to the Categories
      const categoryDetails2 = await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true }
      )
      console.log("HEREEEEEEEE", categoryDetails2)
      // Return the new course and a success message
      res.status(200).json({
        success: true,
        data: newCourse,
        message: "Course Created Successfully",
      })
    } catch (error) {
      // Handle any errors that occur during the creation of the course
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to create course",
        error: error.message,
      })
    }
  }

// getAllCourses handler function
exports.showlAllCourse = async (req,res)=>{
    try {
        // TODO: change the below statement
        const allCourses = await Course.find({},
            {
                courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
            })
            .populate("instructor")
			.exec();
        return res.status(200).json({
            success: true,
            message: "Data for all course fetched successfully",
            data: allCourses 
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message
        })
    }
}

// getCourseDetails handler function
exports.getCourseDetails = async (req,res)=>{
    try {
        // get id
        const {courseId} = req.body
        const courseDetails = await Course.find({_id: courseId}).populate(
            {
                path:"instructor",
                populate: {
                    path: "additionalDetails"
                }
            }
        )
        .populate("category")
        //.populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec()

        // validation
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: `Course not found with id: ${courseId}`
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully!",
            data: courseDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can't fetched Course data",
            error: error.message
        })
    }
}