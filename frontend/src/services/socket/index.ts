import socketIO from 'socket.io-client';
import { EventEmitter } from 'events';
import { TypingStatusData, MessageEventData, UserStatusData } from '../../types/socket';

interface ServerToClientEvents {
  'new_message': (data: MessageEventData) => void;
  'typing_status': (data: TypingStatusData) => void;
  'user_status_change': (data: UserStatusData) => void;
  'error': (error: Error) => void;
  'connect': () => void;
  'disconnect': () => void;
  'reconnect_attempt': () => void;
  'reconnect': () => void;
  'reconnect_error': (error: Error) => void;
  'reconnect_failed': () => void;
}

interface ClientToServerEvents {
  'send_message': (data: MessageEventData) => void;
  'typing_status': (data: TypingStatusData) => void;
  'join_room': (roomId: string) => void;
  'leave_room': (roomId: string) => void;
}

class SocketService extends EventEmitter {
  private static instance: SocketService;
  private socket: any = null;
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  private constructor() {
    super();
    this.handleConnectionError = this.handleConnectionError.bind(this);
    this.handleReconnection = this.handleReconnection.bind(this);
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect() {
    if (!this.socket) {
      try {
        this.socket = socketIO('http://localhost:5000', {
          transports: ['websocket'],
          reconnection: true,
          reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
          reconnectionDelay: 1000,
          timeout: 10000
        });
        this.setupListeners();
      } catch (error) {
        this.handleConnectionError(error as Error);
      }
    }
    return this.socket;
  }

  private setupListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      this.reconnectAttempts = 0;
      this.emit('connected');
    });

    this.socket.on('disconnect', () => {
      this.emit('disconnected');
    });

    this.socket.on('error', this.handleConnectionError);

    // Reconnection events
    this.socket.on('reconnect_attempt', () => {
      this.reconnectAttempts++;
      this.emit('reconnecting', this.reconnectAttempts);
    });

    this.socket.on('reconnect', this.handleReconnection);
    this.socket.on('reconnect_error', this.handleConnectionError);
    this.socket.on('reconnect_failed', () => {
      this.emit('reconnect_failed');
      this.handleConnectionError(new Error('Reconnection failed'));
    });
  }

  private handleConnectionError(error: Error) {
    console.error('Socket connection error:', error);
    this.emit('socket_error', error);
  }

  private handleReconnection() {
    this.emit('reconnected');
    // Có thể thêm logic để resync data sau khi reconnect
  }

  // Room methods
  joinRoom(roomId: string) {
    if (!this.socket?.connected) {
      this.handleConnectionError(new Error('Socket not connected'));
      return;
    }
    this.socket.emit('join_room', roomId);
  }

  leaveRoom(roomId: string) {
    if (!this.socket?.connected) return;
    this.socket.emit('leave_room', roomId);
  }

  // Message methods
  emitMessage(data: MessageEventData) {
    if (!this.socket?.connected) {
      this.handleConnectionError(new Error('Socket not connected'));
      return;
    }
    this.socket.emit('send_message', data);
  }

  onNewMessage(callback: (data: MessageEventData) => void) {
    this.socket?.on('new_message', callback);
  }

  // Typing methods
  onTypingStatus(callback: (data: TypingStatusData) => void) {
    this.socket?.on('typing_status', callback);
  }

  emitTypingStatus(data: TypingStatusData) {
    if (!this.socket?.connected) return;
    this.socket.emit('typing_status', data);
  }

  // User status methods
  onUserStatus(callback: (data: UserStatusData) => void) {
    this.socket?.on('user_status_change', callback);
  }

  // Cleanup method
  removeAllListeners(event?: string | symbol): this {
    if (event) {
      this.socket?.off(event);
    } else {
      this.socket?.removeAllListeners();
    }
    return super.removeAllListeners(event);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket() {
    return this.socket;
  }
}

export default SocketService.getInstance(); 