import { Controller } from '../../core/decorators/controller.decorator';
import { Route } from '../../core/decorators/route.decorator';
import { MultipleIntegerService } from './multiple-integer.service';
import { Request, Response } from '../../core/core-class/controller-route';

@Controller('multiple-integer')
export class MultipleIntegerController {

  @Route('GET', '/')
  public async get(request: Request): Promise<Response> {
    const query = request.query;
    const number = Number(query?.number);
    try {
      const result = MultipleIntegerService.calculateMultipleInteger(number);
      return {
        statusCode: 200,
        body: { result }
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: { error: 'Invalid input' }
      };
    }

  }
}
