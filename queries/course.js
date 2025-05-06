import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module-model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
    const courses = await Course.find({}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean();
    return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
    const course = await Course.findById(id)
    .populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module
    }).lean();

    return replaceMongoIdInObject(course)
}

export async function getCourseDetailsByInstructor(instructorId) {
    const courses = await Course.find({instructor: instructorId}).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );

    // node js updated thakle ai Object.groupby method ta use kora jabe
    // const groupedByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

    // jehetu node js er version 16.0.0 er niche, tai amra nijer ekta groupBy function likhesi

    function groupBy(array, keyGetter) {
        return array.reduce((result, item) => {
          const key = keyGetter(item);
          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(item);
          return result;
        }, {});
      }
      
      const groupeByCourses = groupBy(enrollments.flat(), ({ course }) => course.toString());

    //   const totalRevenue = courses.reduce( (acc, course)=>{
    //     return (acc + groupeByCourses[course._id]?.length || 0 * course.price)
    //   },0 )

    const totalRevenue = courses.reduce((acc, course) => {
        const enrolledCount = groupeByCourses[course._id.toString()]?.length || 0;
        return acc + enrolledCount * course.price;
      }, 0);
      

    console.log({ totalRevenue},"groupByCourses");

    const totalEnrollments = enrollments.reduce(function (acc, obj) {
        return acc + obj.length;
    }, 0)
    const testimonials = await Promise.all(
        courses.map(async (course) => {
          const testimonial = await getTestimonialsForCourse(course._id.toString());
          return testimonial;
        })
      );

      const totalTestimonials = testimonials.flat();
      const avgRating = (totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0)) / totalTestimonials.length;

    //console.log("testimonials", totalTestimonials, avgRating);

    return {
        "courses": courses.length,
        "enrollments": totalEnrollments,
        "reviews": totalTestimonials.length,
        "ratings": avgRating.toPrecision(2),
        "revenue": totalRevenue,
    }
}