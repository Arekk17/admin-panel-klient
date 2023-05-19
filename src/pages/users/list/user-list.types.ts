import { ROLE } from "../../../context/auth-context";


export enum UserFields {
    ID = 'id',
    NAME = 'name',
    SURNAME = 'surname',
    EMAIL = 'email',
    ROLE = 'role',
    PHONENUMBER = 'phonenumber',
    PHONEPREFIX = 'phoneprefix',
    JOINED = 'joined'
}
export type UsersQueryResponse = {
    users: Array<User>;
  };
export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: ROLE;
    phoneNumber: number;
    phonePrefix: number;
    
}