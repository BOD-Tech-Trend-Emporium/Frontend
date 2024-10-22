export interface UserEntity {
  id: string;
  name: string;
  email: string;
  userName: string;
  role: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  userName: string;
  role: string;
  password: string;
  securityQuestion: string;
  securityQuestionAnswer: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  userName: string;
  role: string;
  createdAt: string;
}
