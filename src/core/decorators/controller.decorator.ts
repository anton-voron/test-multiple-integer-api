import 'reflect-metadata';
import { ControllerRoute, Route } from '../core-class/controller-route';

export function Controller(path: string) {
  return function <T extends { new(...args: any[]): {} }>(Constructor: T) {
    return class extends Constructor {
      public route: ControllerRoute = new ControllerRoute(path);

      constructor(...args: any[]) {
        super(...args);

        const methods = Object.getOwnPropertyNames(Constructor.prototype);
        methods.forEach(method => {
          const route: Route = Reflect.getMetadata('route', this[method]);
          if (route) {
            this.route.add(route.method, route.path, this[method]);
          }
        });
      }
    };
  }
}
