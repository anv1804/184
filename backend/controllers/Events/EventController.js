const Event = require("../../models/Event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundEvent = await Event.findById(id);
    if (!foundEvent) {
      return res
        .status(404)
        .json({ message: "Không tồn tại sự kiện hoặc bài viết" });
    }

    res.status(200).json(foundEvent);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tìm sự kiện hoặc bài viết",
      error: error.message,
    });
  }
};
const creatEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  getAllEvents,
  getEventById,
  creatEvent,
};
