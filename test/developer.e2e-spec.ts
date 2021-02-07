import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { DeveloperDTO } from "../src/developers/developers.dto";
import * as mongoose from "mongoose";

describe('E2E Testes do endpoint /developer', () => {
  let app: INestApplication

  beforeAll(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  afterAll(async done => {
    await mongoose.disconnect(done);
    await app.close();
  })

  it("Deve criar um Desenvolvedor", () => {
    const developer: DeveloperDTO = {
      nome: "nome teste",
      idade:10,
      hobby: "Plans to travel to Kenya",
      sexo: "M",
      datanascimento: new Date()
    }
    return request(app.getHttpServer())
      .post("/developer")
      .send(developer)
      .expect(HttpStatus.CREATED);
  })
  it("deve alterar um desenvolvedor", () => {
    const developer: DeveloperDTO = {
      nome: "teste nome",
      idade:15,
      hobby: "fazer teste",
      sexo: "F",
      datanascimento: new Date()
    }
    return request(app.getHttpServer())
      .put("/developers/601d329f564d6c2295491f9b")
      .send(developer)
      .expect(HttpStatus.OK);
  })
  it("deve retornar todos os desenvolvedores", () => {
    return request(app.getHttpServer())
      .get("/developers")
      .expect(HttpStatus.OK);
  })
  it("deve retornar um desenvolvedor", () => {
    return request(app.getHttpServer())
      .get("/developers/601d329f564d6c2295491f9b")
      .expect(HttpStatus.OK);
  })
  it("deve criar um desenvolvedor", () => {
    return request(app.getHttpServer())
      .delete("/developers/601d329f564d6c2295491f9b")

      .expect(HttpStatus.OK);
  })
})
