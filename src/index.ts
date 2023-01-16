import { server } from './app';
import { config } from './config';
import { addUser, deleteUser, getUser, getUsers, updateUser } from './controllers';
import { errorHandler } from './error';

if (!config.PORT) throw new Error('Set port in .env');

server.get('/api/user/:id', errorHandler.bind(null, getUser));
server.get('/api/user', errorHandler.bind(null, getUsers));

server.post('/api/user', errorHandler.bind(null, addUser));

server.put('/api/user/:id', errorHandler.bind(null, updateUser));

server.delete('/api/user/:id', errorHandler.bind(null, deleteUser));

server.listen(Number(config.PORT));
