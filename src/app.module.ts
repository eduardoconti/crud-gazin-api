import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot( 'mongodb://localhost/gazin', { useFindAndModify: false }),
    DevelopersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
