import * as http from 'http';
import * as assert from 'assert';
import { IncomingMessage } from 'http';

describe('GetMultipleIntegerHandler', () => {
  it('should return "GN" for input 15', (done) => {
    const req = http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 3000,
      path: '/multiple-integer/?number=15',
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const result = JSON.parse(data).result;
        assert.strictEqual(result, 'GN');
        done();
      });
    });

    req.end();
  });

  it('should return "G" for input 9', (done) => {
    const req = http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 3000,
      path: '/multiple-integer/?number=9',
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const result = JSON.parse(data).result;
        assert.strictEqual(result, 'G');
        done();
      });
    });

    req.end();
  });

  it('should return "N" for input 10', (done) => {
    const req = http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 3000,
      path: '/multiple-integer/?number=10',
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const result = JSON.parse(data).result;
        assert.strictEqual(result, 'N');
        done();
      });
    });

    req.end();
  });

  it('should return the input number for input 7', (done) => {
    const req = http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 3000,
      path: '/multiple-integer/?number=7',
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const result = JSON.parse(data).result;
        assert.strictEqual(result, '7');
        done();
      });
    });

    req.end();
  });

  it('should return an error message for invalid input', (done) => {
    const req = http.request({
      method: 'GET',
      hostname: 'localhost',
      port: 3000,
      path: '/multiple-integer/?number=foo',
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const result = JSON.parse(data).error;
        assert.strictEqual(result, 'Invalid input');
        done();
      });
    });

    req.end();
  });
});
