import httpStatus from 'http-status';
import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '@/app';

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 401', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
