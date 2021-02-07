<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descricao

[Nest](https://github.com/nestjs/nest) API desenvolvida para o teste da Gazin.
## Intalação

```bash
$ npm install
```

## Rodando App

```bash
# docker 
$ executar o comando docker compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API:

#### POST: http://localhost:3030/developers/

#### GET: http://localhost:3030/developers/

#### PUT: http://localhost:3030/developers/ID

#### DELETE: http://localhost:3030/developers/ID


## POST: http://localhost:3030/developers/


###### Obrigatorio JSON exemplo:

    { "nome": "Eduardo Conti", 
      "sexo": "Masculino",
      "idade": 25,
      "hobby": "Desenvolver Aplicações",
      "datanascimento": "1995-12-05" }

###### API Retorna o ID
    
    { "id": "6016c644d55d790013f48407" }
   

## GET: http://localhost:3030/developers/


###### Retorno:
    {   "nome": "Eduardo",
        "idade": 25,
        "sexo": "M",
        "hobby": "gazin",
        "datanascimento": "1995-12-05T00:00:00.000Z",
        "__v": 0,
        "_id": "6016bfb9647aa60013cea3e2" }


## PUT: http://localhost:3030/developers/ID

###### Obrigatorio JSON exemplo:

     { "nome": "Eduardo Conti", 
      "sexo": "Masculino",
      "idade": 25,
      "hobby": "Desenvolver Aplicações",
      "datanascimento": "1995-12-05" }


## DELETE: http://localhost:3030/developers/ID
