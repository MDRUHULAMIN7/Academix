import Test from "@/components/Test";
import { getCourses } from "@/queries/course";

export default async function Home() {
  const courses = await getCourses();
  // console.log(courses);
  // console.log(courses[0]?.instructor?.socialMedia)
  console.log(courses[0]?.modules)
  return (
    <Test />
  );
}
