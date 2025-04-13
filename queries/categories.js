import { Category } from "@/model/category-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

export async function getCategories() {
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}

export async function getCategoryDetails(categoryId) {
    try {
        console.log(categoryId,"categoryId")
        const category = await Category.find().lean();
        // return replaceMongoIdInObject(category);
        console.log(category,"category  from catregory details")
    } catch (error) {
        throw new Error(error);
    }

}