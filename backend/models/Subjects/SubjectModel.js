const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: false,
      default: [],
    },
  ],
  image: {
    type: String,
    required: false,
    default:
      "https://st.ebomb.edu.vn/src/mshoajunior-image/tin_tuc/subjectchoicearticle1.jpg",
  },
  description: { type: String, required: false, default: "nguyen van an" },
  status: { type: Boolean, required: false, default: true },
});

module.exports = mongoose.model("Subject", subjectSchema);
