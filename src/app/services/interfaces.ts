export interface UpdateUserCommand {
    id?: string | undefined;
    userName?: string | undefined;
    fullName?: string | undefined;
    email?: string | undefined;
    dob?: Date;
    gender?: Gender;
    address?: string | undefined;
    phoneNumber?: string | undefined;
    image?: string | undefined;
  }

  export enum Gender {
    male = 0,
    female = 1,
    other = 2,
  }