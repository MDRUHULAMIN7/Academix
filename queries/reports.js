import { Report } from "@/model/report-model";
import { Assessment } from "@/model/assessment-model";

import { replaceMongoIdInObject } from "@/lib/convertData";
export async function getAReport(filter) {
    try {
      const report = await Report.findOne(filter)
        .populate({
          path: "quizAssessment",
          model: Assessment,
        })
        .lean();
  
      if (!report) {
        throw new Error(" Report not found");
      }
  
      return replaceMongoIdInObject(report);
    } catch (error) {
      throw new Error(error.message || "Something went wrong in getAReport");
    }
  }
  