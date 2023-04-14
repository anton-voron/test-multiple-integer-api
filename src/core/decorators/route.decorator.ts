import "reflect-metadata";

export function Route(method: string, path: string) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('route', { method, path }, descriptor.value);
  };
}
