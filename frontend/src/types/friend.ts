export interface Friend {
  _id: string;
  name: string;
  avatar?: string;
  email: string;
  isOnline: boolean;
}

export interface StatusChangeData {
  userId: string;
  isOnline: boolean;
} 