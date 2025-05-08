import { getCourseDetails } from "@/queries/course";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { getInstructorDashboardData, REVIEW_DATA } from "@/lib/dashboard-helper";

const ReviewsPage = async ({params:{courseId}}) => {

  const course = await getCourseDetails(courseId);

  const reviewData = await getInstructorDashboardData(REVIEW_DATA);

  const reviewDataForCourse = reviewData.filter((review) => review.courseId.toString() == courseId);

  console.log(reviewData,"reviewData");
  return (
    <div className="p-6">
      <h2>{course.title}</h2>
      <DataTable columns={columns} data={ reviewDataForCourse } />
    </div>
  );
};

export default ReviewsPage;
