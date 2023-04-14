import { IncomingMessage, ServerResponse } from 'http';

export class Router {

  constructor(private readonly controllers: any[]) {}

  public async handleRequest (req: IncomingMessage, res: ServerResponse): Promise<ServerResponse> {
    const prefix = req.url?.split('/')[1];
    const controller = this.controllers.find(controller => controller.route.path === prefix);
    if (controller) {
      return controller.route.handleRequest(req, res);
    } else {
      console.error(`Invalid request, path: ${req.url} is not found`);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid request' }));
    }
  }
}
