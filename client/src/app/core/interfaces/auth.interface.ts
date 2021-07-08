export interface IAuthBody {
  address: any;
  signature: any,
  nonce: any;
}

export enum AuthStatus {
  success= 'success'
}

export interface IAuthResponse {
  status: AuthStatus;
}
