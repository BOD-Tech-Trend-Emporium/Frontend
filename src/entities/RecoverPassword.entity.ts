export interface RecoverPasswordEntity {
  email: string;
  password: string;
  securityQuestionAnswer: string;
  securityQuestion: number;
}
