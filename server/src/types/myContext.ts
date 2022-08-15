import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: {
    _id: string;
    tokenVersion: number;
  };
}
