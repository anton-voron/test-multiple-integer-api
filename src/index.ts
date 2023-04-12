import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';



const  GetMultipleIntegerHandler = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url ?? '', true);
  const query = parsedUrl.query;
  console.log(query);
  if(query.number) {

  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid input' }));
  }
};

const router = {
  '/': {
    GET: GetMultipleIntegerHandler,
  }
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const method = req.method ?? 'GET';
  const handler = (router as any)[req.url ?? ''][method];

  if(handler) {
    handler(req, res);
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid request' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening http://localhost:3000');
});
