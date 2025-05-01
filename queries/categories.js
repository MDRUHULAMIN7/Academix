import { Category } from "@/model/category-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
const { ObjectId } = require('mongodb')
export async function getCategories() {
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}

export async function getCategoryDetails(categoryId) {
    try {
      
        const category = await Category.findById(new ObjectId(categoryId)).lean();
        return replaceMongoIdInObject(category);
        // console.log(category,"category  from catregory details")
    } catch (error) {
        throw new Error(error);
    }

}