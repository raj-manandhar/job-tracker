import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      default: "Internship",
    },
    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Offer", "Rejected"],
      default: "Applied",
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Brand", applicationSchema);
export default Application;
