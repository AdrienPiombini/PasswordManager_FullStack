import * as bcrypt from 'bcrypt';

export type JWT = {
  accessToken: string;
};

export const JWT_SECRET = {
  secret: 'f52a341b-fc9b-432c-9f6a-5314dee989ab',
};

export const SALT = bcrypt.genSalt();

export type LogginError = {
  error: 'UNAUTHORIZED TO LOGIN';
  message: 'AN ERROR OCCURED, PLS VERIFY YOUR CREDRENTIALS';
  details?: string;
};

export type RegisterError = {
  details?: string;
};

export type RegisterResponse = {
  status: 201 | 401;
  message: 'Account created successfully' | 'UNAUTHORIZED TO REGISTER';
  body: JWT | RegisterError;
};

export type LoginResponse = {
  status: 201 | 401;
  error: 'UNAUTHORIZED TO LOGIN';
  message: 'AN ERROR OCCURED, PLS VERIFY YOUR CREDRENTIALS';
  body: JWT;
};
