type Gender = "male" | "female";

export type ProfileCardProps = {
  FirstName: string;
  LastName: string;
  Height: number | string;
  Gender: Gender;
  BirthDate: Date | string;
  Picture?: string;
  handleClose?: () => void;
};

export type User = {
  FirstName: string;
  LastName: string;
  Height: number | string;
  Gender: Gender;
  BirthDate: Date | string;
};

export type Item = {
  userId: { S: string };
  firstName: { S: string };
  lastName: { S: string };
  height: { S: string };
  gender: { S: string };
  birthDate: { S: string };
};
