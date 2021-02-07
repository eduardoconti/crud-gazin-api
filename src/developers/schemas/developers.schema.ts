import { Schema } from 'mongoose';

export const DeveloperSchema = new Schema({
    nome: String,
    idade: Number,
    sexo: String,
    hobby: String,
    datanascimento: Date
});