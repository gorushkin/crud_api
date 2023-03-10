import { IncomingMessage, ServerResponse } from 'node:http';

export class CustomRequest extends IncomingMessage {
  params: Record<string, string> = {};
  body: any | undefined = undefined;
}

export type CustomRequestListener<
  Request extends typeof CustomRequest = typeof CustomRequest,
  Response extends typeof ServerResponse = typeof ServerResponse
> = (
  req: InstanceType<Request>,
  res: InstanceType<Response> & { req: InstanceType<Request> }
) => void;

export type CustomResponse = ServerResponse & { req: CustomRequest };

export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}
