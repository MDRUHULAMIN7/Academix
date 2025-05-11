import { replaceMongoIdInObject } from "@/lib/convertData";
import { Module } from "@/model/module-model";


export async  function create(moduleData){

    try{
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = await Module.create(moduleData);
        return JSON.parse(JSON.stringify(module));

    }catch(e){
        throw new Error(e);
    }
}


export async function getModule(moduleId){
    try{
        const moduleData = await Module.findById(moduleId).lean();
        return replaceMongoIdInObject(moduleData);
    }catch(e){
        throw new Error(e);
    }
}