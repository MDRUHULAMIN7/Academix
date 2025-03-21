import { Lesson } from "@/model/lessons.model";
import { replaceMongoIdInObject } from "@/lib/convertData";

export async function getLesson(lessonId) {
    const lesson = await Lesson.findById(lessonId).lean();
    return replaceMongoIdInObject(lesson);
}