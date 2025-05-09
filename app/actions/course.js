"use server";

import { create } from "@/queries/course";

export async function createCourse(data) {


    try {
        const course = await create(data);
        return course;
    }catch(e){
        throw new Error(e);
    }

}