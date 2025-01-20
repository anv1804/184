export interface Subject {
  _id?: string;
  name?: string;
  image?: string;
  description?: string;
  teachers?: [object];
  status?: boolean;
}
