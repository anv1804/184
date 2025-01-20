// backend/models/Message.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // tiêu đề
    content: { type: String, required: false }, // nội dung chính
    description: { type: String, required: false }, // mô tả ngắn
    image: { type: [String], required: false }, // ảnh
    tag: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    view: { type: Number, required: false, default: 0 },
    status: {
      type: String,
      enum: ["edit", "publish", "hidden"],
      default: "publish",
      required: false,
    },
    like: {
      countLike: { type: Number, required: false, default: 0 },
      userLike: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: false,
      },
      typeLike: {
        type: String,
        enum: ["like", "heart", "love", "smile", "sad", "angry"],
        default: "like",
        required: false,
      },
    },
    share: {
      countShare: { type: Number, required: false, default: 0 },
      userShare: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: false,
      },
    },
    comment: {
      countComment: { type: Number, required: false, default: 0 },
      userComment: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: false,
      },
      contentComment: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);
// Virtual để định dạng ngày
eventSchema.virtual("formattedDate").get(function () {
  const date = new Date(this.createdAt);
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
});

// Bật chế độ virtuals khi chuyển sang JSON/Objects
eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Event", eventSchema);
