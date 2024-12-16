const User = require('../models/User');

// Gửi lời mời kết bạn
const sendFriendRequest = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const senderId = req.user._id;

    // Kiểm tra xem đã là bạn bè chưa
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.friends.includes(senderId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Kiểm tra xem đã gửi lời mời chưa
    const existingRequest = targetUser.friendRequests.find(
      request => request.from.toString() === senderId.toString()
    );

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Thêm friend request
    targetUser.friendRequests.push({
      from: senderId,
      status: "pending"
    });

    await targetUser.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Chấp nhận lời mời kết bạn
const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const request = user.friendRequests.id(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Cập nhật trạng thái request
    request.status = "accepted";

    // Thêm vào danh sách bạn bè của cả hai người
    user.friends.push(request.from);
    const otherUser = await User.findById(request.from);
    otherUser.friends.push(userId);

    await Promise.all([user.save(), otherUser.save()]);

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Từ chối lời mời kết bạn
const rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const request = user.friendRequests.id(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    request.status = "rejected";
    await user.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách bạn bè
const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('friends', 'name email avatar isOnline');
    
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách lời mời kết bạn
const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate('friendRequests.from', 'name email avatar');
    
    const pendingRequests = user.friendRequests.filter(
      request => request.status === "pending"
    );

    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa bạn bè
const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;

    // Xóa khỏi danh sách bạn bè của cả hai người
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId }
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId }
    });

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getFriendRequests,
  removeFriend
}; 