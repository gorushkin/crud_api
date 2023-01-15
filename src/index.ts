import { server } from './app';

console.log('start');
console.clear();

server.get('/user/:id/', async (req, res) => {
  res.writeHead(200);
  res.end('Users');
});

server.get('/user', async (_req, res) => {
  res.writeHead(200);
  res.end('User');
});

server.listen(8000);
