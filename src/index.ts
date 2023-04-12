import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';



const  GetMultipleIntegerHandler = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url ?? '', true);
  const query = parsedUrl.query;
  const number = Number(query?.number);
  if (!isNaN(number)) {
    let result = '';

    if (number % 3 === 0) {
      result += 'G';
    }

    if (number % 5 === 0) {
      result += 'N';
    }

    if (!result) {
      result = number.toString();
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result }));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid input' }));
  }
};

const router = {
  '/api/': {
    GET: GetMultipleIntegerHandler,
  }
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url ?? '', true);
  const method = req.method ?? 'GET';

  const handler = (router as any)[parsedUrl.pathname ?? '']?.[method];

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
