import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'http';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Mongoose', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it(`should return created document`, (done) => {
    const createDto = {
        nome: "Eduardo",
        sexo: "m",
        idade: 16,
        hobby: "teste",
        datanascimento: new Date("1995-12-05")
    };
    request(server)
      .post('/developers')
      .send(createDto)
      .expect(201)
      .end((err, { body }) => {
        expect(body.nome).toEqual(createDto.nome);
        expect(body.idade).toEqual(createDto.idade);
        expect(body.sexo).toEqual(createDto.sexo);
        done();
      });
  });

  afterEach(async () => {
    await app.close();
  });
});