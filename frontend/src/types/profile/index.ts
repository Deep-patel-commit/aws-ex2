type Gender = "male" | "female";

export type ProfileCardProps = {
  FirstName: string;
  LastName: string;
  Height: number;
  Gender: Gender;
  BirthDate: Date;
  Picture?: string;
  handleClose?: () => void;
};

export type User = {
  FirstName: string;
  LastName: string;
  Height: number;
  Gender: Gender;
  BirthDate: Date;
};

export type Item = {
  userId: { S: string };
  firstName: { S: string };
  lastName: { S: string };
  height: { S: string };
  gender: { S: string };
  birthDate: { S: string };
};

export type SignInProp = {
  userName: string;
  passWord: string;
};

export type SignUpProp = {
  userName: string;
  emailAddress: string;
  passWord: string;
  confirmPassWord: string;
};

export type AuthData = {
  sub: string;
  email_verified: boolean;
  id_token: string;
  access_token: string;
  refresh_token: string;
  group?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthData | null;
  loading: boolean;
  error?: string | null;
};
