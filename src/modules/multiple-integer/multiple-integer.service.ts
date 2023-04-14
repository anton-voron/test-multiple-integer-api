export class MultipleIntegerService {

  public static calculateMultipleInteger(number: number): string {
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
      return result;
    } else {
        throw new Error('Invalid input');
    }
  }
}
