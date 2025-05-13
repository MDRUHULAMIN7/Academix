"use server";

import { Lesson } from "@/model/lessons.model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";

export async function createLesson(data) {

    try{
          const title = data.get("title");
          const moduleId = data.get("moduleId");
            const slug = data.get("slug");
            const order = data.get("order");

          const createdLesson =   await create({
                title,
                moduleId,
                slug,
                order
            });
            // eslint-disable-next-line @next/next/no-assign-module-variable
            const module = await Module.findById(moduleId);
            module.lessonIds.push(createdLesson?._id);
            module.save();

            return createdLesson;


    }catch (error) {
        throw new Error(error);
    }
}

export async function reOrderLesson(data){

    try{

        await Promise.all(data.map(async (element)=>{

            await Lesson.findByIdAndUpdate(element.id, {
                order: element.position
            });
        }))

    }
    catch(e){
        throw new Error(e);
    }
}

export async function updateLesson(lessonId, data) {
   
    try{
        await Lesson.findByIdAndUpdate(lessonId,data);

    }catch (error) {
        throw new Error(error);
    }

}