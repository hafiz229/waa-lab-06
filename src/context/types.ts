export interface User {
  uid: string;
  avatar: string;
  uname: string;
}

export interface Comment {
  rpid: string;
  user: User;
  content: string;
  ctime: string;
  like: number;
}
