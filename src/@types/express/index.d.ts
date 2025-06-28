declare namespace Express {
  export interface Request {
    userId: string; // This will hold the user ID after authentication
  }
}