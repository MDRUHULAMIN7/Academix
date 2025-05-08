import { getCourseDetails } from "@/queries/course";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

import { getInstructorDashboardData, REVIEW_DATA } from "@/lib/dashboard-helper";
const reviews = [
  {
    id: 1,
    student: { name: "John Doe" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
  {
    id: 1,
    student: { name: "John Smilga" },
    review: "Nice Course, Thanks for the help",
    rating: 5,
  },
];
const ReviewsPage = async ({params:{courseId}}) => {

  const course = await getCourseDetails(courseId);

  const reviewData = await getInstructorDashboardData(REVIEW_DATA);

  console.log(reviewData,"reviewData");
  return (
    <div className="p-6">
      <h2>{course.title}</h2>
      <DataTable columns={columns} data={reviews} />
    </div>
  );
};

export default ReviewsPage;
