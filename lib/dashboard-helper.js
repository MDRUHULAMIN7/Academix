import { auth } from "@/auth";
import { getCourseDetailsByInstructor } from "@/queries/course";
import { getUserByEmail } from "@/queries/users";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

export async function getInstructorDashboardData(dataType){

    try{
        const session = await auth();
        const instructor = await getUserByEmail(session.user.email);
        const data = await getCourseDetailsByInstructor(instructor?.id, true);
         
       switch(dataType){
            case COURSE_DATA:
                return data?.courses;

            case ENROLLMENT_DATA:
                return data?.enrollments ;

            case REVIEW_DATA:
                return data?.reviews ;

            default:
                return data;
       }

        return data;
    }catch(err){
        throw new Error(err);
    }
}