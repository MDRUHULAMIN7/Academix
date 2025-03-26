import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import CourseDetails from "./_components/CourseDetails";

import { getCourseDetails } from "@/queries/course";
import { replaceMongoIdInArray } from "@/lib/convertData";

const SingleCoursePage = async ({params: {id}}) => {
    const course = await getCourseDetails(id);

    return (
        <>
            <CourseDetailsIntro
                title={course?.title}
                subtitle={course?.subtitle}
                thumbnail={'https://res.cloudinary.com/dpomtzref/image/upload/v1742534698/eon2dutyiq6a7oemp00a.webp'} />

            <CourseDetails course={course} />

            {course?.testimonials  && (<Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} 
             />) }

            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;