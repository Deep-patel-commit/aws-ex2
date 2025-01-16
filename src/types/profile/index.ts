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
