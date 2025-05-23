import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
formatPrice;
import { getCourseDetailsByInstructor } from "@/queries/course";
import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


const DashboardPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const instructor = await getUserByEmail(session.user.email);
  console.log(instructor)
  if (instructor?.role !== "instructor") {
    redirect("/login");
  }
  const courseStats = await getCourseDetailsByInstructor(instructor.id);
  console.log(courseStats)
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseStats?.courses}</div>
          </CardContent>
        </Card>
        {/* total enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseStats?. enrollments}</div>
          </CardContent>
        </Card>
        {/* total revinue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(courseStats?.revenue)}</div>
          </CardContent>
        </Card>
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;
