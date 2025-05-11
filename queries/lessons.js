import { Lesson } from "@/model/lessons.model";
import { replaceMongoIdInObject } from "@/lib/convertData";

export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lesson);
}

export async function create(lessonData){

    try{
        const lesson = await Lesson.create(lessonData);
           return JSON.parse(JSON.stringify(lesson));

    }catch (error) {
       
        throw new Error("Error creating lesson");
    }
}