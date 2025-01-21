const mongoose = require("mongoose");

// Schema cho Class
const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  homeroomTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  subjects: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  pointRanking: { type: Number, required: false, default: 0 },
  grade: { type: Number, required: false, default: 10 },
});
classSchema.virtual("studentsCount").get(function () {
  return this.students ? this.students.length : 0;
});

classSchema.set("toObject", { virtuals: true });
classSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Class", classSchema);
