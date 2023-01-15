import { server } from './app';
import { config } from './config';
import { addUser, getUser, getUsers } from './controllers';

if (!config.PORT) throw new Error('Set port in .env');

console.clear();

server.get('/api/user/:id', getUser);
server.get('/api/user', getUsers);

server.post('/api/users', addUser)

server.listen(Number(config.PORT));
