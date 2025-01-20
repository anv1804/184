const mongoose = require("mongoose");
const Subject = require("../../models/Subjects/SubjectModel");

exports.getAllSubject = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teachers");
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subjects = await Subject.findById(id).populate("teachers");
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
