export interface User {
    id: string;
    email: string;
    istechnician: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface RegisterDTO {
  fullname: string;
  email: string;
  password: string;
  country?: string;
  istechnician: boolean;
  registrationnumber?: string;
}

export interface LoginData {
  email: string;
  password: string;
}