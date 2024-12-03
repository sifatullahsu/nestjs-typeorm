import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './entity/contact-info.entity';
import { Employee } from './entity/employee.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'typeorm',
      synchronize: true,
      logging: false,
      entities: [Employee, ContactInfo, Task, Meeting],
      migrations: [],
      subscribers: [],
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Task, Meeting]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
