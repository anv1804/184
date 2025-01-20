const express = require("express");
const {
  getAllEvents,
  getEventById,
  creatEvent,
} = require("../../controllers/Events/EventController");
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/create", creatEvent);

module.exports = router;
