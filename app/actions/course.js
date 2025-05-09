"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { create } from "@/queries/course";

export async function createCourse(data) {


    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id;
        const course = await create(data);
        return course;
    }catch(e){
        throw new Error(e);
    }

}