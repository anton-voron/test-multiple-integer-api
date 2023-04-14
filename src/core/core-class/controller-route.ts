import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'node:querystring';
import * as url from 'url';

export interface Request {
  url: string;
  method: string;
  headers: IncomingHttpHeaders;
  query?: ParsedUrlQuery;
  body?: any;
}

export interface Response {
  statusCode: number;
  headers?: { [key: string]: string };
  body?: any;
}

export type ControllerMethod = (request: Request) => Promise<Response>;

export interface Route {
  method: string;
  path: string;
  controllerMethod: ControllerMethod;
}

export class ControllerRoute {
  protected routes: Map<string, Function> = new Map();

  constructor(public readonly path: string) {
  }

  public add(method: string, path: string, controllerMethod: ControllerMethod) {
    this.routes.set(`${this.path}:${method}:${path}`, controllerMethod);
  }

  private sendResponse(serverResponse: ServerResponse, response: Response): ServerResponse {
    const headers = response.headers || {};
    headers['Content-Type'] = 'application/json';
    serverResponse.writeHead(response.statusCode, headers);
    serverResponse.end(JSON.stringify(response.body || {}));
    return serverResponse;
  }

  public async handleRequest (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {

    const parsedUrl = url.parse(req.url, true);
    const postfix = parsedUrl.pathname.replace(`/${this.path}`, '');
    const method = req.method ?? '';

    const request: Request = {
      url: postfix || '',
      method: method,
      headers: req.headers,
      query: parsedUrl.query,
    };

    if(method === 'POST' || method === 'PUT' || method === 'PATCH') {
      request.body =  await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    const controllerMethod: ControllerMethod = this.routes.get(`${this.path}:${method}:${request.url}`) as ControllerMethod;

    if(controllerMethod) {
      const response = await controllerMethod(request);
      return this.sendResponse(res, response);
    } else {
      return this.sendResponse(res, { statusCode: 404, body: { error: 'Not found' } });
    }

  }
}
