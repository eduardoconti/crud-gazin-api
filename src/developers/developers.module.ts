import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { DeveloperSchema } from './schemas/developers.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Developer', schema: DeveloperSchema }])
    ],
    controllers: [DevelopersController],
    providers: [DevelopersService]
})
export class DevelopersModule {}
