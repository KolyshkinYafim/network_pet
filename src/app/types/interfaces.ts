export interface Auth {
  email: string;
  password: string;
}

export interface UserAuth extends Auth {
  name: string;
}
