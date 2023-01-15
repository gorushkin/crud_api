import http, { IncomingMessage, ServerResponse, RequestListener, Server } from 'node:http';
import { AppError, getRoute } from './utils';

type Handler = Record<string, RequestListener>;

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

  get(route: string, handler: RequestListener) {
    this.handlers.GET[route] = handler;
  }

  async handler(req: IncomingMessage, res: ServerResponse) {
    const { url, method } = req;
    if (!url || !method) return res.writeHead(404).end();

    const methodRoutes = this.handlers[req.method as METHOD];
    const routes = Object.keys(methodRoutes);

    const route = getRoute(url, routes);
    console.log('route: ', route);

    const handler = route ? methodRoutes[route] : null;

    if (!handler) throw new AppError('Wrong url');

    handler(req, res);

    // handler(req, res)

    try {
      // if (this.handlers[req.url]) return this.handlers[req.url](req, res);
      res.writeHead(404).end();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async listen(port: number) {
    this.server.listen(port);
    this.server.on('request', async (req, res) => {
      try {
        await this.handler(req, res);
      } catch (error) {
        if (!(error instanceof AppError)) throw error;
        res.writeHead(404).end();
      }
    });
    // this.server.on('request', this.handler.bind(this));

    this.server.on('error', (err) => {
      if (!(err instanceof AppError)) throw err;
      console.log(err.message);
    });
  }
}

const server = new App();

export { server };
