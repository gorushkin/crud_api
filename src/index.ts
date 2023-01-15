import { server } from './app';

console.log('start');
console.clear();

server.get('/users/:id/data', async (_req, res) => {
  res.writeHead(200);
  res.end('Users');
});

server.get('/user', async (_req, res) => {
  res.writeHead(200);
  res.end('User');
});

server.listen(8000);
