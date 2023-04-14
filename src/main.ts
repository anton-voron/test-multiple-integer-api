import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { MultipleIntegerController } from './modules/multiple-integer/multiple-integer.controller';
import { Router } from './router';

const router = new Router([
    new MultipleIntegerController()
  ]
);

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await router.handleRequest(req, res);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening http://localhost:3000');
});
