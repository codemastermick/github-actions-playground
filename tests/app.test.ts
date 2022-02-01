import app from '../src/app';
import supertest from 'supertest';
import { expect } from 'chai';

describe('Index Test', function () {
  let request: supertest.SuperAgentTest;
  before(function (done) {
    request = supertest.agent(app);
    done();
  });
  after(async function (done) {
    // shut down the Express.js server
    app.close();
    done();
  });

  it('should allow a GET to /', async function () {
    const res = await request.get('/').send();
    expect(res.status).to.equal(200);
    expect(res.text).equals(
      `Test server running at http://localhost:${process.env.PORT}`
    );
  });

  it('should throw an error when trying to access a non existent route', async function () {
    const res = await request.get('/foo').send();
    expect(res.status).to.equal(404);
    // console.log(res.body.message);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).equals(
      `Could not find any resource at 127.0.0.1:${process.env.PORT}/foo`
    );
  });
});
