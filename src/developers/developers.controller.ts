import { Body, Controller, Get, Post, Put, Delete, Param, Patch } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DeveloperDTO } from './developers.dto';
import { Developer } from './interfaces/developers.interface'

@Controller('developers')
export class DevelopersController {

    constructor(
        private readonly developerService: DevelopersService
    ) { }

    @Get()
    async getAll() : Promise<Developer[]> {
        return this.developerService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Developer> {
        return this.developerService.getOne(id);
    }
    
    @Post()
    async create(@Body() developer: DeveloperDTO): Promise<Developer> {
        return this.developerService.insertOne(developer);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() developer: DeveloperDTO): Promise<Developer> {
        return this.developerService.updateOne(developer);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
      return this.developerService.deleteOne(id);
    }

}
