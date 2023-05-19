import { ReactNode } from 'react';

export type AuthProviderProperties = {
  children: ReactNode;
};

export type DecodedToken = {
  userId: string;
  role: keyof typeof ROLE;
  iat: number;
};

export type AuthState = {
  user: {
    userId: string;
    role: keyof typeof ROLE;
    name: string;
  } | null;
};

export enum ROLE {
  User = 'USER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  Teacher = 'TEACHER'
}

export enum ACTION_TYPE {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_STATE = 'GET_STATE'
}
export type SigninUserData = {
  token: string;
  user: {
    name: string;
  };
};
export type LoginProperties = (signinUserData: SigninUserData) => void;

export type AuthReducerProperties = (
  state: AuthState,
  action: {
    type: keyof typeof ACTION_TYPE;
    payload?: any;
  }
) => any;
