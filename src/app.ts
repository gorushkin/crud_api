import http, { Server } from 'node:http';
import { AppError } from './error';
import { CustomRequest, CustomRequestListener, CustomResponse } from './types';
import { getBody, getRoute, getVariables } from './utils';

type Handler = Record<string, CustomRequestListener>;

enum METHOD {
  DELETE = 'DELETE',
  PUT = 'PUT',
  GET = 'GET',
  POST = 'POST',
}

class App {
  handlers: Record<METHOD, Handler>;
  server: Server;

  constructor() {
    this.handlers = {
      GET: {},
      PUT: {},
      DELETE: {},
      POST: {},
    };
    this.server = http.createServer();
  }

  get(route: string, handler: CustomRequestListener) {
    this.handlers.GET[route] = handler;
  }

  post(route: string, handler: CustomRequestListener) {
    this.handlers.POST[route] = handler;
  }

  delete(route: string, handler: CustomRequestListener) {
    this.handlers.DELETE[route] = handler;
  }

  put(route: string, handler: CustomRequestListener) {
    this.handlers.PUT[route] = handler;
  }

  async handler(req: CustomRequest, res: CustomResponse) {
    const { url, method } = req;
    if (!url || !method) throw new AppError(404, 'Wrong url');

    const methodRoutes = this.handlers[req.method as METHOD];
    const routes = Object.keys(methodRoutes);

    const route = getRoute(url, routes);

    const handler = route ? methodRoutes[route] : null;

    if (!handler || !route) throw new AppError(404, 'Wrong url');

    const variables = getVariables(url, route);

    variables.forEach((item) => {
      if (!req.params) req.params = {};
      req.params[item.name] = item.value;
    });

    await handler(req, res);
  }

  async listen(port: number) {
    this.server.listen(port);
    this.server.on('request', async (req, res) => {
      const customRequest = req as CustomRequest;

      const body = await getBody(req);

      customRequest.body = body;

      try {
        await this.handler(customRequest, res as CustomResponse);
      } catch (error) {
        if (!(error instanceof AppError)) throw error;
        res.writeHead(error.statusCode).end(error.message);
      }
    });

    this.server.on('error', (err) => {
      if (!(err instanceof AppError)) throw err;
      // console.log(err.message);
    });
  }
}

const server = new App();

export { server };
