export interface User {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface UserResponse {
  message: string;
  token: string;
  userId: number;
}
