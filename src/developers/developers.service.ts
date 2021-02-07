import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeveloperDTO } from './developers.dto';
import { Developer } from './interfaces/developers.interface'
import { DeveloperDoc } from './interfaces/developers-document.interface'
import { Model } from 'mongoose';

@Injectable()
export class DevelopersService {

    constructor(@InjectModel('Developer') private readonly developerModel: Model<DeveloperDoc>) { }

    async getAll(): Promise<Developer[]> {
        const developersDocs = await this.developerModel.find().exec();
        return developersDocs.map((doc) => ({
            _id: doc._id,
            nome: doc.nome,
            idade: doc.idade,
            sexo: doc.sexo,
            hobby: doc.hobby,
            datanascimento: doc.datanascimento,
          }));
    }

    async getOne(id: string): Promise<Developer> {
        const developer = await this.developerModel.findOne({ _id: id }).exec() ;
        return {
            _id: developer._id,
            nome: developer.nome,
            idade: developer.idade,
            sexo: developer.sexo,
            hobby: developer.hobby,
            datanascimento: developer.datanascimento
        }
    }

    async insertOne(developer: DeveloperDTO): Promise<Developer> {
        const createdDeveloper = this.developerModel.create(developer as any);
        return {
            _id: developer._id,
            nome: developer.nome,
            idade: developer.idade,
            sexo: developer.sexo,
            hobby: developer.hobby,
            datanascimento: developer.datanascimento
        };
    }

    async updateOne(developer: DeveloperDTO): Promise<Developer> {
        const { _id } = developer
        await this.developerModel.updateOne({ _id }, developer).exec();
        return {
            _id: developer._id,
            nome: developer.nome,
            idade: developer.idade,
            sexo: developer.sexo,
            hobby: developer.hobby,
            datanascimento: developer.datanascimento
        };
    }

    async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
        try {
            await this.developerModel.deleteOne({ _id: id });
            return { deleted: true };
        } catch (err) {
            return { deleted: false, message: err.message };
        }
    }

}
