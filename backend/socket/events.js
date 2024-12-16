const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  
  MESSAGE: {
    SEND: 'send_message',
    NEW: 'new_message',
    RECALL: 'message_recalled',
    EDIT: 'message_edited'
  },
  
  ROOM: {
    JOIN: 'join_room',
    LEAVE: 'leave_room'
  },
  
  TYPING: {
    STATUS: 'typing_status'
  },
  
  USER: {
    STATUS_CHANGE: 'user_status_change'
  }
};

module.exports = EVENTS; 