const Subject = require('../models/Subject');

// Tạo môn học
const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const subject = new Subject({
      name,
      description,
    });

    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo môn học' });
  }
};

// Lấy tất cả môn học
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách môn học' });
  }
};

// Cập nhật môn học
const updateSubject = async (req, res) => {
  try {
    const { subject_id, name, description } = req.body;

    const subject = await Subject.findById(subject_id);
    if (!subject) {
      return res.status(404).json({ message: 'Môn học không tồn tại' });
    }

    subject.name = name || subject.name;
    subject.description = description || subject.description;

    await subject.save();
    res.status(200).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi cập nhật môn học' });
  }
};

// Xóa môn học
const deleteSubject = async (req, res) => {
  try {
    const { subject_id } = req.params;

    const subject = await Subject.findById(subject_id);
    if (!subject) {
      return res.status(404).json({ message: 'Môn học không tồn tại' });
    }

    await subject.remove();
    res.status(200).json({ message: 'Môn học đã được xóa' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi xóa môn học' });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
};
