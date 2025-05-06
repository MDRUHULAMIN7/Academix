import { Report } from "@/model/report-model";


import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
export async function getAReport(filter) {
    try {
      const report = await Report?.findOne(filter)
        .populate({
          path: "quizAssessment",
          model: Assessment,
        })
        .lean();
      //  console.log(report, "report")
      // if (!report) {
      //   throw new Error(" Report not found");
      // }
  
      return replaceMongoIdInObject(report);
    } catch (error) {
      // console.error("Error fetching report:", error);
      throw new Error("Failed to fetch report");
    }
  }
  