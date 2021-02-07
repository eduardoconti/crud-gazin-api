import { Test, TestingModule } from '@nestjs/testing';
import { DevelopersService } from './developers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Developer } from './interfaces/developers.interface';
import { createMock } from '@golevelup/nestjs-testing';
import { Model, Query } from 'mongoose';
import { DeveloperDoc } from './interfaces/developers-document.interface';
const lasagna = 'lasagna lover';

const mockDeveloper: (
  nome?: string,
  _id?: string,
  idade?: number,
  sexo?: string,
  hobby?: string,
  datanascimento?: Date
) => Developer = (
  nome = 'Teste',
  _id = 'a uuid',
  idade = 25,
  sexo = 'M',
  hobby = 'Programar',
  datanascimento = new Date('1995-12-05')
) => {
    return {
      nome,
      _id,
      idade,
      sexo,
      hobby,
      datanascimento
    };
  };


const mockDeveloperDoc: (mock?: {
  nome?: string;
  _id?: string;
  idade?: number;
  sexo?: string;
  hobby?: string;
  datanascimento?: Date

}) => Partial<DeveloperDoc> = (mock?: {
  nome: string;
  _id: string;
  idade: number;
  sexo: string;
  hobby: string;
  datanascimento?: Date
}) => {
    return {
      nome: (mock && mock.nome) || 'Teste',
      _id: (mock && mock._id) || 'a uuid',
      sexo: (mock && mock.sexo) || 'M',
      idade: (mock && mock.idade) || 25,
      hobby: (mock && mock.hobby) || 'Programar',
      datanascimento: (mock && mock.datanascimento) || new Date('1995-12-05'),
    };
  };

const developerArray: Developer[] = [
  mockDeveloper(),
  mockDeveloper('Eduardo', 'a new uuid', 25, 'M', 'Programar', new Date('1995-12-05')),
  mockDeveloper('Lauany', 'esposa', 21, 'F', 'Ler', new Date('1998-09-09')),
];

const developerDocArray = [
  mockDeveloperDoc(),
  mockDeveloperDoc({ nome: 'Eduardo', _id: 'a new uuid', idade: 25, sexo: 'M', hobby: 'Programar', datanascimento: new Date('1995-12-05') }),
  mockDeveloperDoc({ nome: 'Lauany', _id: 'esposa', idade: 21, sexo: 'F', hobby: 'Ler', datanascimento: new Date('1998-09-09') }),
];

describe('DevelopersService', () => {
  let service: DevelopersService;
  let model: Model<DeveloperDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevelopersService,
        {
          provide: getModelToken('Developer'),

          useValue: {
            new: jest.fn().mockResolvedValue(mockDeveloper()),
            constructor: jest.fn().mockResolvedValue(mockDeveloper()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DevelopersService>(DevelopersService);
    model = module.get<Model<DeveloperDoc>>(getModelToken('Developer'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('Deve Retornar todos Desenvolvedores', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(developerDocArray),
    } as any);
    const developers = await service.getAll();
    expect(developers).toEqual(developerArray);
  });
  it('Deve retornar desenvolvedor por ID', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<DeveloperDoc, DeveloperDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(mockDeveloperDoc({ nome: 'Teste', _id: 'an id' })),
      }),
    );
    const findMockCat = mockDeveloper('Teste', 'an id');
    const foundCat = await service.getOne('an id');
    expect(foundCat).toEqual(findMockCat);
  });
 
  it('Deve Inserir novo desenvolvedor', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        nome: 'Oliver',
        _id: 'some id',
        idade: 20,
        sexo: 'M',
        hobby: 'Nadar',
        datanascimento: new Date('1999-01-01')
      }),
    );
    const newDeveloper = await service.insertOne({
      nome: 'Oliver',
      _id:'some id',
      idade: 20,
      sexo: 'M',
      hobby:'Nadar',
      datanascimento: new Date('1999-01-01'),
     
    });
    expect(newDeveloper).toEqual(mockDeveloper('Oliver', 'some id', 20, 'M','Nadar', new Date('1999-01-01') ));
  });

 it.skip('Deve fazer update do desenvolvedor', async () => {
    jest.spyOn(model, 'updateOne').mockReturnValueOnce(
      createMock<Query<DeveloperDoc, DeveloperDoc>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: 'some id',
          nome: 'Eduardo',
          sexo: 'M',
          idade: 25,
          hobby:'Programar',
          datanascimento: new Date('1999-01-01')
        }),
      }),
    );
    const updateDeveloper = await service.updateOne({
      _id: 'some id',
      nome: 'Eduardo',
      sexo: 'M',
      idade: 25,
      hobby:'Programar',
      datanascimento: new Date('1999-01-01')
    });
    expect(updateDeveloper).toEqual(mockDeveloper('Eduardo', 'some id',25,'M', 'Programar', new Date('1999-01-01')));
  });

  it('Deve deletar um desenvolvedor ', async () => {
    jest.spyOn(model, 'deleteOne').mockResolvedValueOnce(true as any);
    expect(await service.deleteOne('a bad id')).toEqual({ deleted: true });
  });

  it('should not delete a cat', async () => {
    jest.spyOn(model, 'deleteOne').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.deleteOne('a bad id')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});