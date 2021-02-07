import { Document } from 'mongoose';

export interface DeveloperDoc extends Document {
    nome: string;
    idade: number;
    sexo: string;
    hobby: string
    datanascimento: Date;
}