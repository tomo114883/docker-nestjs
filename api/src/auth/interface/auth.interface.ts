export interface Msg {
  message: string;
}
export interface Csrf {
  csrfToken: string;
}
export interface Jwt {
  accessToken: string;
}
export interface Payload {
  sub: number;
  email: string;
}
