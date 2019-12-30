import { generatePageError } from '../next-with-error';

describe('generatePageError', () => {
  test('should generate a valid error object with status code', () => {
    expect(generatePageError(401)).toEqual({
      error: {
        statusCode: 401
      }
    });
  });

  test('should include extra parameters in the error object if passed to the function', () => {
    expect(generatePageError(401, { message: 'oopsie' })).toEqual({
      error: {
        statusCode: 401,
        message: 'oopsie'
      }
    });
  });
});
