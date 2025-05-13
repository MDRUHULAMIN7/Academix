"use server";

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