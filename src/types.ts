import { IncomingMessage, ServerResponse } from 'node:http';

export class CustomRequest extends IncomingMessage {
  params: Record<string, string> = {};
}

export type CustomRequestListener<
  Request extends typeof CustomRequest = typeof CustomRequest,
  Response extends typeof ServerResponse = typeof ServerResponse
> = (
  req: InstanceType<Request>,
  res: InstanceType<Response> & { req: InstanceType<Request> }
) => void;

export type CustomResponse = ServerResponse & { req: CustomRequest };
