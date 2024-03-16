const mongoose= require("mongoose")

const courseProgressSchema= new mongoose.Schema({
    
    courseID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    completedVideos:[
        {
            type:  mongoose.Schema.Types.ObjectId,  // Array of video IDs that have been completed
            ref: "SubSection"
        }
    ]
})

module.exports= mongoose.model("CourseProgress", courseProgressSchema)