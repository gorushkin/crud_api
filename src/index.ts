import { server } from './app';

import { config } from './config';

if (!config.PORT) throw new Error('Set port in .env');

server.listen(Number(config.PORT));
