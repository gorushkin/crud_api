import http, { Server } from 'node:http';
import { CustomRequest, CustomRequestListener, CustomResponse } from './types';
import { AppError, getRoute, getVariables } from './utils';

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

  async handler(req: CustomRequest, res: CustomResponse) {
    const { url, method } = req;
    if (!url || !method) throw new AppError('Wrong url');

    const methodRoutes = this.handlers[req.method as METHOD];
    const routes = Object.keys(methodRoutes);

    const route = getRoute(url, routes);

    const handler = route ? methodRoutes[route] : null;

    if (!handler || !route) throw new AppError('Wrong url');

    const variables = getVariables(url, route);
    console.log('variables: ', variables);

    variables.forEach((item) => {
      if (!req.params) req.params = {};
      req.params[item.name] = item.value;
    });

    try {
      await handler(req, res);
      res.writeHead(404).end();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async listen(port: number) {
    this.server.listen(port);
    this.server.on('request', async (req, res) => {
      try {
        await this.handler(req as CustomRequest, res as CustomResponse);
      } catch (error) {
        if (!(error instanceof AppError)) throw error;
        res.writeHead(404).end();
      }
    });

    this.server.on('error', (err) => {
      if (!(err instanceof AppError)) throw err;
      console.log(err.message);
    });
  }
}

const server = new App();

export { server };
