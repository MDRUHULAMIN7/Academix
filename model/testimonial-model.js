import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
    content: {
        required: true,
        type: String,
    },
    user: {
       type: Schema.Types.ObjectId,ref:"User"
    },
    courseId: { type: Schema.ObjectId,ref:"Course" },
    rating: {
        required: true,
        type: Number,
    },
});

export const Testimonial =
    mongoose.models.Testimonial ??
    mongoose.model("Testimonial", testimonialSchema);