import { server } from './app';
import { config } from './config';
import { addUser, deleteUser, getUser, getUsers, updateUser } from './controllers';

if (!config.PORT) throw new Error('Set port in .env');

server.get('/api/user/:id', getUser);
server.get('/api/user', getUsers);

server.post('/api/users', addUser);

server.put('/api/user/:id', updateUser);

server.delete('/api/user/:id', deleteUser);

server.listen(Number(config.PORT));
