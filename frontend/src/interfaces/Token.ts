export default interface Token {
  token: string | null;
  expiresIn: number; // in milliseconds
  createdAt?: number; // timestamp when the token was created
}
